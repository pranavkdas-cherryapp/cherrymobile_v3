import React, { useMemo, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import Animated from "react-native-reanimated";
import IconButton from "@/components_v2/common/IconButton";
import { Chip } from "react-native-paper";

const sampleProducts = Array.from({ length: 50 }).map((_, index) => ({
  id: index.toString(),
  title: `Product ${index + 1}`,
  price: `Rs. ${(1000 + index * 100).toLocaleString()}`,
  brand: "Brand Name",
  image: `https://picsum.photos/300/${400 + Math.floor(Math.random() * 200)}`,
  wishlist: Math.random() < 0.5 ? true : false,
}));

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
      image: `https://picsum.photos/300/${
        400 + Math.floor(Math.random() * 200)
      }`,
      wishlist: Math.random() < 0.5 ? true : false,
    }));
    setProducts([...products, ...moreProducts]);
  };

  const overlayObjects = (item: any) => {
    const wishlistIcon = item.wishlist
      ? "addedToWishlist"
      : "notAddedToWishlist";
    return (
      <View style={styles.overlay}>
        <View style={styles.topTags}>
          <IconButton iconKey={wishlistIcon} width={16} height={16} />
        </View>
        {/* <View style={styles.bottomContent}>
          <Text style={styles.title}>{item.title}</Text>
          {item.description ? (
            <Text style={styles.description}>{item.description}</Text>
          ) : null}
          {item.button ? (
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{item.button}</Text>
            </TouchableOpacity>
          ) : null}
        </View>  */}
      </View>
    );
  };

  return (
    <>
      <MasonryList
        data={products}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 4,
            }}
          >
            <View style={styles.filtersRow}>
              {["Sort", "Brands", "Products", "More filters"].map(
                (filter, index) => (
                  <Chip key={index} style={styles.chip}>
                    <TouchableOpacity style={styles.filterButton}>
                      <Text style={styles.filterText}>{filter}</Text>
                    </TouchableOpacity>
                  </Chip>
                )
              )}
            </View>
          </ScrollView>
        }
        renderItem={({ item }) => (
          <Animated.View entering={Animated.FadeIn} style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={[styles.image, { height: 150 + Math.random() * 100 }]} // Random heights
              resizeMode="cover"
            />
            {overlayObjects(item)}
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
    </>
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
    borderRadius: 12,
  },
  title: {
    padding: 8,
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  filtersRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // <-- Center the chips!
    paddingVertical: 10,
    paddingHorizontal: 10,
    gap: 8, // optional: nice spacing between chips
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  filterText: {
    fontSize: 12,
    fontWeight: "500",
    color: "black",
  },
  chip: {
    marginVertical: 4,
    backgroundColor: "#f5f5f5",
    marginHorizontal: 4,
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
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "space-between",
    padding: 8,
  },
  topTags: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
