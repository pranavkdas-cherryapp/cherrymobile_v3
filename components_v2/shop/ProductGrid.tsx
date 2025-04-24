import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import {
  getProductsLoadingSelector,
  getProductsToDisplaySelector,
  searchAndFilterProducts,
  getIsLastPageSelector,
} from "@/store/slices/ShoppingSlice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import LottieView from "lottie-react-native";
import ProductMasonryGrid from "./ProductMasonryGrid";

const ProductsGrid = () => {
  const productsToDisplay = useAppSelector(getProductsToDisplaySelector);

  const [numColumns, setNumColumns] = useState(2);
  const isLoadingRef = useRef(false);
  const dispatch = useAppDispatch();
  const animationRef = useRef<LottieView>(null);

  const isLastPageFromStore = useAppSelector(getIsLastPageSelector);
  const productsLoadingFromStore = useAppSelector(getProductsLoadingSelector);

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

  const loadMoreProducts = async () => {
    if (isLoadingRef.current) return;
    isLoadingRef.current = true;

    if (!isLastPageFromStore) {
      try {
        await dispatch(searchAndFilterProducts(0));
      } finally {
        isLoadingRef.current = false;
      }
    }
  };

  const handleWishlistPress = ({ item }: { item: any }) => {
    console.log("done", item.id);
    // const updatedProducts = products.map((product) => {
    //   console.log("done", product.id, item.id);
    //   if (product.id === item.id) {
    //     return {
    //       ...product,
    //       wishlist: !product.wishlist,
    //     };
    //   }
    //   return product;
    // });
    // setProducts(updatedProducts);
  };

  // useEffect(() => {
  //   console.log("Products to display:", productsToDisplay);
  // }, [productsToDisplay]);
  if (productsLoadingFromStore) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          ref={animationRef}
          autoPlay
          loop
          source={require("@/assets/lottie/loading.json")}
          style={styles.loadingAnimation}
        />
      </View>
    );
  }

  return (
    <ProductMasonryGrid
      productsToDisplay={productsToDisplay}
      numColumns={numColumns}
      handleWishlistPress={handleWishlistPress}
      loadMoreProducts={loadMoreProducts}
      productsLoadingFromStore={productsLoadingFromStore}
      isLastPageFromStore={isLastPageFromStore}
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
  loadingContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingAnimation: {
    width: 100,
    height: 100,
  },
  endCard: {
    width: "100%",
    height: 100,
    // backgroundColor: "white",
    // borderColor: "#F3F3F3",
    // borderWidth: 1,
    // borderRadius: 12,
    marginVertical: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  endCardText: {
    fontSize: 14,
    color: "gray",
  },
});
