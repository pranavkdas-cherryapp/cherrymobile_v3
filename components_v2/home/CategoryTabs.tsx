import * as React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const products = {
  Fashion: [
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
  Beauty: [
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
  Accessories: [
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

const renderTabContent = (routeKey: string) => () =>
  (
    <View style={styles.productsGrid}>
      {products[routeKey as keyof typeof products].map((product, index) => (
        <View key={index} style={styles.productCard}>
          <Image
            source={{ uri: "https://placehold.co/102x104" }}
            style={styles.productImage}
            resizeMode="contain"
          />
          <Text style={styles.productName}>{product}</Text>
        </View>
      ))}
    </View>
  );

export default function CategoryTabs() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "fashion", title: "Fashion" },
    { key: "beauty", title: "Beauty" },
    { key: "accessories", title: "Accessories" },
  ]);

  const renderScene = SceneMap({
    fashion: renderTabContent("Fashion"),
    beauty: renderTabContent("Beauty"),
    accessories: renderTabContent("Accessories"),
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      renderLabel={({ route, focused, color }) => (
        <Text
          style={{
            fontSize: 12, // 👈 forced here
            fontWeight: "bold",
            color: color,
            textAlign: "center",
            includeFontPadding: false, // Android fix
            textTransform: "none",
          }}
          numberOfLines={1}
          allowFontScaling={false} // prevent device font scaling
        >
          {route.title}
        </Text>
      )}
      indicatorStyle={{
        backgroundColor: "#f3f3f3",
        borderRadius: 30,
        height: "80%",
        margin: 4,
      }}
      style={{
        margin: 10,
        width: 288,
        alignSelf: "center",
        backgroundColor: "#ffffff",
        borderRadius: 30,
        borderColor: "#f3f3f3",
        borderWidth: 1,
      }}
      tabStyle={{
        borderRadius: 30,
      }}
      labelStyle={{
        fontWeight: "bold",
        fontSize: 12,
        textTransform: "none",
      }}
      contentContainerStyle={{
        width: "100%",
      }}
      activeColor="black"
      inactiveColor="black"
      pressColor="transparent"
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get("window").width }}
      renderTabBar={renderTabBar}
    />
  );
}

const styles = StyleSheet.create({
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // center-align grid
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  productCard: {
    height: 120,
    width: 104, // 3 items per row
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  productName: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  productImage: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
});
