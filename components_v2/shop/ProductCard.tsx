import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const dummyProducts = Array.from({ length: 20 }).map((_, index) => ({
  id: index.toString(),
  title: `Product ${index + 1}`,
  price: `Rs. ${(1000 + index * 100).toLocaleString()}`,
  brand: "Brand Name",
  image: "https://via.placeholder.com/300x400.png?text=Product", // Random placeholder
}));

const ProductCard = ({ item }: { item: any }) => (
  <View style={styles.productCard}>
    <Image
      source={{ uri: item.image }}
      style={styles.productImage}
      resizeMode="cover"
    />
    <TouchableOpacity style={styles.heartIcon}>
      <Text>♡</Text>
    </TouchableOpacity>
    <Text style={styles.productTitle} numberOfLines={2}>
      {item.title}
    </Text>
    <Text style={styles.productPrice}>
      {item.price} . {item.brand}
    </Text>
  </View>
);

export default function ProductsGrid() {
  const [products, setProducts] = useState(dummyProducts);

  const loadMoreProducts = () => {
    const moreProducts = Array.from({ length: 10 }).map((_, index) => ({
      id: (products.length + index).toString(),
      title: `Product ${products.length + index + 1}`,
      price: `Rs. ${(1000 + (products.length + index) * 100).toLocaleString()}`,
      brand: "Brand Name",
      image: "https://via.placeholder.com/300x400.png?text=Product",
    }));
    setProducts([...products, ...moreProducts]);
  };

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductCard item={item} />}
      keyExtractor={(item) => item.id}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      contentContainerStyle={styles.productsGrid}
      onEndReached={loadMoreProducts}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
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
  filtersRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
    backgroundColor: "white",
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
  },
  filterText: {
    fontSize: 12,
    fontWeight: "500",
    color: "black",
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
