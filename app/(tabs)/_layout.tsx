import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { colors } from "../../constants/theme";
import DnaIcon from "../../assets/icons/dna.svg";
import CompassIcon from "../../assets/icons/compass.svg";
import SettingsIcon from "../../assets/icons/settings.svg";

const iconStyle = { width: 24, height: 24 };

export default function TabLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.background.main,
            borderTopColor: colors.border.main,
          },
          tabBarActiveTintColor: colors.primary.main,
          tabBarInactiveTintColor: colors.bodyText.main,
        }}
      >
        <Tabs.Screen
          name="dna"
          options={{
            title: "Dna",
            headerShown: false,
            tabBarIcon: () => <DnaIcon {...iconStyle} color={colors.primary.main} />,
          }}
        />

        <Tabs.Screen
          name="scenarios"
          options={{
            title: "Scenarios",
            headerShown: false,
            tabBarIcon: () => <CompassIcon {...iconStyle} color={colors.primary.main} />,
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: () => <SettingsIcon {...iconStyle} color={colors.primary.main} />,
          }}
        />
      </Tabs>
    </>
  );
}
