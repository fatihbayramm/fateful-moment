import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";

import { colors } from "@/constants/theme";
import { ROUTES } from "@/utils/routes";
import { supabase } from "@/services/supabase";

import BackButton from "@/components/common/BackButton";
import EmailIcon from "@/assets/icons/email.svg";

type FieldErrors = Partial<Record<"email", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateFields = (email: string): FieldErrors => {
  if (!email.trim()) {
    return { email: "Please enter your email address." };
  }

  if (!EMAIL_PATTERN.test(email.trim())) {
    return { email: "Please enter a valid email address." };
  }

  return {};
};

const mapSupabaseError = (message: string): FieldErrors => {
  if (message.toLowerCase().includes("email")) {
    return { email: message };
  }

  return {};
};

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => setIsKeyboardVisible(true));
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setIsKeyboardVisible(false));

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const canSubmit = email.trim().length > 0 && !loading;

  const handleChange = (value: string) => {
    setEmail(value);

    if (fieldErrors.email) {
      setFieldErrors({});
    }

    if (successMessage) {
      setSuccessMessage(null);
    }
  };

  const handleResetPassword = async () => {
    setError(null);
    setSuccessMessage(null);

    const nextFieldErrors = validateFields(email);
    setFieldErrors(nextFieldErrors);

    if (Object.keys(nextFieldErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: ROUTES.RESET_PASSWORD,
      });

      if (resetError) {
        const mapped = mapSupabaseError(resetError.message);

        if (Object.keys(mapped).length > 0) {
          setFieldErrors(mapped);
        } else {
          setError(resetError.message);
        }

        return;
      }

      setSuccessMessage(`A reset link has been sent to ${email.trim()}.`);
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={0}
    >
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        enableOnAndroid
        extraScrollHeight={20}
        keyboardOpeningTime={0}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={isKeyboardVisible}
        onScrollBeginDrag={Keyboard.dismiss}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoRing}>
          <Image source={require("@/assets/images/app/app_icon.png")} style={styles.logo} resizeMode="cover" />
        </View>

        <View style={styles.headerText}>
          <Text style={styles.title}>Reset your password</Text>

          <Text style={styles.subtitle}>Enter your email to receive a reset link.</Text>
        </View>

        <View style={styles.fields}>
          <View style={styles.field}>
            <View style={styles.inputWrapper}>
              <EmailIcon width={18} height={18} style={styles.inputIcon} />

              <TextInput
                style={[
                  styles.input,
                  styles.inputWithIcon,
                  loading && styles.inputDisabled,
                  fieldErrors.email && styles.inputError,
                ]}
                placeholder="Your email address"
                placeholderTextColor={colors.bodyText.main}
                value={email}
                onChangeText={handleChange}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                editable={!loading}
              />
            </View>

            {fieldErrors.email ? <Text style={styles.fieldError}>{fieldErrors.email}</Text> : null}
          </View>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

        <TouchableOpacity
          style={[styles.submit, !canSubmit && styles.submitDisabled]}
          onPress={handleResetPassword}
          disabled={!canSubmit}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={colors.primary.main} />
          ) : (
            <Text style={[styles.submitText, !canSubmit && styles.submitTextDisabled]}>Send Reset Link</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.footer}
          onPress={loading ? undefined : () => router.replace(ROUTES.LOGIN)}
          activeOpacity={0.8}
        >
          <Text style={[styles.footerText, loading && styles.linkDisabled]}>Back to Sign in</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>

      <View style={styles.back}>
        <BackButton onPress={() => router.replace(ROUTES.LOGIN)} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  back: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
  },
  content: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 22,
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
    gap: 6,
  },
  title: {
    color: colors.text.main,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: colors.primary.main,
    fontSize: 14,
    textAlign: "center",
  },
  fields: {
    width: "100%",
    maxWidth: 360,
    gap: 10,
  },
  field: {
    gap: 4,
  },
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  inputIcon: {
    position: "absolute",
    left: 14,
    zIndex: 1,
  },
  input: {
    minHeight: 48,
    backgroundColor: colors.secondary.main,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.main,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: colors.text.main,
    fontSize: 14,
  },
  inputWithIcon: {
    paddingLeft: 44,
  },
  inputError: {
    borderColor: colors.red.main,
  },
  inputDisabled: {
    opacity: 0.5,
  },
  fieldError: {
    color: colors.red.main,
    fontSize: 10,
  },
  error: {
    width: "100%",
    maxWidth: 360,
    color: colors.red.main,
    fontSize: 11,
  },
  success: {
    width: "100%",
    maxWidth: 360,
    color: colors.primary.main,
    fontSize: 11,
  },
  submit: {
    width: "100%",
    maxWidth: 360,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.secondary.main,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary.main,
    paddingVertical: 13,
  },
  submitDisabled: {
    borderColor: colors.border.main,
  },
  submitText: {
    color: colors.primary.main,
    fontSize: 15,
    fontWeight: "bold",
  },
  submitTextDisabled: {
    color: colors.bodyText.main,
  },
  footer: {
    paddingVertical: 4,
  },
  footerText: {
    color: colors.primary.main,
    fontSize: 13,
    fontWeight: "bold",
  },
  linkDisabled: {
    opacity: 0.5,
  },
});
