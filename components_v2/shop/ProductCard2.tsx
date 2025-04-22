import React, { useMemo, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import Animated from "react-native-reanimated";
import IconButton from "@/components_v2/common/IconButton";
import { Chip } from "react-native-paper";
import { router } from "expo-router";
import {
  getIsFilterVisibleSelector,
  setIsFilterVisible,
  setSelectedFilterType,
} from "@/store/slices/ShoppingSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { FilterOptions } from "@/store/constants/ShoppingConstants";

const generateProduct = (id: number) => ({
  id: id.toString(),
  title: `Product ${id + 1}`,
  price: `Rs. ${(1000 + id * 100).toLocaleString()}`,
  brand: "Brand Name",
  image: `https://picsum.photos/300/${400 + Math.floor(Math.random() * 200)}`,
  wishlist: Math.random() < 0.5,
  url: "/onboarding",
  height: 150 + Math.floor(Math.random() * 100), // Fixed random height
});

const sampleProducts = Array.from({ length: 50 }).map((_, index) =>
  generateProduct(index)
);

const ProductsGrid = () => {
  const [numColumns, setNumColumns] = useState(2);
  const [products, setProducts] = useState(sampleProducts);
  const isLoadingRef = useRef(false);
  const dispatch = useAppDispatch();
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
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    setTimeout(() => {
      const moreProducts = Array.from({ length: 50 }).map((_, index) =>
        generateProduct(products.length + index)
      );
      setProducts((prev) => [...prev, ...moreProducts]);
      isLoadingRef.current = false;
    }, 500);
  };

  const handleWishlistPress = ({ item }: { item: any }) => {
    const updatedProducts = products.map((product) => {
      console.log("done", product.id, item.id);

      if (product.id === item.id) {
        return {
          ...product,
          wishlist: !product.wishlist,
        };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const OverlayObjects = ({ item }: { item: any }) => {
    const wishlistIcon = item.wishlist
      ? "addedToWishlist"
      : "notAddedToWishlist";
    return (
      <Pressable
        style={styles.overlay}
        onPress={() => handleWishlistPress({ item })}
      >
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
      </Pressable>
    );
  };

  const ProductCard = React.memo(({ item }: { item: any }) => (
    <Pressable onPress={() => router.push(item.url)}>
      <Animated.View entering={Animated.FadeIn} style={styles.card}>
        <Image
          source={{ uri: item.image }}
          style={[styles.image, { height: item.height }]}
          resizeMode="cover"
        />
        <OverlayObjects item={item} />
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.productPrice}>
          {item.price} . {item.brand}
        </Text>
      </Animated.View>
    </Pressable>
  ));

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
              width: "100%",
            }}
          >
            <View style={styles.filtersRow}>
              {Object.keys(FilterOptions).map(
                // ["Sort", "Brands", "Products", "More filters"]
                (filter, index) => (
                  <Chip key={index} style={styles.chip}>
                    <TouchableOpacity
                      style={styles.filterButton}
                      onPress={() => {
                        dispatch(setIsFilterVisible(true));
                        dispatch(
                          setSelectedFilterType(
                            filter as keyof typeof FilterOptions
                          )
                        );
                      }}
                    >
                      <Text style={styles.filterText}>
                        {
                          FilterOptions[filter as keyof typeof FilterOptions]
                            .displayName
                        }
                      </Text>
                    </TouchableOpacity>
                  </Chip>
                )
              )}
            </View>
          </ScrollView>
        }
        renderItem={({ item }) => <ProductCard item={item} />}
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
