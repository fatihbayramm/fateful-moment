import { router } from "expo-router";
import { ROUTES, type RouteType } from "@/utils/routes";

/**
 * Auth screens are entered with `replace` instead of `push`, so the stack never holds more than one
 * screen and the hardware back button always exits the app.
 *
 * Clearing the stack with `dismissAll` was the obvious alternative, but it is unreliable here:
 * `router.canGoBack()` delegates to React Navigation's `canGoBack()`, which does not always agree
 * with the native stack on iOS, and a `POP_TO_TOP` that no navigator accepts logs
 * "The action 'POP_TO_TOP' was not handled by any navigator".
 */
export const replaceRoute = (route: RouteType) => router.replace(route);

/** Entering the app starts on the scenario list, with nothing behind it. */
export const enterApp = () => replaceRoute(ROUTES.SCENARIOS);

/** Leaving the app goes back to the welcome screen, with nothing behind it. */
export const leaveApp = () => replaceRoute(ROUTES.WELCOME);
