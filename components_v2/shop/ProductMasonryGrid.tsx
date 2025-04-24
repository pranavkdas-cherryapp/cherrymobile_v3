import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";

import { Chip } from "react-native-paper";
import {
  setIsFilterVisible,
  setSelectedFilterType,
} from "@/store/slices/ShoppingSlice";
import { FilterOptions } from "@/store/constants/ShoppingConstants";
import { ProductCard } from "@/components_v2/shop/ProductCard2";
import { useAppDispatch } from "@/store/hooks";

export default function ProductMasonryGrid({
  productsToDisplay,
  numColumns,
  handleWishlistPress,
  loadMoreProducts,
  productsLoadingFromStore,
  isLastPageFromStore,
}: {
  productsToDisplay: any[];
  numColumns: number;
  handleWishlistPress: (item: any) => void;
  loadMoreProducts: () => void;
  productsLoadingFromStore: boolean;
  isLastPageFromStore: boolean;
}) {
  const dispatch = useAppDispatch();
  return (
    <>
      <MasonryList
        data={productsToDisplay}
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
        renderItem={({ item }) => (
          <ProductCard item={item} handleWishlistPress={handleWishlistPress} />
        )}
        contentContainerStyle={styles.container}
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          productsLoadingFromStore ? (
            <View style={styles.endCard}>
              <ActivityIndicator size="small" />
            </View>
          ) : isLastPageFromStore ? (
            <View style={styles.endCard}>
              <Text style={styles.endCardText}>No more products to load</Text>
            </View>
          ) : null
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingBottom: 100,
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
  endCard: {
    width: "100%",
    height: 100,
    backgroundColor: "white",
    borderColor: "#F3F3F3",
    borderWidth: 1,
    borderRadius: 12,
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
