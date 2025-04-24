import { Stack } from "expo-router";

export default function ShopLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="wishlist" />
      {/* <Stack.Screen name="productDiscovery" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
