import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Searchbar } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";

import SearchInputBar from "@/components_v2/common/SearchInputBar";
import StyledText from "@/components_v2/common/StyledText";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function SearchActiveShopScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchbarRef = useRef<typeof Searchbar>(null);

  return (
    <View>
      <View style={styles.stickyHeader}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    width: "100%",
    backgroundColor: "#fff",
  },
  stickyHeader: {
    width: SCREEN_WIDTH,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    zIndex: 10,
  },
  searchInput: {
    textAlignVertical: "center",
    marginTop: -5,
    fontSize: 16,
    lineHeight: 22,
    color: "#767676",
    fontFamily: Platform.select({
      android: "Poppins_400Regular",
      ios: "Poppins-Regular",
    }) as string,
  },
  customPlaceholder: {
    position: "absolute",
    left: 53,
    top: "50%",
    transform: [{ translateY: -7 }],
    color: "#686868",
    fontSize: 12,
  },
  searchCategoryContainer: {
    alignItems: "center",
    paddingVertical: 5,
  },
});
