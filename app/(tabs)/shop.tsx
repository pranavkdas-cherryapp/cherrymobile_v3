import React, { useState, useRef, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
  Dimensions,
  Modal,
} from "react-native";
import IconButton from "@/components_v2/common/IconButton";
import { Chip, Searchbar } from "react-native-paper";
import { useLocalSearchParams, router } from "expo-router";
import SearchInputBar from "@/components_v2/common/SearchInputBar";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import ProductsGrid from "@/components_v2/shop/ProductGrid";
import SearchActiveShopScreen from "@/components_v2/shop/SearchActive";
import FilterScreen from "@/components_v2/shop/FilterScreen";
import {
  getIsFilterVisibleSelector,
  searchAndFilterProducts,
  setIsFilterVisible,
  setSelectedCategory,
} from "@/store/slices/ShoppingSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { Category } from "@/store/initialState/ShoppingInitialState";

export default function ShopScreen() {
  const { queryParams } = useLocalSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const searchbarRef = useRef<typeof Searchbar>(null);

  const isFilterVisible = useAppSelector(getIsFilterVisibleSelector);
  const dispatch = useAppDispatch();

  const [routes] = useState([
    { key: "fashion", title: "Fashion" },
    { key: "beauty", title: "Beauty" },
    { key: "accessories", title: "Accessories" },
    { key: "entertainment", title: "Entertainment" },
  ]);
  const [index, setIndex] = useState(0);
  const [currentTabKey, setCurrentTabKey] = useState(routes[0].key);

  const renderScene = ({ route }: { route: { key: string } }) => {
    if (route.key !== currentTabKey) return null; // shows empty during transition
    return <ProductsGrid />;
  };

  useEffect(() => {
    if (queryParams && typeof queryParams === "string")
      setSearchQuery(queryParams);
  }, [queryParams]);

  const handleSearchSubmit = (newQuery: string) => {
    setIsSearchActive(false);
    if (newQuery) {
      router.push(`/shop?queryParams=${encodeURIComponent(newQuery)}`);
    } else {
      router.push("/shop");
    }
  };

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
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <SearchInputBar
            isSearchActive={isSearchActive}
            searchbarRef={searchbarRef}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearchFocus={() => setIsSearchActive(true)}
            onSearchBlur={() => handleSearchSubmit(searchQuery)}
            containerStyle={styles.searchInput}
            onClearIconPress={() => handleSearchSubmit("")}
          />
          {!isSearchActive && (
            <View style={styles.searchIcons}>
              <IconButton
                iconKey="wishlist"
                width={36}
                height={36}
                onPress={() => router.push("/shop/wishlist")}
              />
              <IconButton iconKey="help" width={36} height={36} />
            </View>
          )}
        </View>
        {isSearchActive ? (
          <SearchActiveShopScreen />
        ) : (
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            initialLayout={{ width: Dimensions.get("window").width }}
            renderTabBar={renderTabBar}
            onIndexChange={(index: number) => {
              setIndex(index);
              setTimeout(() => {
                setCurrentTabKey(routes[index].key); // delay to let transition complete
              }, 100); // You can tweak this duration
              dispatch(
                setSelectedCategory(routes[index].key as keyof typeof Category)
              );
              dispatch(searchAndFilterProducts(1));
            }}
          />
        )}
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
    // paddingHorizontal: 20,
    // backgroundColor: "#fff",
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
    marginLeft: 8,
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
