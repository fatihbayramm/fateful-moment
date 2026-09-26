import { useLocalSearchParams } from "expo-router";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { scenarios } from "../../../data/scenarios";
import { colors } from "../../../constants/theme";

const imageMap: Record<number, any> = {
  1: require("../../../assets/images/scenarios/iraq_war.jpeg"),
  2: require("../../../assets/images/scenarios/cuban_missile_crisis.jpeg"),
  3: require("../../../assets/images/scenarios/world_war_1.jpeg"),
  4: require("../../../assets/images/scenarios/world_war_2.jpeg"),
  5: require("../../../assets/images/scenarios/vietnam_war.jpeg"),
};

export default function Scenario() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const scenario = scenarios.find((item) => item.id === Number(id));

  if (!scenario) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={imageMap[scenario.id]} style={styles.image} imageStyle={styles.imageStyle}>
        <View style={styles.overlay}>
          <Text style={styles.badge}>SCENARIO BRIEFING</Text>

          <Text style={styles.title}>{scenario.title}</Text>

          <Text style={styles.description}>{scenario.description}</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Start Simulation</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
    padding: 20,
  },
  image: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border.main,
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
    backgroundColor: "rgba(2, 6, 23, 0.4)",
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
