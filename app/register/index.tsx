import { useEffect, useMemo, useState } from "react";
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
import { ROUTES } from "@/utils/routes";
import { enterApp } from "@/utils/navigation";
import { supabase } from "@/services/supabase";
import BackButton from "@/components/common/BackButton";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import EyeIcon from "@/assets/icons/eye.svg";
import EyeOffIcon from "@/assets/icons/eye_2.svg";

const passwordRules = [
  { label: "Must be at least 8 characters long", test: (value: string) => value.length >= 8 },
  { label: "Must contain at least 1 uppercase letter", test: (value: string) => /[A-Z]/.test(value) },
  { label: "Must contain at least 1 lowercase letter", test: (value: string) => /[a-z]/.test(value) },
  { label: "Must contain at least 1 digit", test: (value: string) => /[0-9]/.test(value) },
];

type FieldName = "fullName" | "email" | "password";
type FieldErrors = Partial<Record<FieldName, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateFields = (values: Record<FieldName, string>): FieldErrors => {
  const errors: FieldErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Please enter a password.";
  }

  return errors;
};

const mapSupabaseError = (message: string): FieldErrors => {
  const lower = message.toLowerCase();

  if (lower.includes("already registered") || lower.includes("already been registered")) {
    return { email: "An account with this email already exists." };
  }

  if (lower.includes("password")) {
    return { password: message };
  }

  if (lower.includes("email")) {
    return { email: message };
  }

  return {};
};

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
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

  const rules = useMemo(
    () => passwordRules.map((rule) => ({ label: rule.label, valid: rule.test(password) })),
    [password],
  );

  const isPasswordValid = rules.every((rule) => rule.valid);
  const canSubmit = fullName.trim().length > 0 && email.trim().length > 0 && isPasswordValid && !loading;

  const handleChange = (field: FieldName, value: string) => {
    if (field === "fullName") setFullName(value);
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);

    if (fieldErrors[field]) {
      setFieldErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleSignUp = async () => {
    setError(null);

    const nextFieldErrors = validateFields({ fullName, email, password });
    setFieldErrors(nextFieldErrors);

    if (Object.keys(nextFieldErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: fullName.trim() },
        },
      });

      if (signUpError) {
        const mapped = mapSupabaseError(signUpError.message);

        if (Object.keys(mapped).length > 0) {
          setFieldErrors(mapped);
        } else {
          setError(signUpError.message);
        }

        return;
      }

      if (!data.user) {
        setError("We could not create your account. Please try again.");
        return;
      }

      enterApp();
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

        <Text style={styles.title}>Create your Fateful Moment Account</Text>

        <View style={styles.fields}>
          <View style={styles.field}>
            <TextInput
              style={[styles.input, loading && styles.inputDisabled, fieldErrors.fullName && styles.inputError]}
              placeholder="Full name"
              placeholderTextColor={colors.bodyText.main}
              value={fullName}
              onChangeText={(value) => handleChange("fullName", value)}
              autoCapitalize="words"
              editable={!loading}
            />

            {fieldErrors.fullName ? <Text style={styles.fieldError}>{fieldErrors.fullName}</Text> : null}
          </View>

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

        <View style={styles.rules}>
          {rules.map((rule) => (
            <View key={rule.label} style={styles.rule}>
              <CheckCircleIcon width={14} height={14} color={rule.valid ? colors.primary.main : colors.bodyText.main} />

              <Text style={[styles.ruleLabel, rule.valid && styles.ruleLabelValid]}>{rule.label}</Text>
            </View>
          ))}
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.submit, !canSubmit && styles.submitDisabled]}
          onPress={handleSignUp}
          disabled={!canSubmit}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color={colors.primary.main} />
          ) : (
            <Text style={[styles.submitText, !canSubmit && styles.submitTextDisabled]}>Sign up</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Text
            style={[styles.footerLink, loading && styles.footerLinkDisabled]}
            onPress={loading ? undefined : () => router.replace(ROUTES.LOGIN)}
          >
            Sign in
          </Text>
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.back}>
        <BackButton />
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
  title: {
    color: colors.text.main,
    fontSize: 24,
    fontWeight: "bold",
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
  inputError: {
    borderColor: colors.red.main,
  },
  fieldError: {
    color: colors.red.main,
    fontSize: 10,
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
  inputDisabled: {
    opacity: 0.5,
  },
  rules: {
    width: "100%",
    maxWidth: 360,
    gap: 6,
  },
  rule: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ruleLabel: {
    color: colors.bodyText.main,
    fontSize: 11,
  },
  ruleLabelValid: {
    color: colors.text.main,
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
    textDecorationLine: "underline",
  },
  footerLinkDisabled: {
    opacity: 0.5,
  },
});
