export const APP_SCHEME = "fatefulmoment";

export const ROUTES = {
  WELCOME: "/",

  LOGIN: "/login",

  REGISTER: "/register",

  RESET_PASSWORD: "/reset-password",

  HOME: "/(tabs)",

  SCENARIOS: "/(tabs)/scenarios",
  SCENARIOS_DETAIL: "/(tabs)/scenarios/[id]",

  DNA: "/(tabs)/dna",

  SETTINGS: "/(tabs)/settings",
} as const;

export type RouteType = (typeof ROUTES)[keyof typeof ROUTES];

/**
 * Route groups are not part of the URL, so `/(tabs)/settings` is reached at `/settings`.
 * Use this to compare a ROUTES href against `usePathname()`.
 */
export const getPathname = (href: RouteType) => href.replace("/(tabs)", "") as string;

/**
 * Deep link used inside auth emails (password reset, email confirmation).
 *
 * The three slashes are intentional: the path has to land in the URL pathname
 * instead of the host, otherwise Expo Router reads the route as null and opens the
 * welcome screen. It is also independent of the dev server, so the same link works
 * in a development build and in a release build.
 */
export const createDeepLink = (path: RouteType) => `${APP_SCHEME}://${path}`;
