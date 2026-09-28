import { Stack } from "expo-router";
import { NavigationBar } from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/constants/theme";

export default function RootLayout() {
  return (
    <SafeAreaView style={styles.root} edges={["top", "bottom", "left", "right"]}>
      <StatusBar hidden />
      <NavigationBar hidden />

      <Stack
        screenOptions={{
          headerShown: false,
          orientation: "landscape",
          contentStyle: {
            backgroundColor: colors.background.main,
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            orientation: "portrait",
          }}
        />

        <Stack.Screen
          name="register"
          options={{
            headerShown: false,
            orientation: "portrait",
          }}
        />

        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
            orientation: "portrait",
          }}
        />

        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            orientation: "landscape",
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
});
