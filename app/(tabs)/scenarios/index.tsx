import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

import ScenarioCard from "./components/scenario/ScenarioCard";
import { scenarios } from "../../../data/scenarios";
import { colors } from "../../../constants/theme";

// Helper to map image assets
const imageMap: { [key: number]: any } = {
  1: require("../../../assets/images/scenarios/iraq_war.jpeg"),
  2: require("../../../assets/images/scenarios/cuban_missile_crisis.jpeg"),
  3: require("../../../assets/images/scenarios/world_war_1.jpeg"),
  4: require("../../../assets/images/scenarios/world_war_2.jpeg"),
  5: require("../../../assets/images/scenarios/vietnam_war.jpeg"),
};

export default function ScenariosScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <Text style={styles.header}>Scenarios</Text>

      <Text style={styles.subHeader}>
        Choose A Scenario And Ask Yourself, "If You Were In That Situation, What Would You Do?"
      </Text>

      <Text style={styles.count}>{scenarios.length} Scenarios</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={styles.listContent}
      >
        {scenarios.map((scenario) => (
          <ScenarioCard
            key={scenario.id}
            title={scenario.title}
            description={scenario.description}
            time={scenario.time}
            image={imageMap[scenario.id]}
            onPress={() => router.push(`/scenarios/${scenario.id}`)}
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
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  header: {
    color: colors.text.main,
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subHeader: {
    color: colors.primary.main,
    marginBottom: 12,
    fontSize: 14,
  },
  count: {
    color: colors.bodyText.main,
    marginBottom: 12,
    fontSize: 13,
    fontWeight: "600",
  },
  list: {
    flex: 1,
  },
  listContent: {
    alignItems: "stretch",
    paddingRight: 20,
  },
});
