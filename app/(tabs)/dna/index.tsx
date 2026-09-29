import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import TabMenu from "@/app/(tabs)/components/TabMenu";
import { colors } from "@/constants/theme";
import { ROUTES } from "@/utils/routes";

const steps = [
  {
    title: "Six Dimensions",
    body: "Every decision is scored across six dimensions — Vision, Courage, Risk, Control, Empathy and Ethics. Each one captures a different way of weighing consequences.",
  },
  {
    title: "Your Choice Is The Input",
    body: "There is no questionnaire and no scoring you can game. The only input is the option you pick inside a scenario, under a live timer, with every alternative still on the table.",
  },
  {
    title: "You Need Completed Scenarios",
    body: "Your Decision DNA only exists once you have finished scenarios. Until then there is nothing to read — the profile is written by your choices, not by a profile you pick.",
  },
];

export default function DnaScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TabMenu />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <View style={styles.headerText}>
            <Text style={styles.header}>Decision DNA</Text>
            <Text style={styles.subHeader}>How Your Profile Is Calculated ?</Text>
          </View>
        </View>

        <View style={styles.card}>
          {steps.map((step, index) => (
            <View key={step.title} style={styles.step}>
              <Text style={styles.stepIndex}>{String(index + 1).padStart(2, "0")}</Text>

              <View style={styles.stepBody}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepText}>{step.body}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={() => router.push(ROUTES.SCENARIOS)}>
          <Text style={styles.buttonText}>Scenarios</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
    paddingTop: 0,
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  content: {
    paddingBottom: 8,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  headerText: {
    flex: 1,
  },
  header: {
    color: colors.text.main,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 2,
  },
  subHeader: {
    color: colors.primary.main,
    fontSize: 13,
    fontFamily: Platform.select({ ios: "Menlo", android: "monospace", default: "monospace" }),
  },
  card: {
    backgroundColor: colors.secondary.main,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border.main,
    padding: 14,
  },
  step: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  stepIndex: {
    color: colors.primary.main,
    fontSize: 13,
    fontWeight: "bold",
  },
  stepBody: {
    flex: 1,
  },
  stepTitle: {
    color: colors.text.main,
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 2,
  },
  stepText: {
    color: colors.bodyText.main,
    fontSize: 11,
    lineHeight: 16,
  },
  button: {
    alignSelf: "flex-end",
    backgroundColor: colors.secondary.main,
    borderWidth: 1,
    borderColor: colors.primary.main,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 12,
  },
  buttonText: {
    color: colors.primary.main,
    fontSize: 12,
    fontWeight: "bold",
  },
});
