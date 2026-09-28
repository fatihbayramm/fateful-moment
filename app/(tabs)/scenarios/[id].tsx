import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import ScenarioOptions from "@/app/(tabs)/scenarios/components/scenario/ScenarioOptions";
import DecisionDna from "@/app/(tabs)/scenarios/components/decision/DecisionDna";
import BackButton from "@/components/common/BackButton";
import { colors } from "@/constants/theme";
import { scenarios, type ScenarioOption } from "@/data/scenarios";

const imageMap: Record<number, any> = {
  1: require("@/assets/images/scenarios/iraq_war.jpeg"),
  2: require("@/assets/images/scenarios/cuban_missile_crisis.jpeg"),
  3: require("@/assets/images/scenarios/world_war_1.jpeg"),
  4: require("@/assets/images/scenarios/world_war_2.jpeg"),
  5: require("@/assets/images/scenarios/vietnam_war.jpeg"),
};

export default function Scenario() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [started, setStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<ScenarioOption | null>(null);

  const scenario = scenarios.find((item) => item.id === Number(id));

  if (!scenario) {
    return null;
  }

  if (selectedOption) {
    return (
      <View style={styles.fullScreen}>
        <ImageBackground source={imageMap[scenario.id]} style={styles.imageDetail} imageStyle={styles.imageStyle}>
          <View style={styles.fullScreenOverlay}>
            <DecisionDna dna={selectedOption.decisionDna} />
          </View>
        </ImageBackground>
      </View>
    );
  }

  if (started) {
    return (
      <View style={styles.fullScreen}>
        <ImageBackground source={imageMap[scenario.id]} style={styles.imageDetail} imageStyle={styles.imageStyle}>
          <View style={styles.fullScreenOverlay}>
            <ScenarioOptions
              options={scenario.options}
              time={scenario.time}
              onSelect={setSelectedOption}
              onBack={() => setStarted(false)}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.briefing}>
        <ImageBackground source={imageMap[scenario.id]} style={styles.image} imageStyle={styles.imageStyle}>
          <View style={styles.overlay}>
            <Text style={styles.badge}>SCENARIO BRIEFING</Text>

            <Text style={styles.title}>{scenario.title}</Text>

            <Text style={styles.description}>{scenario.description}</Text>

            <TouchableOpacity style={styles.button} onPress={() => setStarted(true)}>
              <Text style={styles.buttonText}>Start Simulation</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={styles.floatingBack}>
          <BackButton />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
    padding: 20,
  },
  fullScreen: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  briefing: {
    flex: 1,
  },
  floatingBack: {
    position: "absolute",
    top: 12,
    left: 12,
    zIndex: 1,
  },
  image: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border.main,
    overflow: "hidden",
  },
  imageDetail: {
    flex: 1,
    overflow: "hidden",
  },
  imageStyle: {
    opacity: 0.5,
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: "rgba(2, 6, 23, 0.4)",
  },
  fullScreenOverlay: {
    flex: 1,
    backgroundColor: "rgba(2, 6, 23, 0.55)",
  },
  badge: {
    color: colors.primary.main,
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    color: colors.text.main,
    fontSize: 34,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 16,
  },
  description: {
    color: colors.text.main,
    fontSize: 16,
    lineHeight: 26,
    textAlign: "center",
    marginBottom: 28,
  },
  button: {
    backgroundColor: colors.secondary.main,
    borderWidth: 1,
    borderColor: colors.primary.main,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  buttonText: {
    color: colors.primary.main,
    fontSize: 18,
    fontWeight: "bold",
  },
});
