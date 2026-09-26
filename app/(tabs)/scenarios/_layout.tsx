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
          const id = (route.params as any)?.id;
          return {
            headerTitleAlign: "center",
            headerShown: true,
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
