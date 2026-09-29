import { Tabs } from "expo-router";
import { NavigationBar } from "expo-navigation-bar";

export default function TabLayout() {
  return (
    <>
      <NavigationBar hidden />

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarButton: () => null,
          tabBarStyle: { display: "none" },
        }}
      >
        <Tabs.Screen name="dna" options={{ title: "Dna" }} />
        <Tabs.Screen name="scenarios" options={{ title: "Scenarios" }} />
        <Tabs.Screen name="settings" options={{ title: "Settings" }} />
      </Tabs>
    </>
  );
}
