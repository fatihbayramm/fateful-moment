import { View, Text, StyleSheet, ScrollView } from "react-native";
import { router } from "expo-router";

import ScenarioCard from "@/app/(tabs)/scenarios/components/scenario/ScenarioCard";
import TabMenu from "@/app/(tabs)/components/TabMenu";
import { scenarios } from "@/data/scenarios";
import { colors } from "@/constants/theme";

// Helper to map image assets
const imageMap: { [key: number]: any } = {
  1: require("@/assets/images/scenarios/iraq_war.jpeg"),
  2: require("@/assets/images/scenarios/cuban_missile_crisis.jpeg"),
  3: require("@/assets/images/scenarios/world_war_1.jpeg"),
  4: require("@/assets/images/scenarios/world_war_2.jpeg"),
  5: require("@/assets/images/scenarios/vietnam_war.jpeg"),
};

export default function ScenariosScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TabMenu />
      </View>

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
    paddingTop: 0,
    paddingHorizontal: 20,
    paddingBottom: 12,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  header: {
    color: colors.text.main,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subHeader: {
    color: colors.primary.main,
    marginBottom: 8,
    fontSize: 13,
  },
  count: {
    color: colors.bodyText.main,
    marginBottom: 8,
    fontSize: 12,
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
