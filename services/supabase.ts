import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://adnltywkyqceaqmcudiw.supabase.co";
const supabaseAnonKey = "sb_publishable_7lvwN3o45juflG94SJYg5A_os6gMCa7";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
