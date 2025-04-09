import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useState } from "react";

const brands = [
  {
    id: "1",
    name: "Chapter 2",
    image: require("@/assets/images/brands/chapter2.png"),
  },
  {
    id: "2",
    name: "Allways",
    image: require("@/assets/images/brands/allways.png"),
  },
  {
    id: "3",
    name: "TYPSY Beauty",
    image: require("@/assets/images/brands/typsy.png"),
  },
  {
    id: "4",
    name: "Off duty",
    image: require("@/assets/images/brands/offduty.png"),
  },
  {
    id: "5",
    name: "Serenade",
    image: require("@/assets/images/brands/serenade.png"),
  },
  {
    id: "6",
    name: "NEWME",
    image: require("@/assets/images/brands/newme.png"),
  },
];

export default function ShopByCategory() {
  const [selectedCategory, setSelectedCategory] = useState("Fashion");

  return (
    <View style={styles.container}>
      {/* Shop by brands */}
      <Text style={styles.heading}>Shop by brands</Text>

      <FlatList
        data={brands}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        contentContainerStyle={{ marginBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.brandCard}>
            <Image source={item.image} style={styles.brandImage} />
            <Text style={styles.brandName}>{item.name}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingTop: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  brandCard: {
    width: "30%",
    marginBottom: 20,
    alignItems: "center",
  },
  brandImage: {
    width: 108,
    height: 136,
    borderRadius: 8,
    marginBottom: 6,
    resizeMode: "cover",
  },
  brandName: {
    fontSize: 12,
    textAlign: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
    gap: 10,
  },
  tabButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  activeTab: {
    backgroundColor: "#eee",
  },
  tabText: {
    fontSize: 14,
    color: "#000",
  },
  activeTabText: {
    fontWeight: "bold",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "30%",
    height: 100,
    borderRadius: 12,
    backgroundColor: "#fafafa",
    marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
  },
  productName: {
    fontSize: 14,
    textAlign: "center",
  },
});
