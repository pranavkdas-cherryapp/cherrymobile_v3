import { components } from "@/types/apiTypes";
import { View, ScrollView, StyleSheet } from "react-native";
import axios from "axios";
import BrandProductCard from "@/components_v2/PDP/BrandProductCard";

const brandDetails = {
  brandDetailsMeta: {
    brandId: "67de68e9304dfe15b3244f64",
    brandType: "CASHBACK",
    category: {
      description: "Skincare and makeup products",
      id: "670014ae73fb1b5ab9355638",
      name: "Beauty",
    },
    description: "Skin-loving, high quality SPF that you actually want to wear",
    discountPercentage: 60,
    instagramHandle: "52sundaze_",
    instagramImageOne:
      "https://cherry-meta.s3.ap-south-1.amazonaws.com/52+Sundaez_insta.png",
    instagramImageSecond: null,
    logo: "https://cherry-meta.s3.ap-south-1.amazonaws.com/52+Sundaez_logo.png",
    maxDiscount: 1500,
    name: "52 Sundaze",
    offerDescription: null,
    offerDiscountPercentage: null,
    offerMaxDiscount: null,
    offerType: null,
    postDiscountMeta: {
      discountPercentage: 60,
      maxDiscount: 1500,
      offerDiscountPercentage: null,
    },
    priceLevel: null,
    primaryImage:
      "https://cherry-meta.s3.ap-south-1.amazonaws.com/52+Sundaez_Cover.png",
    products: null,
    reelDiscountMeta: {
      discountPercentage: 60,
      maxDiscount: 1500,
      offerDiscountPercentage: null,
    },
    shopifyHandles: [
      "spf50-collagen-glow",
      "spf-50-rice-sun-mist",
      "spf-glow-kit-rose",
      "spf-50-sun-milk-multi-active-creme",
      "spf50-clear-glow-spf-mist-with-rosewater",
    ],
    storyDiscountMeta: {
      discountPercentage: 40,
      maxDiscount: 750,
      offerDiscountPercentage: null,
    },
    styles: null,
    website: "52sundaze.com",
  },
  couponCodeRef: null,
  lastTransactionRef: null,
};

interface Product {
  data: {
    product: {
      title: string;
      images: Array<{ src: string }>;
      variants: Array<{ price: string }>;
    };
  };
  productId: string;
  success: boolean;
  error: string | null;
}

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
    marginTop: 30,
  },
  scrollContent: {
    paddingHorizontal: 16,
    alignItems: "center",
  },
});
