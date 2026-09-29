import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { colors } from "@/constants/theme";
import { ROUTES } from "@/utils/routes";
import { enterApp } from "@/utils/navigation";
import EmailIcon from "@/assets/icons/email.svg";
import AppleIcon from "@/assets/icons/apple.svg";
import GoogleIcon from "@/assets/icons/google.svg";

export default function WelcomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.logoRing}>
        <Image source={require("@/assets/images/app/app_icon.png")} style={styles.logo} resizeMode="cover" />
      </View>

      <View style={styles.headerText}>
        <Text style={styles.title}>Welcome to Fateful Moment</Text>
        <Text style={styles.subtitle}>Sign in to continue your journey</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push(ROUTES.REGISTER)}>
          <EmailIcon width={20} height={20} />

          <Text style={styles.primaryButtonText}>Continue with Email</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.guestButton} onPress={() => enterApp(ROUTES.SCENARIOS)}>
          <Text style={styles.guestButtonText}>Continue without creating an account</Text>
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
          By continuing you agree to the <Text style={styles.termsHighlight}>Terms of Use</Text> and{" "}
          <Text style={styles.termsHighlight}>Privacy Policy</Text>.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 28,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  logoRing: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  headerText: {
    alignItems: "center",
    gap: 8,
  },
  title: {
    color: colors.text.main,
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: colors.bodyText.main,
    fontSize: 15,
    textAlign: "center",
  },
  actions: {
    width: "100%",
    maxWidth: 360,
    gap: 10,
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
    paddingVertical: 15,
  },
  primaryButtonText: {
    color: colors.primary.main,
    fontSize: 15,
    fontWeight: "bold",
  },
  guestButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  guestButtonText: {
    color: colors.primary.main,
    fontSize: 13,
    fontWeight: "bold",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 6,
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
    paddingVertical: 15,
  },
  secondaryButtonText: {
    color: colors.text.main,
    fontSize: 15,
    fontWeight: "bold",
  },
  terms: {
    marginTop: 12,
    color: colors.bodyText.main,
    fontSize: 11,
    lineHeight: 18,
    textAlign: "center",
  },
  termsHighlight: {
    color: colors.primary.main,
  },
});
