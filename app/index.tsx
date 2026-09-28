import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

import { colors } from "../constants/theme";

import DnaIcon from "../assets/icons/dna.svg";
import EmailIcon from "../assets/icons/email.svg";
import AppleIcon from "../assets/icons/apple.svg";
import GoogleIcon from "../assets/icons/google.svg";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.brand}>
        <View style={styles.logoRing}>
          <DnaIcon width={56} height={56} color={colors.primary.main} />
        </View>

        <View style={styles.brandText}>
          <Text style={styles.title}>Welcome to Fateful Moment</Text>
          <Text style={styles.subtitle}>Sign in to continue your journey</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push("/register")}>
          <EmailIcon width={20} height={20} />

          <Text style={styles.primaryButtonText}>Continue with Email</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />

          <Text style={styles.dividerLabel}>OR</Text>

          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.secondaryButton} disabled>
          <AppleIcon width={20} height={20} />

          <Text style={styles.secondaryButtonText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} disabled>
          <GoogleIcon width={20} height={20} />

          <Text style={styles.secondaryButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          By continuing you agree to the{" "}
          <Text style={styles.termsHighlight}>Terms of Use</Text> and{" "}
          <Text style={styles.termsHighlight}>Privacy Policy</Text>.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 48,
    backgroundColor: colors.background.main,
    paddingHorizontal: 48,
    paddingVertical: 24,
  },
  brand: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  logoRing: {
    width: 148,
    height: 148,
    borderRadius: 74,
    alignItems: "center",
    justifyContent: "center",
  },
  brandText: {
    alignItems: "center",
    gap: 6,
  },
  title: {
    color: colors.text.main,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: colors.bodyText.main,
    fontSize: 15,
    textAlign: "center",
  },
  actions: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 420,
    alignSelf: "stretch",
    paddingVertical: 8,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "rgba(0, 211, 243, 0.1)",
    borderWidth: 1,
    borderColor: colors.primary.main,
    borderRadius: 12,
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: colors.primary.main,
    fontSize: 15,
    fontWeight: "bold",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border.main,
  },
  dividerLabel: {
    color: colors.bodyText.main,
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: colors.secondary.main,
    borderRadius: 12,
    paddingVertical: 14,
    marginBottom: 10,
  },
  secondaryButtonText: {
    color: colors.text.main,
    fontSize: 15,
    fontWeight: "bold",
  },
  terms: {
    marginTop: 18,
    color: colors.bodyText.main,
    fontSize: 11,
    lineHeight: 17,
    textAlign: "center",
  },
  termsHighlight: {
    color: colors.primary.main,
  },
});
