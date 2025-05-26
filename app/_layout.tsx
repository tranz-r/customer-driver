import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import TempoProvider from "./providers";
import "../global.css";

export default function RootLayout() {
  return (
    <TempoProvider>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="customer/create-job"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="customer/dashboard"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="driver/dashboard"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </SafeAreaProvider>
    </TempoProvider>
  );
}
