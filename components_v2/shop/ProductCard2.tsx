import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import Animated from "react-native-reanimated";

const sampleProducts = Array.from({ length: 50 }).map((_, index) => ({
  id: index.toString(),
  title: `Product ${index + 1}`,
  price: `Rs. ${(1000 + index * 100).toLocaleString()}`,
  brand: "Brand Name",
  //   image: `https://placehold.co/300x${200 + (idx % 5) * 30}`,
  image: `https://picsum.photos/300/${400 + Math.floor(Math.random() * 200)}`,
}));

// const ProductCard = ({ item }: { item: any }) => (
//   <View style={styles.productCard}>
//     <Image
//       source={{ uri: item.image }}
//       style={styles.productImage}
//       resizeMode="cover"
//     />
//     <TouchableOpacity style={styles.heartIcon}>
//       <Text>♡</Text>
//     </TouchableOpacity>
//     <Text style={styles.productTitle} numberOfLines={2}>
//       {item.title}
//     </Text>
//     <Text style={styles.productPrice}>
//       {item.price} . {item.brand}
//     </Text>
//   </View>
// );

const ProductsGrid = () => {
  const [numColumns, setNumColumns] = useState(2);
  const [products, setProducts] = useState(sampleProducts);

  useEffect(() => {
    const calculateColumns = () => {
      const screenWidth = Dimensions.get("window").width;
      const columnWidth = 180; // Your desired card width
      const columns = Math.max(2, Math.floor(screenWidth / columnWidth));
      setNumColumns(columns);
    };

    calculateColumns(); // Initial call

    const subscription = Dimensions.addEventListener(
      "change",
      calculateColumns
    );
    return () => subscription.remove();
  }, []);

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
    <MasonryList
      data={products}
      keyExtractor={(item, index) => `${item.title}-${index}`}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <Animated.View entering={Animated.FadeIn} style={styles.card}>
          <Image
            source={{ uri: item.image }}
            style={[styles.image, { height: 150 + Math.random() * 100 }]} // Random heights
            resizeMode="cover"
          />
          <Text style={styles.productTitle} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.productPrice}>
            {item.price} . {item.brand}
          </Text>
        </Animated.View>
      )}
      contentContainerStyle={styles.container}
      onEndReached={loadMoreProducts}
      onEndReachedThreshold={0.5}
    />
  );
};

export default ProductsGrid;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    margin: 8,
    elevation: 2,
    flex: 1,
  },
  image: {
    width: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    padding: 8,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
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
