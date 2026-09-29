import { router } from "expo-router";
import { ROUTES } from "@/utils/routes";

/**
 * Clears every screen above the root and puts `route` in its place.
 *
 * `router.replace` alone only swaps the top screen, so the welcome screen would stay on the
 * stack and the hardware back button would return to it. `dismissAll` pops back to the root
 * first, which leaves a single entry and lets back exit the app instead.
 */
export const enterApp = (route: typeof ROUTES.SCENARIOS) => {
  router.dismissAll();
  router.replace(route);
};

/** Same idea in reverse: from inside the app, back to the root of the stack. */
export const leaveApp = () => {
  router.dismissAll();
  router.replace(ROUTES.WELCOME);
};
