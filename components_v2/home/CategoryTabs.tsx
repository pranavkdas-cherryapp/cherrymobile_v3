import * as React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";

const products = {
  fashion: [
    "Tshirt",
    "Shirt",
    "Jeans",
    "Corset",
    "Co-ord set",
    "Inner wear",
    "Shorts",
    "Skirt",
    "Leggings",
  ],
  beauty: [
    "Lipstick",
    "Foundation",
    "Blush",
    "Mascara",
    "Eyeliner",
    "Highlighter",
    "Concealer",
    "Nail Polish",
    "Face Serum",
  ],
  accessories: [
    "Bags",
    "Jewelry",
    "Belts",
    "Hats",
    "Sunglasses",
    "Scarves",
    "Watches",
    "Wallets",
    "Hair Accessories",
  ],
};

const productIcons = {
  fashion: {
    Tshirt: { name: "tshirt-crew", set: "MaterialCommunityIcons" },
    Shirt: { name: "shirt", set: "Ionicons" },
    Jeans: { name: "body", set: "Ionicons" },
    Corset: { name: "woman", set: "Ionicons" },
    "Co-ord set": { name: "female", set: "Ionicons" },
    "Inner wear": { name: "game-controller", set: "Ionicons" },
    Shorts: { name: "woman", set: "Ionicons" },
    Skirt: { name: "bandage", set: "Ionicons" },
    Leggings: { name: "female", set: "Ionicons" },
  },
  beauty: {
    Lipstick: { name: "lipstick", set: "MaterialCommunityIcons" },
    Foundation: { name: "spray-bottle", set: "MaterialCommunityIcons" },
    Blush: { name: "bottle-tonic", set: "MaterialCommunityIcons" },
    Mascara: { name: "nail", set: "MaterialCommunityIcons" },
    Eyeliner: { name: "lipstick", set: "MaterialCommunityIcons" },
    Highlighter: { name: "spray-bottle", set: "MaterialCommunityIcons" },
    Concealer: { name: "bottle-tonic", set: "MaterialCommunityIcons" },
    "Nail Polish": { name: "nail", set: "MaterialCommunityIcons" },
    "Face Serum": { name: "bottle-tonic", set: "MaterialCommunityIcons" },
  },
  accessories: {
    Bags: { name: "bag-personal", set: "MaterialCommunityIcons" },
    Jewelry: { name: "diamond-stone", set: "MaterialCommunityIcons" },
    Belts: { name: "barbell", set: "Ionicons" },
    Hats: { name: "hat-fedora", set: "MaterialCommunityIcons" },
    Sunglasses: { name: "sunglasses", set: "MaterialCommunityIcons" },
    Scarves: { name: "bandage", set: "Ionicons" },
    Watches: { name: "watch", set: "Feather" },
    Wallets: { name: "card", set: "Ionicons" },
    "Hair Accessories": {
      name: "hair-dryer-outline",
      set: "MaterialCommunityIcons",
    },
  },
};

export default function CategoryTabs() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "fashion", title: "Fashion" },
    { key: "beauty", title: "Beauty" },
    { key: "accessories", title: "Accessories" },
  ]);

  const [contentHeight, setContentHeight] = React.useState(0);
  const contentRef = React.useRef<View>(null);

  const handleLayout = (event: any) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };

  const renderScene = ({ route }: { route: { key: string } }) => {
    return (
      <View
        ref={contentRef}
        onLayout={handleLayout}
        style={styles.productsGrid}
      >
        {products[route.key as keyof typeof products].map((product, index) => (
          <View key={index} style={styles.productCard}>
            <View style={styles.iconContainer}>
              {productIcons[route.key][product].set ===
              "MaterialCommunityIcons" ? (
                <MaterialCommunityIcons
                  name={productIcons[route.key][product].name}
                  size={64}
                  color="black"
                  style={styles.productIcon}
                />
              ) : productIcons[route.key][product].set === "Feather" ? (
                <Feather
                  name={productIcons[route.key][product].name}
                  size={64}
                  color="black"
                  style={styles.productIcon}
                />
              ) : productIcons[route.key][product].set === "Ionicons" ? (
                <Ionicons
                  name={productIcons[route.key][product].name}
                  size={64}
                  color="black"
                  style={styles.productIcon}
                />
              ) : (
                <Image
                  source={{ uri: "https://placehold.co/600x400" }}
                  style={styles.productIcon}
                  resizeMode="contain"
                />
              )}
            </View>
            <Text style={styles.productName}>{product}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderTabBar = (props) => {
    return (
      <View style={styles.tabBarContainer}>
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
          tabStyle={styles.tab}
          labelStyle={styles.label}
          activeColor="#000000"
          inactiveColor="#666666"
          indicatorContainerStyle={styles.indicatorContainer}
        />
      </View>
    );
  };

  return (
    <View style={{ marginTop: 46 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={renderTabBar}
        style={{ height: contentHeight + 80 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: "white",
    // elevation: 1,
    borderColor: "#F3F3F3",
    borderWidth: 1,
    borderRadius: 30,
    margin: 10,
    height: 42,
    width: 300, // 169 or (288 or 300)
    alignSelf: "center",
  },
  tabBar: {
    backgroundColor: "white",
    elevation: 0,
    borderRadius: 30,
    marginHorizontal: 8,
    marginBottom: 8,
    marginTop: 7,
    height: 26,
  },
  tab: {
    minHeight: 26,
    maxHeight: 26,
    paddingHorizontal: 0,
    paddingVertical: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    textTransform: "none",
    lineHeight: 18,
  },
  indicator: {
    backgroundColor: "#F3F3F3",
    height: "100%",
    borderRadius: 30,
    maxWidth: "80%",
  },
  indicatorContainer: {
    paddingHorizontal: 0, // Extra container padding
    zIndex: 0,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: 12,
  },
  productCard: {
    height: 120,
    width: 104, // 3 items per row
    borderRadius: 12,
    backgroundColor: "#fff",
    marginRight: 8,
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  iconContainer: {
    alignItems: "center", // Align icon in the center
    justifyContent: "center", // Center content vertically as well
    marginBottom: 8, // Spacing between icon and product name
  },
  productName: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },
  productImage: {
    width: 90,
    height: 98,
    borderRadius: 12,
    borderColor: "red",
    borderWidth: 1,
  },
  productIcon: {
    width: 64,
    height: 64,
  },
});
