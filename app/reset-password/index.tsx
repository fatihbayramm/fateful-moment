import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Linking from "expo-linking";
import { router } from "expo-router";

import { colors } from "@/constants/theme";
import { createDeepLink, ROUTES } from "@/utils/routes";
import { enterApp } from "@/utils/navigation";
import { signInFromDeepLink, supabase } from "@/services/supabase";
import { useKeyboardVisible } from "@/hooks/useKeyboardVisible";

import BackButton from "@/components/common/BackButton";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import EmailIcon from "@/assets/icons/email.svg";
import EyeIcon from "@/assets/icons/eye.svg";
import EyeOffIcon from "@/assets/icons/eye_2.svg";

const passwordRules = [
  { label: "Must be at least 8 characters long", test: (value: string) => value.length >= 8 },
  { label: "Must contain at least 1 uppercase letter", test: (value: string) => /[A-Z]/.test(value) },
  { label: "Must contain at least 1 lowercase letter", test: (value: string) => /[a-z]/.test(value) },
  { label: "Must contain at least 1 digit", test: (value: string) => /[0-9]/.test(value) },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Stage = "request" | "sent" | "update";

type RequestField = "email";
type UpdateField = "password" | "confirmPassword";

type RequestErrors = Partial<Record<RequestField, string>>;
type UpdateErrors = Partial<Record<UpdateField, string>>;

const validateEmail = (email: string): RequestErrors => {
  if (!email.trim()) {
    return { email: "Please enter your email address." };
  }

  if (!EMAIL_PATTERN.test(email.trim())) {
    return { email: "Please enter a valid email address." };
  }

  return {};
};

const validatePasswords = (password: string, confirmPassword: string): UpdateErrors => {
  const errors: UpdateErrors = {};

  if (!password) {
    errors.password = "Please enter a new password.";
  } else if (!passwordRules.every((rule) => rule.test(password))) {
    errors.password = "Your new password does not meet the requirements below.";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your new password.";
  } else if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
};

export default function ResetPasswordScreen() {
  const [stage, setStage] = useState<Stage>("request");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [requestFieldErrors, setRequestFieldErrors] = useState<RequestErrors>({});
  const [updateFieldErrors, setUpdateFieldErrors] = useState<UpdateErrors>({});
  const [loading, setLoading] = useState(false);
  const [isVerifyingLink, setIsVerifyingLink] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isKeyboardVisible = useKeyboardVisible();

  const handledUrl = useRef<string | null>(null);

  const handleUrl = useCallback(async (url: string | null) => {
    if (!url || handledUrl.current === url) {
      return;
    }

    handledUrl.current = url;
    setIsVerifyingLink(true);

    const result = await signInFromDeepLink(url);

    setIsVerifyingLink(false);

    if (result.status === "ignore") {
      handledUrl.current = null;
      return;
    }

    if (result.status === "error") {
      setStage("request");
      setError(result.message);
      return;
    }

    setStage("update");
  }, []);

  useEffect(() => {
    Linking.getInitialURL().then(handleUrl);

    const subscription = Linking.addEventListener("url", ({ url }) => handleUrl(url));

    return () => subscription.remove();
  }, [handleUrl]);

  const rules = useMemo(
    () => passwordRules.map((rule) => ({ label: rule.label, valid: rule.test(password) })),
    [password],
  );

  const isBusy = loading || isVerifyingLink;

  const canSubmitEmail = email.trim().length > 0 && !isBusy;
  const canSubmitPassword = password.length > 0 && confirmPassword.length > 0 && !isBusy;

  const handleChangeEmail = (value: string) => {
    setEmail(value);

    if (requestFieldErrors.email) {
      setRequestFieldErrors({});
    }
  };

  const handleChangePassword = (field: UpdateField, value: string) => {
    if (field === "password") setPassword(value);
    if (field === "confirmPassword") setConfirmPassword(value);

    if (updateFieldErrors[field]) {
      setUpdateFieldErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  const handleSendResetLink = async () => {
    setError(null);

    const nextFieldErrors = validateEmail(email);
    setRequestFieldErrors(nextFieldErrors);

    if (Object.keys(nextFieldErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: createDeepLink(ROUTES.RESET_PASSWORD),
      });

      if (resetError) {
        const lower = resetError.message.toLowerCase();
        const message = lower.includes("email") ? resetError.message : null;

        if (message) {
          setRequestFieldErrors({ email: message });
        } else {
          setError(resetError.message);
        }

        return;
      }

      setStage("sent");
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    setError(null);

    const nextFieldErrors = validatePasswords(password, confirmPassword);
    setUpdateFieldErrors(nextFieldErrors);

    if (Object.keys(nextFieldErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        const lower = updateError.message.toLowerCase();
        const message = lower.includes("password") ? updateError.message : null;

        if (message) {
          setUpdateFieldErrors({ password: message });
        } else {
          setError(updateError.message);
        }

        return;
      }

      enterApp(ROUTES.SCENARIOS);
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSignIn = () => router.replace(ROUTES.LOGIN);

  const submit = {
    request: { label: "Send Reset Link", onPress: handleSendResetLink, disabled: !canSubmitEmail },
    sent: { label: "Back to Sign in", onPress: handleBackToSignIn, disabled: isBusy },
    update: { label: "Update Password", onPress: handleUpdatePassword, disabled: !canSubmitPassword },
  }[stage];

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
        {stage === "sent" ? (
          <View style={styles.sent}>
            <View style={styles.checkBadge}>
              <CheckCircleIcon width={48} height={48} color={colors.primary.main} />
            </View>

            <Text style={styles.title}>Check Your Email</Text>

            <Text style={styles.sentBody}>
              We&apos;ve sent password reset instructions to <Text style={styles.sentEmail}>{email.trim()}</Text>
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.logoRing}>
              <Image source={require("@/assets/images/app/app_icon.png")} style={styles.logo} resizeMode="cover" />
            </View>

            <View style={styles.headerText}>
              <Text style={styles.title}>{stage === "request" ? "Reset your password" : "Choose a new password"}</Text>

              <Text style={styles.subtitle}>
                {stage === "request"
                  ? "Enter your email to receive a reset link."
                  : "Your new password has to meet the requirements below."}
              </Text>
            </View>

            {isVerifyingLink ? (
              <View style={styles.verifying}>
                <ActivityIndicator color={colors.primary.main} />

                <Text style={styles.verifyingText}>Verifying your reset link...</Text>
              </View>
            ) : null}

            {stage === "request" ? (
              <View style={styles.fields}>
                <View style={styles.field}>
                  <View style={styles.inputWrapper}>
                    <EmailIcon width={18} height={18} style={styles.inputIcon} />

                    <TextInput
                      style={[
                        styles.input,
                        styles.inputWithIcon,
                        isBusy && styles.inputDisabled,
                        requestFieldErrors.email && styles.inputError,
                      ]}
                      placeholder="Your email address"
                      placeholderTextColor={colors.bodyText.main}
                      value={email}
                      onChangeText={handleChangeEmail}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      autoComplete="email"
                      editable={!isBusy}
                    />
                  </View>

                  {requestFieldErrors.email ? <Text style={styles.fieldError}>{requestFieldErrors.email}</Text> : null}
                </View>
              </View>
            ) : (
              <View style={styles.fields}>
                <View style={styles.field}>
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={[
                        styles.input,
                        styles.inputWithToggle,
                        isBusy && styles.inputDisabled,
                        updateFieldErrors.password && styles.inputError,
                      ]}
                      placeholder="New password"
                      placeholderTextColor={colors.bodyText.main}
                      value={password}
                      onChangeText={(value) => handleChangePassword("password", value)}
                      secureTextEntry={!isPasswordVisible}
                      autoCapitalize="none"
                      editable={!isBusy}
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

                  {updateFieldErrors.password ? (
                    <Text style={styles.fieldError}>{updateFieldErrors.password}</Text>
                  ) : null}
                </View>

                <View style={styles.field}>
                  <TextInput
                    style={[
                      styles.input,
                      isBusy && styles.inputDisabled,
                      updateFieldErrors.confirmPassword && styles.inputError,
                    ]}
                    placeholder="Confirm new password"
                    placeholderTextColor={colors.bodyText.main}
                    value={confirmPassword}
                    onChangeText={(value) => handleChangePassword("confirmPassword", value)}
                    secureTextEntry={!isPasswordVisible}
                    autoCapitalize="none"
                    editable={!isBusy}
                  />

                  {updateFieldErrors.confirmPassword ? (
                    <Text style={styles.fieldError}>{updateFieldErrors.confirmPassword}</Text>
                  ) : null}
                </View>
              </View>
            )}

            {stage === "update" ? (
              <View style={styles.rules}>
                {rules.map((rule) => (
                  <View key={rule.label} style={styles.rule}>
                    <CheckCircleIcon
                      width={14}
                      height={14}
                      color={rule.valid ? colors.primary.main : colors.bodyText.main}
                    />

                    <Text style={[styles.ruleLabel, rule.valid && styles.ruleLabelValid]}>{rule.label}</Text>
                  </View>
                ))}
              </View>
            ) : null}

            {error ? <Text style={styles.error}>{error}</Text> : null}
          </>
        )}

        <TouchableOpacity
          style={[styles.submit, submit.disabled && styles.submitDisabled]}
          onPress={submit.onPress}
          disabled={submit.disabled}
          activeOpacity={0.8}
        >
          {loading || isVerifyingLink ? (
            <ActivityIndicator color={colors.primary.main} />
          ) : (
            <Text style={[styles.submitText, submit.disabled && styles.submitTextDisabled]}>{submit.label}</Text>
          )}
        </TouchableOpacity>

        {stage !== "sent" ? (
          <TouchableOpacity style={styles.footer} onPress={isBusy ? undefined : handleBackToSignIn} activeOpacity={0.8}>
            <Text style={[styles.footerText, isBusy && styles.linkDisabled]}>Back to Sign in</Text>
          </TouchableOpacity>
        ) : null}
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
  verifying: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  verifyingText: {
    color: colors.bodyText.main,
    fontSize: 12,
  },
  sent: {
    alignItems: "center",
    gap: 10,
  },
  checkBadge: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: "rgba(0, 211, 243, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  sentBody: {
    color: colors.bodyText.main,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center",
  },
  sentEmail: {
    color: colors.text.main,
    fontWeight: "bold",
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
  inputWithToggle: {
    paddingRight: 44,
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
  inputDisabled: {
    opacity: 0.5,
  },
  fieldError: {
    color: colors.red.main,
    fontSize: 10,
  },
  rules: {
    width: "100%",
    maxWidth: 360,
    gap: 4,
  },
  rule: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  ruleLabel: {
    color: colors.bodyText.main,
    fontSize: 10,
  },
  ruleLabelValid: {
    color: colors.primary.main,
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
