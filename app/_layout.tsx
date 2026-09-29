import { Stack } from "expo-router";
import { NavigationBar } from "expo-navigation-bar";
import { StyleSheet } from "react-native";
import { initialWindowMetrics, SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/theme";

export default function RootLayout() {
  return (
    // Expo Router's own SafeAreaProvider starts with `initialMetrics: undefined` on native, so the
    // insets arrive one render late. That is invisible for the app itself but shows up inside a
    // Modal, which renders its very first frame before the notch inset is known — the menu sheet
    // then sits flush against the cutout until it is closed and reopened.
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <SafeAreaView style={styles.root} edges={["top", "bottom", "left", "right"]}>
        <NavigationBar hidden />

        <Stack
          screenOptions={{
            headerShown: false,
            orientation: "landscape",
            statusBarHidden: true,
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
              statusBarHidden: false,
              statusBarStyle: "light",
            }}
          />

          <Stack.Screen
            name="register"
            options={{
              headerShown: false,
              orientation: "portrait",
              statusBarHidden: false,
              statusBarStyle: "light",
            }}
          />

          <Stack.Screen
            name="login"
            options={{
              headerShown: false,
              orientation: "portrait",
              statusBarHidden: false,
              statusBarStyle: "light",
            }}
          />

          <Stack.Screen
            name="reset-password"
            options={{
              headerShown: false,
              orientation: "portrait",
              statusBarHidden: false,
              statusBarStyle: "light",
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
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
});
