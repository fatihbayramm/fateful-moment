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
