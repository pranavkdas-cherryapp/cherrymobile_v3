import { Tabs } from "expo-router";
import React from "react";
import { Platform, Pressable, View, Easing } from "react-native";

import { NoEffectTabBarButton } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Image } from "expo-image";
import StyledText from "@/components_v2/common/StyledText";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: NoEffectTabBarButton,
        tabBarBackground: TabBarBackground,
        tabBarHideOnKeyboard: true,
        // animation: "shift",

        // tabBarStyle: Platform.select({
        //   ios: {
        //     // Use a transparent background on iOS to show the blur effect
        //     position: "absolute",
        //   },
        //   default: {},
        // }),
        tabBarStyle: {
          height: Platform.OS === "android" ? 60 : 100,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                width: 40,
              }}
            >
              {focused ? (
                <Image
                  style={{ height: 24, width: 24 }}
                  source={require("@/assets/images/tabs/home_selected.png")}
                />
              ) : (
                <Image
                  style={{ height: 24, width: 24 }}
                  source={require("@/assets/images/tabs/home.png")}
                  contentFit="contain"
                />
              )}
              <StyledText preset={"consentText"}>Home</StyledText>
            </View>
          ),
          // transitionSpec: {
          //   animation: "timing",
          //   config: {
          //     duration: 300,
          //     easing: Easing.inOut(Easing.ease),
          //   },
          // },
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                width: 60,
              }}
            >
              {focused ? (
                <Image
                  style={{ height: 30, width: 24 }}
                  source={require("@/assets/images/tabs/shop_selected.png")}
                />
              ) : (
                <Image
                  style={{ height: 24, width: 24 }}
                  source={require("@/assets/images/tabs/shop.png")}
                />
              )}
              <StyledText preset={"consentText"}>Shop</StyledText>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cashback"
        options={{
          title: "Cashback",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                width: 60,
              }}
            >
              {focused ? (
                <Image
                  style={{ height: 24, width: 24 }}
                  source={require("@/assets/images/tabs/discount_selected.png")}
                />
              ) : (
                <Image
                  style={{ height: 24, width: 24 }}
                  source={require("@/assets/images/tabs/discount.png")}
                />
              )}
              <StyledText preset={"consentText"}>Cashback</StyledText>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
                width: 40,
              }}
            >
              {focused ? (
                <Image
                  style={{ height: 24, width: 24 }}
                  contentFit="contain"
                  source={require("@/assets/images/tabs/profile_selected.png")}
                />
              ) : (
                <Image
                  style={{ height: 24, width: 24 }}
                  contentFit="contain"
                  source={require("@/assets/images/tabs/profile.png")}
                />
              )}
              <StyledText preset={"consentText"}>Profile</StyledText>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
