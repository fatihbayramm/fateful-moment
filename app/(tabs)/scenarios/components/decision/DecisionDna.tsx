import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

import RadarChart from "@/app/(tabs)/scenarios/components/decision/RadarChart";
import { colors } from "@/constants/theme";
import type { DecisionDna as DecisionDnaType, Metrics } from "@/data/scenarios";

type MetricKey = keyof Metrics;

import DnaIcon from "@/assets/icons/dna.svg";
import ActivityIcon from "@/assets/icons/activity.svg";
import TargetIcon from "@/assets/icons/target.svg";
import EyeIcon from "@/assets/icons/eye.svg";
import VectorIcon from "@/assets/icons/vector.svg";
import RiskIcon from "@/assets/icons/risk.svg";
import SettingsIcon from "@/assets/icons/settings_2.svg";
import HeartIcon from "@/assets/icons/heart.svg";
import BalanceIcon from "@/assets/icons/balance.svg";

const portraitMap: Record<string, any> = {
  "asiri-analist.png": require("@/assets/images/dna-portraits/asiri-analist.png"),
  "bodozlama-dalasan.png": require("@/assets/images/dna-portraits/bodozlama-dalasan.png"),
  "cesur-vizyoner.png": require("@/assets/images/dna-portraits/cesur-vizyoner.png"),
  "empatik-lider-boy.png": require("@/assets/images/dna-portraits/empatik-lider-boy.png"),
  "empatik-lider.png": require("@/assets/images/dna-portraits/empatik-lider.png"),
  "fedakar-koruyucu.png": require("@/assets/images/dna-portraits/fedakar-koruyucu.png"),
  "ilkeli-direnisci-girl.png": require("@/assets/images/dna-portraits/ilkeli-direnisci-girl.png"),
  "ilkeli-direnisci.png": require("@/assets/images/dna-portraits/ilkeli-direnisci.png"),
  "karizmatik-manipulator.png": require("@/assets/images/dna-portraits/karizmatik-manipulator.png"),
  "kriz-yoneticisi.png": require("@/assets/images/dna-portraits/kriz-yoneticisi.png"),
  "pragmatik-taktisyen-girl-2.png": require("@/assets/images/dna-portraits/pragmatik-taktisyen-girl-2.png"),
  "pragmatik-taktisyen-girl.png": require("@/assets/images/dna-portraits/pragmatik-taktisyen-girl.png"),
  "pragmatik-taktisyen.png": require("@/assets/images/dna-portraits/pragmatik-taktisyen.png"),
  "sogukkanli-stratejist.png": require("@/assets/images/dna-portraits/sogukkanli-stratejist.png"),
  "temkinli-yenilikci.png": require("@/assets/images/dna-portraits/temkinli-yenilikci.png"),
  "uyumcu.png": require("@/assets/images/dna-portraits/uyumcu.png"),
};

const metricAxes: { key: MetricKey; label: string; Icon: any }[] = [
  { key: "vision", label: "Vision", Icon: EyeIcon },
  { key: "courage", label: "Courage", Icon: VectorIcon },
  { key: "risk", label: "Risk", Icon: RiskIcon },
  { key: "control", label: "Control", Icon: SettingsIcon },
  { key: "empathy", label: "Empathy", Icon: HeartIcon },
  { key: "ethics", label: "Ethics", Icon: BalanceIcon },
];

const blindSpotQuestions: Record<MetricKey, string> = {
  vision: "How far ahead are you willing to look?",
  courage: "What are you willing to risk just to be seen acting?",
  risk: "Where exactly is your limit for acceptable loss?",
  control: "How much uncertainty can you actually tolerate?",
  empathy: "Whose cost are you willing to carry as your own?",
  ethics: "How much will you pay to win?",
};

const getPortraitKey = (portrait: string) => portrait.split("/").pop() ?? "";

const splitPatternNotes = (patternNote: string) =>
  patternNote
    .split(/(?<=\.)\s+/)
    .map((note) => note.trim())
    .filter(Boolean)
    .slice(0, 2);

const getWeakestMetric = (metrics: Metrics) =>
  metricAxes.reduce((weakest, axis) => (metrics[axis.key] < metrics[weakest.key] ? axis : weakest));

export default function DecisionDna({ dna }: { dna: DecisionDnaType }) {
  const weakest = getWeakestMetric(dna.metrics);
  const portrait = portraitMap[getPortraitKey(dna.portrait)];
  const patternNotes = splitPatternNotes(dna.patternNote);

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Decision DNA</Text>

      <View style={styles.columns}>
        <View style={styles.column}>
          <View style={styles.archetypeCard}>
            {portrait ? <Image source={portrait} style={styles.portrait} /> : null}

            <View style={styles.archetypeBody}>
              <Text style={styles.archetypeTitle}>{dna.archetypeTitle.toUpperCase()}</Text>

              <View style={styles.quote}>
                <Text style={styles.archetypeDescription}>"{dna.archetypeDescription}"</Text>
              </View>
            </View>
          </View>

          <View style={styles.matrixCard}>
            <View style={styles.cardHeader}>
              <DnaIcon width={16} height={16} color={colors.primary.main} />
              <Text style={styles.cardTitle}>PSYCHOLOGICAL MATRIX</Text>
            </View>

            <View style={styles.matrixBody}>
              <RadarChart metrics={dna.metrics} />

              <View style={styles.metricGrid}>
                {metricAxes.map((axis) => (
                  <View key={axis.key} style={styles.metricItem}>
                    <View style={styles.metricTop}>
                      <axis.Icon width={11} height={11} color={colors.bodyText.main} />
                      <Text style={styles.metricValue}>{dna.metrics[axis.key]}</Text>
                    </View>

                    <Text style={styles.metricLabel}>{axis.label.toUpperCase()}</Text>

                    <View style={styles.metricTrack}>
                      <View style={[styles.metricFill, { width: `${Math.max(dna.metrics[axis.key], 0)}%` }]} />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.column}>
          <View style={styles.patternCard}>
            <View style={styles.cardHeader}>
              <ActivityIcon width={16} height={16} color={colors.primary.main} />
              <Text style={styles.cardTitle}>PATTERN DETECTION</Text>
            </View>

            {patternNotes.map((note, index) => (
              <View key={index} style={styles.patternItem}>
                <Text style={styles.patternIndex}>{String(index + 1).padStart(2, "0")}</Text>
                <Text style={styles.patternText}>{note}</Text>
              </View>
            ))}
          </View>

          <View style={styles.blindSpotCard}>
            <View style={styles.blindSpotHeader}>
              <TargetIcon width={16} height={16} color={colors.red.main} />
              <Text style={styles.blindSpotTitle}>BLIND SPOT — {weakest.label.toUpperCase()}</Text>
            </View>

            <Text style={styles.blindSpotQuestion}>{blindSpotQuestions[weakest.key]}</Text>

            <Text style={styles.blindSpotText}>{dna.blindSpot}</Text>
          </View>

          <TouchableOpacity style={styles.newScenarioButton} onPress={() => router.push("/scenarios")}>
            <Text style={styles.newScenarioButtonText}>New Scenario</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 8,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  title: {
    color: colors.text.main,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  columns: {
    flexDirection: "row",
    gap: 10,
  },
  column: {
    flex: 1,
    gap: 10,
  },
  archetypeCard: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: colors.secondary.main,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.main,
    padding: 10,
  },
  portrait: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  archetypeBody: {
    flex: 1,
    justifyContent: "center",
  },
  archetypeTitle: {
    color: colors.text.main,
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 6,
  },
  quote: {
    borderLeftWidth: 2,
    borderLeftColor: colors.primary.main,
    paddingLeft: 10,
  },
  archetypeDescription: {
    color: colors.bodyText.main,
    fontSize: 11,
    lineHeight: 16,
  },
  matrixCard: {
    backgroundColor: colors.secondary.main,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.main,
    padding: 10,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  cardTitle: {
    color: colors.bodyText.main,
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  matrixBody: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metricGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  metricItem: {
    width: "47%",
    backgroundColor: colors.background.main,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  metricTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  metricLabel: {
    color: colors.bodyText.main,
    fontSize: 7,
    letterSpacing: 0.5,
  },
  metricValue: {
    color: colors.primary.main,
    fontSize: 11,
    fontWeight: "bold",
  },
  metricTrack: {
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.border.main,
    overflow: "hidden",
    marginTop: 4,
  },
  metricFill: {
    height: "100%",
    borderRadius: 2,
    backgroundColor: colors.primary.main,
  },
  patternCard: {
    backgroundColor: colors.secondary.main,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border.main,
    padding: 10,
  },
  patternItem: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 5,
  },
  patternIndex: {
    color: colors.primary.main,
    fontSize: 12,
    fontWeight: "bold",
  },
  patternText: {
    flex: 1,
    color: colors.bodyText.main,
    fontSize: 10,
    lineHeight: 14,
  },
  blindSpotCard: {
    backgroundColor: "rgba(251, 44, 54, 0.08)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.red.main,
    padding: 10,
  },
  blindSpotHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  blindSpotTitle: {
    color: colors.red.main,
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  blindSpotQuestion: {
    color: colors.text.main,
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  blindSpotText: {
    color: colors.bodyText.main,
    fontSize: 10,
    lineHeight: 15,
  },
  newScenarioButton: {
    alignSelf: "flex-end",
    backgroundColor: colors.secondary.main,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary.main,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  newScenarioButtonText: {
    color: colors.primary.main,
    fontSize: 12,
    fontWeight: "bold",
  },
});
