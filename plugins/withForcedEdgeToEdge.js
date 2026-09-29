const { withMainActivity } = require("@expo/config-plugins");

/**
 * React Native enables edge-to-edge via `WindowUtil.updateEdgeToEdgeFeatureFlag`, which is gated
 * behind `isAtLeastTargetSdk35` (device AND app must be on Android 15+). On Android 14 and below
 * the window keeps `setDecorFitsSystemWindows(true)`, so the app is laid out inside the system bar
 * insets and leaves an empty strip where the (hidden) navigation bar used to be.
 *
 * This plugin forces `WindowCompat.setDecorFitsSystemWindows(window, false)` in MainActivity so
 * the app always draws edge-to-edge, on every Android version.
 *
 * It also sets `LAYOUT_IN_DISPLAY_CUTOUT_MODE_ALWAYS`, which is what React Native's own
 * `Window.enableEdgeToEdge()` does. Without it the activity window keeps the default cutout mode
 * and stays letterboxed on cutout edges, while Modal dialog windows (which run the same
 * edge-to-edge setup) are not. That mismatch is what shows up as a strip on one side of the
 * screen once a transparent Modal is opened.
 */
const REQUIRED_IMPORTS = ["android.os.Build", "android.view.WindowManager", "androidx.core.view.WindowCompat"];

const EDGE_TO_EDGE = [
  "    WindowCompat.setDecorFitsSystemWindows(window, false)",
  "    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {",
  "      window.attributes = window.attributes.apply {",
  "        layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_ALWAYS",
  "      }",
  "    }",
  "",
].join("\n").replace(/\n$/, "\n");

const withForcedEdgeToEdge = (config) =>
  withMainActivity(config, (modConfig) => {
    if (modConfig.modResults.language !== "kt") {
      return modConfig;
    }

    let contents = modConfig.modResults.contents;

    if (contents.includes("setDecorFitsSystemWindows")) {
      return modConfig;
    }

    const missingImports = REQUIRED_IMPORTS.filter((name) => !contents.includes(`import ${name}\n`));

    if (missingImports.length > 0) {
      const imports = missingImports.map((name) => `import ${name}\n`).join("");

      contents = contents.replace(
        /^import com\.facebook\.react\.ReactActivity$/m,
        `${imports}import com.facebook.react.ReactActivity`
      );
    }

    contents = contents.replace(/(super\.onCreate\((?:null|savedInstanceState)\)\r?\n)/, `$1${EDGE_TO_EDGE}`);

    modConfig.modResults.contents = contents;

    return modConfig;
  });

module.exports = withForcedEdgeToEdge;
