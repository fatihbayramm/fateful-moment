import { Stack } from "expo-router";

export default function ScenariosLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]"
        options={({ route }) => {
          return {
            headerTitleAlign: "center",
            headerShown: false,
            headerBackVisible: false,
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTransparent: false,
          };
        }}
      />
    </Stack>
  );
}
