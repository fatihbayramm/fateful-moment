import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import RadarChart from "./RadarChart";
import { colors } from "../../../../../constants/theme";
import type { DecisionDna as DecisionDnaType, Metrics } from "../../../../../data/scenarios";

type MetricKey = keyof Metrics;

import ActivityIcon from "../../../../../assets/icons/activity.svg";
import CpuIcon from "../../../../../assets/icons/cpu.svg";

const portraitMap: Record<string, any> = {
  "asiri-analist.png": require("../../../../../assets/images/dna-portraits/asiri-analist.png"),
  "bodozlama-dalasan.png": require("../../../../../assets/images/dna-portraits/bodozlama-dalasan.png"),
  "cesur-vizyoner.png": require("../../../../../assets/images/dna-portraits/cesur-vizyoner.png"),
  "empatik-lider-boy.png": require("../../../../../assets/images/dna-portraits/empatik-lider-boy.png"),
  "empatik-lider.png": require("../../../../../assets/images/dna-portraits/empatik-lider.png"),
  "fedakar-koruyucu.png": require("../../../../../assets/images/dna-portraits/fedakar-koruyucu.png"),
  "ilkeli-direnisci-girl.png": require("../../../../../assets/images/dna-portraits/ilkeli-direnisci-girl.png"),
  "ilkeli-direnisci.png": require("../../../../../assets/images/dna-portraits/ilkeli-direnisci.png"),
  "karizmatik-manipulator.png": require("../../../../../assets/images/dna-portraits/karizmatik-manipulator.png"),
  "kriz-yoneticisi.png": require("../../../../../assets/images/dna-portraits/kriz-yoneticisi.png"),
  "pragmatik-taktisyen-girl-2.png": require("../../../../../assets/images/dna-portraits/pragmatik-taktisyen-girl-2.png"),
  "pragmatik-taktisyen-girl.png": require("../../../../../assets/images/dna-portraits/pragmatik-taktisyen-girl.png"),
  "pragmatik-taktisyen.png": require("../../../../../assets/images/dna-portraits/pragmatik-taktisyen.png"),
  "sogukkanli-stratejist.png": require("../../../../../assets/images/dna-portraits/sogukkanli-stratejist.png"),
  "temkinli-yenilikci.png": require("../../../../../assets/images/dna-portraits/temkinli-yenilikci.png"),
  "uyumcu.png": require("../../../../../assets/images/dna-portraits/uyumcu.png"),
};

const metricAxes: { key: MetricKey; label: string }[] = [
  { key: "vision", label: "Vision" },
  { key: "courage", label: "Courage" },
  { key: "risk", label: "Risk" },
  { key: "control", label: "Control" },
  { key: "empathy", label: "Empathy" },
  { key: "ethics", label: "Ethics" },
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

const getWeakestMetric = (metrics: Metrics) =>
  metricAxes.reduce((weakest, axis) => (metrics[axis.key] < metrics[weakest.key] ? axis : weakest));

export default function DecisionDna({ dna }: { dna: DecisionDnaType }) {
  const weakest = getWeakestMetric(dna.metrics);
  const portrait = portraitMap[getPortraitKey(dna.portrait)];

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Karar DNA’sı</Text>

      <View style={styles.columns}>
        <View style={styles.column}>
          <View style={styles.archetypeCard}>
            {portrait ? <Image source={portrait} style={styles.portrait} /> : null}

            <View style={styles.archetypeBody}>
              <Text style={styles.archetypeTitle}>{dna.archetypeTitle.toUpperCase()}</Text>

              <View style={styles.quote}>
                <Text style={styles.archetypeDescription}>{dna.archetypeDescription}</Text>
              </View>
            </View>
          </View>

          <View style={styles.matrixCard}>
            <View style={styles.cardHeader}>
              <ActivityIcon width={16} height={16} color={colors.primary.main} />
              <Text style={styles.cardTitle}>PSYCHOLOGICAL MATRIX</Text>
            </View>

            <View style={styles.matrixBody}>
              <RadarChart metrics={dna.metrics} />

              <View style={styles.metricGrid}>
                {metricAxes.map((axis) => (
                  <View key={axis.key} style={styles.metricItem}>
                    <Text style={styles.metricLabel}>{axis.label.toUpperCase()}</Text>

                    <Text style={styles.metricValue}>{dna.metrics[axis.key]}</Text>

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

            <View style={styles.patternItem}>
              <Text style={styles.patternIndex}>01</Text>
              <Text style={styles.patternText}>{dna.patternNote}</Text>
            </View>
          </View>

          <View style={styles.blindSpotCard}>
            <View style={styles.blindSpotHeader}>
              <CpuIcon width={16} height={16} color={colors.red.main} />
              <Text style={styles.blindSpotTitle}>BLIND SPOT — {weakest.label.toUpperCase()}</Text>
            </View>

            <Text style={styles.blindSpotQuestion}>{blindSpotQuestions[weakest.key]}</Text>

            <Text style={styles.blindSpotText}>{dna.blindSpot}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 12,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    color: colors.text.main,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  columns: {
    flexDirection: "row",
    gap: 16,
  },
  column: {
    flex: 1,
    gap: 16,
  },
  archetypeCard: {
    flexDirection: "row",
    gap: 14,
    backgroundColor: colors.secondary.main,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border.main,
    padding: 12,
  },
  portrait: {
    width: 84,
    height: 84,
    borderRadius: 10,
    backgroundColor: colors.background.main,
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
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border.main,
    padding: 12,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  cardTitle: {
    color: colors.bodyText.main,
    fontSize: 11,
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
    gap: 8,
  },
  metricItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metricLabel: {
    width: 52,
    color: colors.bodyText.main,
    fontSize: 8,
    letterSpacing: 0.5,
  },
  metricValue: {
    color: colors.primary.main,
    fontSize: 11,
    fontWeight: "bold",
  },
  metricTrack: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border.main,
    overflow: "hidden",
  },
  metricFill: {
    height: "100%",
    borderRadius: 2,
    backgroundColor: colors.primary.main,
  },
  patternCard: {
    backgroundColor: colors.secondary.main,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border.main,
    padding: 12,
  },
  patternItem: {
    flexDirection: "row",
    gap: 10,
  },
  patternIndex: {
    color: colors.primary.main,
    fontSize: 13,
    fontWeight: "bold",
  },
  patternText: {
    flex: 1,
    color: colors.bodyText.main,
    fontSize: 11,
    lineHeight: 16,
  },
  blindSpotCard: {
    backgroundColor: "rgba(251, 44, 54, 0.08)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.red.main,
    padding: 12,
  },
  blindSpotHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  blindSpotTitle: {
    color: colors.red.main,
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  blindSpotQuestion: {
    color: colors.text.main,
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 8,
  },
  blindSpotText: {
    color: colors.bodyText.main,
    fontSize: 11,
    lineHeight: 16,
  },
});
