import { View, Text, StyleSheet, ScrollView } from "react-native";
import ScenarioCard from "./components/scenario/ScenarioCard";
import { scenarios } from "../../../data/scenarios";
import { colors } from "../../../constants/theme";
import { router } from "expo-router";

// Helper to map image assets
const imageMap: { [key: number]: any } = {
  1: require("../../../assets/images/scenarios/iraq_war.jpeg"),
  2: require("../../../assets/images/scenarios/cuban_missile_crisis.jpeg"),
  3: require("../../../assets/images/scenarios/world_war_1.jpeg"),
  4: require("../../../assets/images/scenarios/world_war_2.jpeg"),
  5: require("../../../assets/images/scenarios/vietnam_war.jpeg"),
};

export default function ScenariosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Scenarios</Text>
      <Text style={styles.subHeader}>
        Choose A Scenario And Ask Yourself, "If You Were In That Situation, What Would You Do?"
      </Text>
      <Text style={styles.count}>{scenarios.length} Scenarios</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.list}>
        {scenarios.map((scenario) => (
          <ScenarioCard
            key={scenario.id}
            title={scenario.title}
            description={scenario.description}
            time={scenario.time}
            image={imageMap[scenario.id]}
            onPress={() => router.push(``)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.main,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    color: colors.text.main,
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subHeader: {
    color: colors.primary.main,
    marginBottom: 24,
    fontSize: 16,
  },
  count: {
    color: colors.bodyText.main,
    marginBottom: 20,
    fontWeight: "600",
  },
  list: {
    paddingRight: 20,
  },
});
