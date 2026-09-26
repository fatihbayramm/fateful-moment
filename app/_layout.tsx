import { Stack } from "expo-router";
import { NavigationBar } from "expo-navigation-bar";
import { StyleSheet, View } from "react-native";

import { colors } from "../constants/theme";

export default function RootLayout() {
  return (
    <View style={styles.root}>
      <NavigationBar hidden />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: colors.background.main,
          },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background.main,
  },
});
