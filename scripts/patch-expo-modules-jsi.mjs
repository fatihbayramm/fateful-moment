import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * expo-modules-jsi@57.1.1 opts into `swiftLanguageModes: [.v6]` but its sources predate the Swift 6
 * rules, so `xcodebuild` fails on Xcode 26 (Swift 6.2) with ~30 errors:
 *
 *   'weak' must be a mutable variable, because it may change at runtime
 *   stored property 'runtime' of 'Sendable'-conforming class is mutable
 *   'RuntimeScheduler' cannot be annotated with either SWIFT_RETURNS_RETAINED or ... 
 *   sending 'resultPtr' risks causing data races
 *
 * SDK 58 has not fixed it and expo-modules-core pins `~57.1.1`, so there is no version to upgrade to.
 *
 * The language mode must stay on v6. Lowering it to v5 does make the package compile, but it changes
 * how the compiler mangles actor-isolated and async symbols, so the built framework stops exporting
 * `_$s14ExpoModulesJSI15JavaScriptActorC11runIsolatedyxxyYbACYcXERi_zlFZ` and the prebuilt
 * `ExpoModulesCore.framework` — which is shipped ready-made by Expo — aborts at launch with
 * "Symbol not found". Everything below is therefore a source-level fix that leaves the ABI alone.
 *
 * Runs from `postinstall` because `npm install` replaces node_modules. Every patch is a no-op once the
 * sources already contain it, so re-running is safe and an upstream fix needs no change here.
 */

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PACKAGE_DIR = join(ROOT, "node_modules", "expo-modules-jsi", "apple");

const RUNTIME = "Sources/ExpoModulesJSI/Runtime/JavaScriptRuntime.swift";

const PATCHES = [
  {
    dir: "Sources/ExpoModulesJSI",
    ext: ".swift",
    label: "turn the `weak let runtime` references into `weak var`",
    isPatched: (text) => !text.includes("weak let runtime: JavaScriptRuntime?"),
    apply: (text) => text.replace(/weak let runtime: JavaScriptRuntime\?/g, "weak var runtime: JavaScriptRuntime?"),
  },
  {
    file: "Sources/ExpoModulesJSI/Runtime/JavaScriptPropNameID.swift",
    label: "opt JavaScriptPropNameID's mutable weak store out of Sendable checking",
    isPatched: (text) => /nonisolated\(unsafe\)\s+\w+ weak var runtime/.test(text),
    apply: (text) =>
      text.replace(
        /^(\s*)(private|internal) weak var runtime: JavaScriptRuntime\?/m,
        "$1nonisolated(unsafe) $2 weak var runtime: JavaScriptRuntime?"
      ),
  },
  {
    file: "Sources/ExpoModulesJSI/Runtime/Values/JavaScriptError.swift",
    label: "opt JavaScriptError's mutable weak store out of Sendable checking",
    isPatched: (text) => /nonisolated\(unsafe\)\s+private weak var runtime/.test(text),
    apply: (text) =>
      text.replace(
        /^(\s*)private weak var runtime: JavaScriptRuntime\?/m,
        "$1nonisolated(unsafe) private weak var runtime: JavaScriptRuntime?"
      ),
  },
  {
    file: "Sources/ExpoModulesJSI/Runtime/Values/JavaScriptValue.swift",
    label: "opt JavaScriptValue's mutable weak store out of Sendable checking",
    isPatched: (text) => /nonisolated\(unsafe\)\s+internal weak var runtime/.test(text),
    apply: (text) =>
      text.replace(
        /^(\s*)internal weak var runtime: JavaScriptRuntime\?/m,
        "$1nonisolated(unsafe) internal weak var runtime: JavaScriptRuntime?"
      ),
  },
  {
    file: "Sources/ExpoModulesJSI-Cxx/include/RuntimeScheduler.h",
    label: "drop the invalid SWIFT_RETURNS_RETAINED annotations",
    isPatched: (text) => !text.includes("SWIFT_RETURNS_RETAINED RuntimeScheduler("),
    apply: (text) => text.replace(/SWIFT_RETURNS_RETAINED RuntimeScheduler\(/g, "RuntimeScheduler("),
  },
  {
    file: RUNTIME,
    label: "wrap the call-scoped pointers in NonisolatedUnsafeVar so they can cross into the actor",
    isPatched: (text) => text.includes("let resultPtr = NonisolatedUnsafeVar(resultPtr)"),
    apply: (text) =>
      text
        .replace(/nonisolated\(unsafe\) let (thisPtr|argumentsPtr|resultPtr) = \1/g, "let $1 = NonisolatedUnsafeVar($1)")
        .replaceAll("writeJSIValue(to: resultPtr)", "writeJSIValue(to: resultPtr.value)")
        .replaceAll("start: argumentsPtr, count:", "start: argumentsPtr.value, count:")
        .replaceAll("UnsafeMutablePointer(mutating: thisPtr)", "UnsafeMutablePointer(mutating: thisPtr.value)")
        .replaceAll("pointee, thisPtr)", "pointee, thisPtr.value)"),
  },
];

const swiftFiles = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);

    if (entry.isDirectory()) return swiftFiles(full);
    return entry.name.endsWith(".swift") ? [full] : [];
  });

if (!existsSync(PACKAGE_DIR)) {
  console.log("[patch-expo-modules-jsi] paket bulunamadi, atlaniyor");
  process.exit(0);
}

let changedFiles = 0;
let alreadyPatched = 0;

for (const patch of PATCHES) {
  const targets = patch.dir ? swiftFiles(join(PACKAGE_DIR, patch.dir)) : [join(PACKAGE_DIR, patch.file)];

  for (const target of targets) {
    if (!existsSync(target)) continue;

    const before = readFileSync(target, "utf8");

    if (patch.isPatched(before)) {
      alreadyPatched++;
      continue;
    }

    const after = patch.apply(before);

    if (after === before) continue;

    writeFileSync(target, after);
    changedFiles++;
    console.log(`  - ${target.replace(`${ROOT}/`, "")}: ${patch.label}`);
  }
}

console.log(
  `[patch-expo-modules-jsi] ${changedFiles} dosya yamalandi, ${alreadyPatched} dosya zaten uyumlu`,
);
