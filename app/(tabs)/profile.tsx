import { StyleSheet, Image, View, Platform } from "react-native";

import HomeActionCard from "@/components_v2/common/HomeActionCard";
import { router } from "expo-router";
import CategoryTabs from "@/components_v2/home/CategoryTabs";

export default function ProfileScreen() {
  return (
    <View>
      <CategoryTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
