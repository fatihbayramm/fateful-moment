const { withMainActivity } = require("@expo/config-plugins");

/**
 * React Native enables edge-to-edge via `WindowUtil.updateEdgeToEdgeFeatureFlag`, which is gated
 * behind `isAtLeastTargetSdk35` (device AND app must be on Android 15+). On Android 14 and below
 * the window keeps `setDecorFitsSystemWindows(true)`, so the app is laid out inside the system bar
 * insets and leaves an empty strip where the (hidden) navigation bar used to be.
 *
 * This plugin forces `WindowCompat.setDecorFitsSystemWindows(window, false)` in MainActivity so
 * the app always draws edge-to-edge, on every Android version.
 */
const withForcedEdgeToEdge = (config) =>
  withMainActivity(config, (modConfig) => {
    if (modConfig.modResults.language !== "kt") {
      return modConfig;
    }

    let contents = modConfig.modResults.contents;

    if (contents.includes("setDecorFitsSystemWindows")) {
      return modConfig;
    }

    const imports = `import androidx.core.view.WindowCompat\n`;

    if (!contents.includes("import androidx.core.view.WindowCompat")) {
      contents = contents.replace(
        /^import com\.facebook\.react\.ReactActivity$/m,
        `${imports}import com.facebook.react.ReactActivity`
      );
    }

    const edgeToEdge = `    WindowCompat.setDecorFitsSystemWindows(window, false)\n`;

    contents = contents.replace(/(super\.onCreate\((?:null|savedInstanceState)\)\r?\n)/, `$1${edgeToEdge}`);

    modConfig.modResults.contents = contents;

    return modConfig;
  });

module.exports = withForcedEdgeToEdge;
