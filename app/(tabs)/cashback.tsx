import React, { useState, useRef } from "react";
import { SafeAreaView, View, StyleSheet, Platform } from "react-native";
import IconButton from "@/components_v2/common/IconButton";
import { Searchbar } from "react-native-paper";
import SearchInputBar from "@/components_v2/common/SearchInputBar";
import ListWithAlphabetScroll from "@/components_v2/cashback/ListWithAlphabetScroll";

export default function CashbackScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchbarRef = useRef<typeof Searchbar>(null);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchInputBar
            isSearchActive={isSearchActive}
            searchbarRef={searchbarRef}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearchFocus={() => setIsSearchActive(true)}
            onSearchBlur={() => setIsSearchActive(false)}
            containerStyle={styles.searchInput}
          />
          <View style={styles.searchIcons}>
            <IconButton iconKey="wishlist" width={28} height={28} />
            <IconButton iconKey="help" width={28} height={28} />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <ListWithAlphabetScroll />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 30,
    // paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  searchInput: {
    flex: 1,
  },
  searchIcons: {
    flexDirection: "row",
    marginLeft: 10,
  },
});
