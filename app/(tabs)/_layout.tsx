import { Tabs } from "expo-router";

export default function TabLayout() {
  <Tabs>
    <Tabs.Screen
      name="dna"
      options={{
        title: "Dna",
      }}
    />

    <Tabs.Screen
      name="scenarios"
      options={{
        title: "Scenarios",
      }}
    />

    <Tabs.Screen
      name="settings"
      options={{
        title: "Settings",
      }}
    />
  </Tabs>;
}
