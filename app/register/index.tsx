import { useMemo, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

import { colors } from "../../constants/theme";
import { supabase } from "../../services/supabase";

import BackButton from "../../components/common/BackButton";
import DnaIcon from "../../assets/icons/dna.svg";
import CheckCircleIcon from "../../assets/icons/check-circle.svg";

const passwordRules = [
  { label: "Must be at least 8 characters long", test: (value: string) => value.length >= 8 },
  { label: "Must contain at least 1 uppercase letter", test: (value: string) => /[A-Z]/.test(value) },
  { label: "Must contain at least 1 lowercase letter", test: (value: string) => /[a-z]/.test(value) },
  { label: "Must contain at least 1 digit", test: (value: string) => /[0-9]/.test(value) },
];

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const rules = useMemo(
    () => passwordRules.map((rule) => ({ label: rule.label, valid: rule.test(password) })),
    [password]
  );

  const isPasswordValid = rules.every((rule) => rule.valid);
  const canSubmit = fullName.trim().length > 0 && email.trim().length > 0 && isPasswordValid && !loading;

  const handleSignUp = async () => {
    setError(null);
    setLoading(true);

    const { error: signUpError } = await supabase.auth.signUp({
      email: email.trim(),
      password,
      options: {
        data: { full_name: fullName.trim() },
      },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoRing}>
          <DnaIcon width={56} height={56} color={colors.primary.main} />
        </View>

        <Text style={styles.title}>Create your Fateful Moment Account</Text>

        <View style={styles.fields}>
          <TextInput
            style={[styles.input, loading && styles.inputDisabled]}
            placeholder="Full name"
            placeholderTextColor={colors.bodyText.main}
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
            editable={!loading}
          />

          <TextInput
            style={[styles.input, loading && styles.inputDisabled]}
            placeholder="Email"
            placeholderTextColor={colors.bodyText.main}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
            editable={!loading}
          />

          <TextInput
            style={[styles.input, loading && styles.inputDisabled]}
            placeholder="Your password"
            placeholderTextColor={colors.bodyText.main}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            editable={!loading}
          />
        </View>

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
            onPress={loading ? undefined : () => router.replace("/login")}
          >
            Sign in
          </Text>
        </View>
      </ScrollView>

      <View style={styles.back}>
        <BackButton />
      </View>
    </View>
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
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: colors.primary.main,
    alignItems: "center",
    justifyContent: "center",
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
  },
  footerLinkDisabled: {
    opacity: 0.5,
  },
});
