import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useRouter, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { StoreProvider } from "@/store/storeProvider";
import { useColorScheme } from "@/hooks/useColorScheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();

  const colorScheme = useColorScheme();

  useEffect(() => {
    console.log("RootLayout mounted");

    const handlePushClick = (notificationPayload: any) => {
      console.log("Push clicked payload:", notificationPayload);

      const navigateTo =
        notificationPayload?.data?.clickAction?.payload?.kvPair?.Navigate;
      if (navigateTo) {
        router.navigate(navigateTo);
      }
    };

    // ReactMoE.setEventListener("pushClicked", handlePushClick);
    // router.replace("/onboarding/CheckBackLaterScreen");
    SplashScreen.hideAsync();
    return;

    // 🧼 Clean up listener on unmount
    return () => {
      // only if ReactMoE supports removing listeners
      // ReactMoE.removeEventListener?.("pushClicked");
      console.log("RootLayout unmounted");
    };
  }, []);

  return (
    <StoreProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </StoreProvider>
  );
}
