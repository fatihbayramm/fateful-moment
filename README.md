<div align="center">

# Fateful Moment

**Were you in that situation, what would you do?**

A strategy game that profiles how you actually decide — not what you would like to think you decide.

[![Expo](https://img.shields.io/badge/Expo-SDK%2057-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.86-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://reactnative.dev)
[![Expo Router](https://img.shields.io/badge/Expo%20Router-7-000020?style=flat-square)](https://docs.expo.dev/router/introduction/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-00d3f3?style=flat-square)](LICENSE)

</div>

---

## Table of Contents

- [About](#about)
- [Screenshots](#screenshots)
- [How It Works](#how-it-works)
- [The Decision DNA](#the-decision-dna)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Start with a clean cache](#start-with-a-clean-cache)
- [Environment Variables](#environment-variables)
- [Build Profiles](#build-profiles)
- [Engineering Notes](#engineering-notes)
- [Known Limitations](#known-limitations)
- [Credits](#credits)
- [License](#license)

---

## About

**Fateful Moment** puts you in a seat you never asked for. The chemical weapon allegations are on your desk. The mobilization telegram needs signing. You have a few minutes and no perfect option.

You pick one. The app does not tell you whether you were right — there is no right answer to grade. Instead it reads *how* you weighed it and hands back a **Decision DNA**: an archetype, a six-axis profile, the behavioural patterns behind it, and the blind spot you probably carry.

Five scenarios. Twenty-five possible decisions. Twenty-five distinct archetypes.

> This is a strategy game. The scenarios are not puzzles with a solution — they are trade-offs with consequences.

---

## Screenshots

> Drop captures into `assets/screenshots/` using the filenames below and they will render here.
> 


<table>
<tr>
<td width="50%" align="center"><em>Welcome</em></td>
<td width="50%" align="center"><em>Register</em></td>
</tr>
<tr>
<td><img width="1080" height="2340" alt="Screenshot_20260930_150810_Fateful Moment" src="https://github.com/user-attachments/assets/0a40a0b3-5b72-4e96-8681-d61a2a0283d6" /></td>
<td><img width="1080" height="2340" alt="Screenshot_20260930_150819_Fateful Moment" src="https://github.com/user-attachments/assets/16dca523-5b9e-4783-843a-be0374c098a2" /></td>

</tr>
<tr>
<td align="center"><em>Sign in</em></td>
<td align="center"><em>Reset your email</em></td>
</tr>
<tr>
<td><img width="1080" height="2340" alt="Screenshot_20260930_150832_Fateful Moment" src="https://github.com/user-attachments/assets/f1dbb7f1-eb73-4fb8-9c69-173e16160c34" /></td>
<td><img width="1080" height="2340" alt="Screenshot_20260930_151302_Fateful Moment" src="https://github.com/user-attachments/assets/83a263ce-d9e1-458a-b30c-e013fc80c72b" /></td>
</tr>
<tr>
<td align="center"><em>Scenarios</em></td>
<td align="center"><em>Scenario briefing</em></td>
</tr>
<tr>
<td><img width="2340" height="1080" alt="Screenshot_20260930_151006_Fateful Moment" src="https://github.com/user-attachments/assets/4c2554ea-b183-4699-a90c-8cfd84535c7d" /></td>
<td><img width="2340" height="1080" alt="Screenshot_20260930_151012_Fateful Moment" src="https://github.com/user-attachments/assets/100e62d5-547a-413b-b298-61d5f0805153" /></td>
</tr>
<tr>
<td align="center"><em>Decision options</em></td>
<td align="center"><em>Your Decision DNA</em></td>
</tr>
<tr>
<td><img width="2340" height="1080" alt="Screenshot_20260930_151021_Fateful Moment" src="https://github.com/user-attachments/assets/12cd8898-d735-4f7a-b6c6-2360f23af615" /></td>
<td><img width="2340" height="1080" alt="Screenshot_20260930_151153_Fateful Moment" src="https://github.com/user-attachments/assets/5770d645-4fda-433f-8aed-74c37294840d" /></td>
</tr>
<tr>
<td align="center"><em>Menu</em></td>
<td align="center"><em>Settings</em></td>
</tr>
<tr>
<td><img width="2340" height="1080" alt="Screenshot_20260930_151209_Fateful Moment" src="https://github.com/user-attachments/assets/b0efed9b-a2cb-4407-a7c2-c41dfe517f14" /></td>
<td><img width="2340" height="1080" alt="Screenshot_20260930_151222_Fateful Moment" src="https://github.com/user-attachments/assets/60ce3c2d-2c12-4fda-b5fe-eb753c988549" /></td>
</tr>
<tr>
<td align="center"><em>DNA Tab</em></td>
<td align="center"><em>Form Fail</em></td>
</tr>
<tr>
<td><img width="2340" height="1080" alt="Screenshot_20260930_151213_Fateful Moment" src="https://github.com/user-attachments/assets/391b62d6-328b-4b4a-86c0-e6ff257a3bef" /></td>
<td><img width="1080" height="2340" alt="Screenshot_20260930_151325_Fateful Moment" src="https://github.com/user-attachments/assets/5401e563-d96e-4cea-bfa4-70544605a525" /></td>
</tr>
</table>

---

## How It Works

1. **Pick a scenario** — five historical crises, each with a briefing and a time budget.
2. **Choose one option** — there is no right answer, only trade-offs. Every alternative stays on the table.
3. **Get your Decision DNA** — an archetype, a six-axis radar, three detected behavioural patterns, and the metric you are weakest on.

Nothing is a quiz. The profile is written by the choices you make, not by a profile you select.

---

## The Decision DNA

Every decision is scored across six dimensions:

| Axis | What it measures |
| :--- | :--- |
| **Vision** | How far ahead you look beyond the immediate problem |
| **Courage** | Willingness to act when the downside is real |
| **Risk** | Your appetite for uncertainty |
| **Control** | How tightly you want to hold the levers |
| **Empathy** | Weight you give to the people inside the situation |
| **Ethics** | Whether your constraints are internal or external |

The result screen renders four things:

- **Archetype card** — name, portrait, and a one-line read on how you operate
- **Psychological matrix** — the six dimensions with icons and scores
- **Pattern detection** — three numbered behavioural patterns derived from the pick
- **Blind spot** — the lowest-scoring axis, surfaced as a question you should sit with

The radar chart is drawn with `react-native-svg` (hexagonal grid, four levels, six axes).

---

## Features

- **5 scenarios · 25 decisions · 25 archetypes** — each option maps to its own DNA profile
- **Supabase authentication** — register, sign in, sign out, and a password-reset flow
- **Password reset** — request a link, deep-link back into the app, set a new password
- **Field-level validation** — inline errors under every input, plus a live password-strength checklist
- **Secure token handling** — recovery tokens are read from the deep link and exchanged server-side, never stored in plain form
- **Portrait auth, landscape game** — per-screen orientation control; the status bar appears only where it should
- **Edge-to-edge on Android** — a config plugin forces true edge-to-edge on every Android version, not just 15+
- **Hidden system bars** — status bar and navigation bar stay out of the way on the game screens
- **Fullscreen menu** — a slide-in sheet that respects the display cutout in landscape
- **Glow-accented CTA** — the Start button's border is a segmented SVG gradient with a layered halo
- **Splash screen** — a transparent-masked logo that sits seamlessly on the brand background
- **Deep linking** — custom URL scheme registered on both platforms
- **No bottom tab bar** — navigation is a fullscreen sheet, which keeps the landscape layout clean
- **Centralised routing** — every route lives in one typed file
- **Centralised theme** — one palette, no hardcoded colours in components

---

## Tech Stack

| Layer | Choice |
| :--- | :--- |
| Framework | Expo SDK 57 / React Native 0.86 (New Architecture) |
| Navigation | Expo Router (typed routes, file-based) |
| Language | TypeScript, `strict: true` |
| Backend | Supabase (Auth + Postgres) |
| Persistence | `@react-native-async-storage/async-storage` |
| Graphics | `react-native-svg` (radar chart, glow border) |
| Safe areas | `react-native-safe-area-context` |
| Keyboard | `react-native-keyboard-aware-scroll-view` |
| Build & signing | EAS Build & Submit |
| Codebase | ~4,000 lines across 30 source files |

> **This case uses React Native's own components.** The UI is built from the platform primitives — `View`, `Text`, `ImageBackground`, `Pressable`, `ScrollView`, `Modal`, `StyleSheet` — with no third-party component library.

---

## Project Structure

```
fateful-moment/
├── app/                          # Routes (every file is a screen)
│   ├── _layout.tsx               # Root stack, orientation & status bar per screen
│   ├── index.tsx                 # Welcome
│   ├── register/                 # Register
│   ├── login/                    # Sign in
│   ├── reset-password/           # Request link → set new password
│   └── (tabs)/
│       ├── _layout.tsx           # Hidden tab bar, navigation bar hidden
│       ├── components/TabMenu.tsx# Fullscreen menu sheet
│       ├── scenarios/            # List, detail, options, Decision DNA
│       ├── dna/                  # How the profile works
│       └── settings/             # Account, sign out
├── assets/
│   ├── icons/                    # 43 SVG icons
│   ├── images/
│   │   ├── app/                  # App icon, adaptive foreground, splash
│   │   ├── scenarios/            # 5 scenario illustrations
│   │   └── dna-portraits/        # 16 archetype portraits
│   └── screenshots/              # README captures (add yours here)
├── components/common/            # BackButton, Loading
├── constants/theme.ts            # The entire palette
├── data/scenarios.ts             # All game content
├── hooks/useKeyboardVisible.ts
├── plugins/
│   └── withForcedEdgeToEdge.js   # Android edge-to-edge + cutout mode
├── scripts/
│   └── patch-expo-modules-jsi.mjs# Upstream Swift 6 build fix (see notes)
├── services/supabase.ts          # Client + deep-link session exchange
└── utils/
    ├── routes.ts                 # Every route, in one typed map
    └── navigation.ts             # Stack transitions
```

### Content model

`data/scenarios.ts` is the single source of truth for the game. Each scenario holds options, and each option holds a complete `DecisionDna`:

```ts
interface DecisionDna {
  archetypeTitle: string;
  archetypeDescription: string;
  portrait: string;
  metrics: Metrics;        // vision, courage, risk, control, empathy, ethics
  patternNote: string;     // three behavioural patterns
  blindSpot: string;
}
```

---

## Getting Started

### Prerequisites

- Node.js **20.19.4** or newer
- Xcode 26 with an iOS 26.1 simulator runtime
- Android Studio with an emulator, or a physical device
- A Supabase project (for authentication only — game content is local)

### Install

```bash
git clone https://github.com/fatihbayramybs/fateful-moment.git
cd fateful-moment
npm install
```

> `npm install` runs a `postinstall` step that patches a known upstream Swift 6 issue in
> `expo-modules-jsi`. See [Engineering Notes](#engineering-notes).

### Configure

```bash
cp .env.example .env
```

Fill in your Supabase credentials — see [Environment Variables](#environment-variables).

### Run

```bash
npm run ios       # iOS simulator (npx expo run:ios)
npm run android   # Android emulator (npx expo run:android)
npm start         # Metro only
npm run web       # Browser
```

`ios/` and `android/` are generated and gitignored — never edit them by hand. Change
`app.json` and re-run `npx expo prebuild` instead.

#### Start with a clean cache

```bash
npm start -- -c
```

The `--` hands `-c` straight to `expo start`, which clears Metro's transform cache before booting.
Reach for it when the bundler serves stale code after a dependency change, a native rebuild, or a
renamed or deleted module — the symptom is usually an error pointing at a file that no longer
exists, or a screen that refuses to pick up an edit you just made.

The app opens with a **dev launcher**: the native build is installed once, and after that `npm start`
just hands the already-installed app the JS bundle. If you change anything native, rebuild rather
than restarting Metro.

### Build in the cloud

```bash
npx eas-cli build --profile preview      # internal APK / IPA
npx eas-cli build --profile production   # store build
npx eas-cli submit --profile production
```

---

## Environment Variables

Create `.env` in the project root:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

### For cloud builds, push them to EAS

`EXPO_PUBLIC_*` values are **inlined into the JavaScript bundle at build time** — they are read by
the machine that runs the bundler, not at runtime on the device. EAS builds run on EAS's servers and
upload the project respecting `.gitignore`, so `.env` never reaches the builder:

```bash
npx eas-cli env:push --path .env --environment preview --environment production --force
```

Verify what is stored with `npx eas-cli env:list`.

> **Without this, a cloud build looks fine and then crashes on tap.** The welcome screen does not
> import the Supabase client, so the app opens normally — and throws the moment you navigate to
> register, sign in, reset your password, or settings. If you are debugging an install that dies on
> the first interaction, check this first.

### A note on what these values are

`EXPO_PUBLIC_` means "this ends up in the shipped bundle and is readable by anyone who unzips the
app". That is correct and intended for the Supabase **anon key** — it is a public identifier, and
access is controlled by Row Level Security. Never put a service-role key or any other secret behind
an `EXPO_PUBLIC_` prefix.

Then add the redirect URL in **Supabase → Authentication → URL Configuration → Additional Redirect URLs**:

```
fatefulmoment://**
```

> The app fails fast if either variable is missing, so a misconfigured build should never ship
> silently — but the check runs when a screen that needs the client is first imported, not at
> startup. See [Known Limitations](#known-limitations).

---

## Build Profiles

| Profile | Distribution | Notes |
| :--- | :--- | :--- |
| `development` | Internal | Development client, `expo-dev-client` |
| `preview` | Internal | Android outputs an APK |
| `production` | Store | Version auto-increments |

---

## Engineering Notes

A few decisions worth explaining, because they are not obvious.

**A single-entry navigation stack.** The auth flow uses `router.replace` instead of `push`, so the
stack never holds more than one screen and the hardware back button always exits the app. The
alternative — clearing the stack with `dismissAll` — depends on `router.canGoBack()`, which
disagrees with the native stack on iOS and logs *"The action 'POP_TO_TOP' was not handled by any
navigator"*.

**One system-bar mechanism.** The status bar is driven entirely by native-stack's per-screen
options. Mixing in `<StatusBar />` from `expo-status-bar` makes the two modules contradict each
other: one requires `UIViewControllerBasedStatusBarAppearance` to be `YES`, the other `NO`.

**Cutout mode parity (Android).** React Native only enables edge-to-edge on Android 15+. The config
plugin forces `setDecorFitsSystemWindows(false)` *and* `LAYOUT_IN_DISPLAY_CUTOUT_MODE_ALWAYS` in
`MainActivity`, so the activity window matches what modal dialog windows already do.

**Safe-area insets inside a modal.** `SafeAreaView` is a native component that measures *its own*
window, and a `Modal` opens a fresh one that reports zero insets on first presentation — which
pushed the menu labels under the display cutout. The menu now reads the inset from the app's own
window through context and applies it as plain padding.

**The upstream Swift 6 patch.** `expo-modules-jsi@57.1.1` opts into `swiftLanguageModes: [.v6]`
while its own sources predate the Swift 6 rules, so `xcodebuild` fails on Xcode 26 with ~30 errors.
Neither SDK 58 nor any published `expo-modules-jsi` fixes it. `scripts/patch-expo-modules-jsi.mjs`
applies source-level fixes from `postinstall` and is idempotent. **The language mode must stay on
v6** — lowering it compiles, but changes actor-isolated symbol mangling and the prebuilt
`ExpoModulesCore.framework` then aborts at launch with *"Symbol not found"*.

**A splash logo per platform.** iOS renders the launch storyboard rotated in landscape, so the logo
appeared on its side; Android's splash does not rotate. The plugin therefore takes one image for
Android and a 90°-counter-clockwise pre-rotated one for iOS.

---

## Known Limitations

- **Password reset needs a real domain in production.** The screens and the Supabase flow are
  complete and working end to end, but the recovery link relies on a custom URL scheme
  (`fatefulmoment://`). Gmail's in-app browser blocks custom schemes, so the link only opens the
  app when it is tapped outside Gmail. Shipping this properly needs a real domain with **Android
  App Links** and **iOS Universal Links** (`assetlinks.json` + `apple-app-site-association`), which
  makes the link work from every browser. Until then the flow is functional but not frictionless.
- **Results are not persisted.** The Decision DNA is computed and displayed; there is no profile
  history or comparison between sessions yet.
- **A build with missing env vars fails late.** `services/supabase.ts` throws when the module is
  first imported, not at app start. The welcome screen does not import it, so a misconfigured build
  opens normally and only dies on the first navigation. See
  [Environment Variables](#environment-variables).
- **Guest mode is local-only.** Playing without an account works, but nothing is saved.
- **English only.** The copy is written in English; Turkish is not wired up.

---

## Credits

- **App icon and splash artwork** — generated with AI assistance
- **Scenario artwork and archetype portraits** — generated with AI assistance
- **All game content** — scenarios, options, archetypes, pattern detection and blind-spot copy were
  written for this project
- **Built with open source.** Development was carried out with
  [OpenCode](https://opencode.ai), running the **Gemini** and **Space Bunny Free** models.

### Third-party

- [Expo](https://expo.dev) · [React Native](https://reactnative.dev) · [Expo Router](https://docs.expo.dev/router/introduction/)
- [Supabase](https://supabase.com) · [react-native-svg](https://github.com/software-mansion/react-native-svg)
- [react-native-safe-area-context](https://github.com/AppAndFlow/react-native-safe-area-context)
- [EAS Build](https://docs.expo.dev/build/introduction/)

---

## License

[MIT](LICENSE) © Fateful Moment

<div align="center">
<sub>Made with intent — one decision at a time.</sub>
</div>
