import { router } from "expo-router";
import { ROUTES, type RouteType } from "@/utils/routes";

/**
 * Clears every screen above the root and puts `route` in its place.
 *
 * `router.replace` alone only swaps the top screen, so the welcome screen would stay on the
 * stack and the hardware back button would return to it. `dismissAll` pops back to the root
 * first, which leaves a single entry and lets back exit the app instead.
 *
 * It is only dispatched when there is something to pop: a stack holding a single screen cannot
 * handle `POP_TO_TOP` and logs "The action 'POP_TO_TOP' was not handled by any navigator".
 */
export const resetStack = (route: RouteType) => {
  if (router.canGoBack()) {
    router.dismissAll();
  }

  router.replace(route);
};

/** Entering the app always starts on the scenario list with nothing behind it. */
export const enterApp = () => resetStack(ROUTES.SCENARIOS);

/** Leaving the app returns to the root of the stack instead of revealing the tabs. */
export const leaveApp = () => resetStack(ROUTES.WELCOME);
