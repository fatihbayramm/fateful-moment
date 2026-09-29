import { useEffect, useState } from "react";
import { ActivityIndicator, Text, StyleSheet, TouchableOpacity, View, Platform } from "react-native";
import { router } from "expo-router";
import TabMenu from "@/app/(tabs)/components/TabMenu";
import { colors } from "@/constants/theme";
import { ROUTES } from "@/utils/routes";
import { supabase } from "@/services/supabase";

export default function SettingsScreen() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (isMounted) {
        setIsSignedIn(Boolean(data.session));
      }
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsSignedIn(Boolean(session));
    });

    return () => {
      isMounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const handleLogOut = async () => {
    if (isLoggingOut || !isSignedIn) {
      return;
    }

    setIsLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      setIsLoggingOut(false);
      return;
    }

    router.replace(ROUTES.WELCOME);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TabMenu />
      </View>

      <Text style={styles.header}>Settings</Text>

      <Text style={styles.subHeader}>Configure Your Experience</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Account</Text>

        {isSignedIn ? (
          <TouchableOpacity
            style={[styles.button, styles.logoutButton, isLoggingOut && styles.buttonDisabled]}
            onPress={handleLogOut}
            disabled={isLoggingOut}
            activeOpacity={0.8}
          >
            {isLoggingOut ? (
              <ActivityIndicator color={colors.red.main} />
            ) : (
              <Text style={styles.logoutButtonText}>Log out</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={() => router.replace(ROUTES.WELCOME)}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>Log in</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
    paddingTop: 0,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  header: {
    color: colors.text.main,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subHeader: {
    color: colors.primary.main,
    marginBottom: 16,
    fontSize: 13,
    fontFamily: Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" }),
  },
  card: {
    backgroundColor: colors.secondary.main,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border.main,
    padding: 16,
  },
  cardTitle: {
    color: colors.text.main,
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 12,
  },
  button: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  logoutButton: {
    backgroundColor: "rgba(251, 44, 54, 0.1)",
    borderColor: colors.red.main,
  },
  logoutButtonText: {
    color: colors.red.main,
    fontSize: 12,
    fontWeight: "bold",
  },
  loginButton: {
    backgroundColor: "rgba(0, 211, 243, 0.1)",
    borderColor: colors.primary.main,
  },
  loginButtonText: {
    color: colors.primary.main,
    fontSize: 12,
    fontWeight: "bold",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
