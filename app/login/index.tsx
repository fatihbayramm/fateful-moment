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
  Pressable,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { router } from "expo-router";

import { colors } from "@/constants/theme";
import { supabase } from "@/services/supabase";

import BackButton from "@/components/common/BackButton";
import EyeIcon from "@/assets/icons/eye.svg";
import EyeOffIcon from "@/assets/icons/eye_2.svg";

type FieldName = "email" | "password";
type FieldErrors = Partial<Record<FieldName, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateFields = (values: Record<FieldName, string>): FieldErrors => {
  const errors: FieldErrors = {};

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Please enter your password.";
  }

  return errors;
};

const mapSupabaseError = (message: string): FieldErrors => {
  const lower = message.toLowerCase();

  if (lower.includes("invalid login")) {
    return { password: "Incorrect email or password." };
  }

  if (lower.includes("password")) {
    return { password: message };
  }

  if (lower.includes("email")) {
    return { email: message };
  }

  return {};
};

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => setIsKeyboardVisible(true));
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setIsKeyboardVisible(false));

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const canSubmit = email.trim().length > 0 && password.length > 0 && !loading;

  const handleChange = (field: FieldName, value: string) => {
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);

    if (fieldErrors[field]) {
      setFieldErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleSignIn = async () => {
    setError(null);

    const nextFieldErrors = validateFields({ email, password });
    setFieldErrors(nextFieldErrors);

    if (Object.keys(nextFieldErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        const mapped = mapSupabaseError(signInError.message);

        if (Object.keys(mapped).length > 0) {
          setFieldErrors(mapped);
        } else {
          setError(signInError.message);
        }

        return;
      }

      if (!data.user) {
        setError("We could not sign you in. Please try again.");
        return;
      }

      router.replace("/scenarios");
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
          <Text style={styles.title}>Welcome to Fateful Moment</Text>

          <Text style={styles.subtitle}>Sign in with Email</Text>
        </View>

        <View style={styles.fields}>
          <View style={styles.field}>
            <TextInput
              style={[styles.input, loading && styles.inputDisabled, fieldErrors.email && styles.inputError]}
              placeholder="Your email address"
              placeholderTextColor={colors.bodyText.main}
              value={email}
              onChangeText={(value) => handleChange("email", value)}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              editable={!loading}
            />

            {fieldErrors.email ? <Text style={styles.fieldError}>{fieldErrors.email}</Text> : null}
          </View>

          <View style={styles.field}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={[
                  styles.input,
                  styles.inputWithToggle,
                  loading && styles.inputDisabled,
                  fieldErrors.password && styles.inputError,
                ]}
                placeholder="Your password"
                placeholderTextColor={colors.bodyText.main}
                value={password}
                onChangeText={(value) => handleChange("password", value)}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                autoComplete="current-password"
                editable={!loading}
              />

              <Pressable
                style={styles.passwordToggle}
                onPress={() => setIsPasswordVisible((current) => !current)}
                hitSlop={8}
              >
                {isPasswordVisible ? (
                  <EyeOffIcon width={18} height={18} color={colors.bodyText.main} />
                ) : (
                  <EyeIcon width={18} height={18} color={colors.bodyText.main} />
                )}
              </Pressable>
            </View>

            {fieldErrors.password ? <Text style={styles.fieldError}>{fieldErrors.password}</Text> : null}
          </View>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.submit, !canSubmit && styles.submitDisabled]}
          onPress={handleSignIn}
          disabled={!canSubmit}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={colors.primary.main} />
          ) : (
            <Text style={[styles.submitText, !canSubmit && styles.submitTextDisabled]}>Sign in</Text>
          )}
        </TouchableOpacity>

        <Text
          style={[styles.forgotLink, loading && styles.linkDisabled]}
          onPress={loading ? undefined : () => {}}
        >
          Forgot password?
        </Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>No account yet?</Text>

          <Text
            style={[styles.footerLink, loading && styles.linkDisabled]}
            onPress={loading ? undefined : () => router.replace("/register")}
          >
            Sign up
          </Text>
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.back}>
        <BackButton onPress={() => router.replace("/register")} />
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
    color: colors.bodyText.main,
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
  inputWithToggle: {
    paddingRight: 48,
  },
  passwordToggle: {
    position: "absolute",
    right: 14,
    top: 0,
    bottom: 0,
    justifyContent: "center",
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
  forgotLink: {
    color: colors.primary.main,
    fontSize: 13,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  footerText: {
    color: colors.bodyText.main,
    fontSize: 12,
  },
  footerLink: {
    color: colors.primary.main,
    fontSize: 12,
    fontWeight: "bold",
  },
  linkDisabled: {
    opacity: 0.5,
  },
});
