import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Supabase is not configured. Copy .env.example to .env and set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    // Deep links are handled explicitly in signInFromDeepLink below.
    detectSessionInUrl: false,
  },
});

export type DeepLinkResult =
  | { status: "ok" }
  | { status: "error"; message: string }
  | { status: "ignore" };

const EXPIRED_LINK_MESSAGE = "This reset link is no longer valid. Please request a new one.";

const RECOVERY_ERROR_CODES: Record<string, string> = {
  otp_expired: EXPIRED_LINK_MESSAGE,
  access_denied: EXPIRED_LINK_MESSAGE,
  email_address_invalid: "The email address on this link is invalid.",
};

const readUrlParams = (url: string) => {
  const [beforeHash, hash] = url.split("#");
  const queryStart = beforeHash.indexOf("?");
  const query = queryStart === -1 ? "" : beforeHash.slice(queryStart + 1);

  return new URLSearchParams([query, hash ?? ""].filter(Boolean).join("&"));
};

/**
 * Supabase puts the recovery session in the URL, so the app can read the reset link,
 * authenticate the user and let them pick a new password.
 */
export const signInFromDeepLink = async (url: string): Promise<DeepLinkResult> => {
  const params = readUrlParams(url);

  const errorCode = params.get("error_code");

  if (errorCode) {
    return { status: "error", message: RECOVERY_ERROR_CODES[errorCode] ?? EXPIRED_LINK_MESSAGE };
  }

  const accessToken = params.get("access_token");
  const refreshToken = params.get("refresh_token");

  if (!accessToken || !refreshToken) {
    return { status: "ignore" };
  }

  const { error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error) {
    return { status: "error", message: EXPIRED_LINK_MESSAGE };
  }

  return { status: "ok" };
};
