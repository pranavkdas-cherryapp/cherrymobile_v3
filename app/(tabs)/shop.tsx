import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import IconButton from "@/components_v2/common/IconButton";
import { Chip, Searchbar } from "react-native-paper";
import { router } from "expo-router";
import SearchInputBar from "@/components_v2/common/SearchInputBar";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ProductsGrid from "@/components_v2/shop/ProductCard2";

export default function ShopScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchbarRef = useRef<typeof Searchbar>(null);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "fashion", title: "Fashion" },
    { key: "beauty", title: "Beauty" },
    { key: "accessories", title: "Accessories" },
    { key: "entertainment", title: "Entertainment" },
  ]);

  const renderScene = SceneMap({
    fashion: ProductsGrid,
    beauty: ProductsGrid,
    accessories: ProductsGrid,
    entertainment: ProductsGrid,
  });

  const renderTabBar = (props: any) => (
    <View>
      <TabBar
        {...props}
        indicatorStyle={styles.tabIndicator}
        style={styles.tabBar}
        labelStyle={styles.tabLabel}
        tabStyle={{ width: "auto", paddingHorizontal: 10 }}
        contentContainerStyle={{ justifyContent: "center" }}
        activeColor="black"
        inactiveColor="gray"
        pressColor="transparent"
      />
    </View>
  );

  return (
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
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  tabBar: {
    backgroundColor: "white",
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tabLabel: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  tabIndicator: {
    backgroundColor: "black",
    height: 2,
    borderRadius: 10,
  },
  productsGrid: {
    padding: 10,
    paddingBottom: 100,
  },
  productCard: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    width: "48%",
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "white",
    padding: 4,
    borderRadius: 20,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    marginHorizontal: 8,
  },
  productPrice: {
    fontSize: 12,
    color: "#555",
    marginTop: 4,
    marginBottom: 8,
    marginHorizontal: 8,
  },
});
