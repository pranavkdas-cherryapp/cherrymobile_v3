import React, { useMemo, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import MasonryList from "@react-native-seoul/masonry-list";
import Animated from "react-native-reanimated";

const sampleProducts = Array.from({ length: 50 }).map((_, idx) => ({
  name: `Product ${idx + 1}`,
  image: `https://placehold.co/300x${200 + (idx % 5) * 30}`,
}));

const ProductsGrid = () => {
  const [numColumns, setNumColumns] = useState(2);

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

  return (
    <MasonryList
      data={sampleProducts}
      keyExtractor={(item, index) => `${item.name}-${index}`}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => (
        <Animated.View entering={Animated.FadeIn} style={styles.card}>
          <Image
            source={{ uri: item.image }}
            style={[styles.image, { height: 150 + Math.random() * 100 }]} // Random heights
            resizeMode="cover"
          />
          <Text style={styles.title}>{item.name}</Text>
        </Animated.View>
      )}
      contentContainerStyle={styles.container}
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
});
