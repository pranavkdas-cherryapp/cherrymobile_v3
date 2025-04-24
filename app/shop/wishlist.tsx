import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  Dimensions,
  Modal,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IconButton from "@/components_v2/common/IconButton";
import { router } from "expo-router";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ProductsGrid from "@/components_v2/shop/ProductGrid";
import FilterScreen from "@/components_v2/shop/FilterScreen";
import {
  getIsFilterVisibleSelector,
  setIsFilterVisible,
  setSelectedCategory,
} from "@/store/slices/ShoppingSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import StyledText from "@/components_v2/common/StyledText";

export default function ShopScreen() {
  const insets = useSafeAreaInsets();

  const isFilterVisible = useAppSelector(getIsFilterVisibleSelector);
  const dispatch = useAppDispatch();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "all", title: "All" },
    { key: "fashion", title: "Fashion" },
    { key: "beauty", title: "Beauty" },
    { key: "accessories", title: "Accessories" },
    { key: "entertainment", title: "Entertainment" },
  ]);

  const renderScene = SceneMap({
    all: ProductsGrid,
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
        contentContainerStyle={{
          justifyContent: "center",
          paddingHorizontal: 20,
        }}
        activeColor="black"
        inactiveColor="gray"
        pressColor="transparent"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.searchContainer}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: 80,
              borderWidth: 1,
              borderColor: "#f3f3f3",
              padding: 4,
            }}
          >
            <IconButton
              iconKey="goToPreviousPage"
              width={12}
              height={24}
              style={{ position: "relative", right: 6 }}
              onPress={() => router.back()}
            />
          </View>
          <StyledText preset={"headingMedium"} style={styles.headerTitle}>
            My favourites
          </StyledText>
          <View style={{ width: 24 }} />
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          initialLayout={{ width: Dimensions.get("window").width }}
          renderTabBar={renderTabBar}
          onIndexChange={(index: number) => {
            setIndex(index);
            dispatch(
              setSelectedCategory(routes[index].key as keyof typeof Category)
            );
          }}
        />
      </View>
      <Modal
        animationType="slide"
        visible={isFilterVisible}
        onRequestClose={() => dispatch(setIsFilterVisible(false))}
      >
        <FilterScreen onClose={() => dispatch(setIsFilterVisible(false))} />
      </Modal>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 30,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 8,
    justifyContent: "space-between",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    marginRight: 40,
    color: "#313339",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
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
