import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import { Image } from "expo-image";
import React, { useMemo, useState } from "react";
import { router } from "expo-router";
import { useAppSelector } from "@/store/hooks";
import { getBrandsListSelector } from "@/store/slices/BrandsSlice";

const ITEM_WIDTH = 128; // Approximate card + margin
const INITIAL_VISIBLE_ITEMS = 4;

const splitIntoRows = (list: any[]) => {
  const row1 = list.filter((_, index) => index % 2 === 0);
  const row2 = list.filter((_, index) => index % 2 === 1);
  return [row1, row2];
};

export default function ShopByCategory() {
  const brandsList = useAppSelector(getBrandsListSelector);

  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_ITEMS);

  const [row1, row2] = useMemo(() => splitIntoRows(brandsList), [brandsList]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const screenWidth = event.nativeEvent.layoutMeasurement.width;
    const nextVisibleCount = Math.ceil((offsetX + screenWidth) / ITEM_WIDTH);
    if (nextVisibleCount > visibleCount) {
      setVisibleCount(nextVisibleCount);
    }
  };

  const BrandCard = React.memo(({ brand }: { brand: any }) => {
    return (
      <TouchableOpacity
        style={styles.brandCard}
        onPress={() => router.push("/shop")}
      >
        <Image
          source={{ uri: brand.primaryImage }}
          style={styles.brandImage}
          contentFit="cover" // or "contain" / "fill"
          transition={0} // Optional: disables fade-in animation
        />
        <Text style={styles.brandName}>{brand.name}</Text>
      </TouchableOpacity>
    );
  });

  const renderBrandRow = (row: any[]) => {
    return row
      .slice(0, visibleCount)
      .map((item) => <BrandCard key={item.brandId} brand={item} />);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shop by brands</Text>
      <ScrollView
        horizontal
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      >
        <View style={styles.rowsWrapper}>
          <View style={styles.row}>{renderBrandRow(row1)}</View>
          <View style={styles.row}>{renderBrandRow(row2)}</View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingTop: 16,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  rowsWrapper: {
    flexDirection: "column",
    flexGrow: 1,
  },
  row: {
    flexDirection: "row",
    marginBottom: 12,
  },
  brandCard: {
    width: 108,
    marginRight: 20,
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
});
