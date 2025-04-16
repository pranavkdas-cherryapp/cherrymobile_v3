import { components } from "@/types/apiTypes";
import { View, ScrollView, StyleSheet } from "react-native";
import { Product, brandDetails } from "@/components_v2/PDP/BrandDetails";
import BrandProductCard from "@/components_v2/PDP/BrandProductCard";

interface ProductListProps {
  products: Product[];
  storyDiscountMeta: components["schemas"]["CategoryDiscountDetails"] | null;
  reelOrPostDiscountMeta:
    | components["schemas"]["CategoryDiscountDetails"]
    | null;
}

export default function ProductList({
  products,
  storyDiscountMeta,
  reelOrPostDiscountMeta,
}: ProductListProps) {
  if (!products.length) {
    return null;
  }

  return (
    <View style={styles.scrollView}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {products.map((product) => (
          <BrandProductCard
            key={product.product.id}
            title={product.product.title}
            imageUrl={product.product.images[0].src}
            price={product.product.variants[0].price}
            deeplinkUrl={`https://${brandDetails?.brandDetailsMeta?.website}/products/${product.product.handle}`}
            storyDiscountMeta={storyDiscountMeta}
            reelOrPostDiscountMeta={reelOrPostDiscountMeta}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: 180,
    // marginTop: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    alignItems: "center",
  },
});
