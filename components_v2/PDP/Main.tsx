import { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Platform } from "react-native";
import { Divider } from "react-native-paper";
import BrandContent from "@/components_v2/PDP/BrandContent";
import { fetchProductList } from "@/components_v2/PDP/API";
import { Product, brandDetails } from "@/components_v2/PDP/BrandDetails";
import CashbackForPostingOnInsta from "@/components_v2/PDP/CashbackForPostingOnInsta";
import SeeHowCherryWorks from "@/components_v2/PDP/SeeHowCherryWorks";
import CalculateYourCashbackButton from "@/components_v2/PDP/CalculateYourCashback";
import ProductDetailScreen from "@/components_v2/PDP/ProductDetailScreen";
import ButtonsAtEnd from "@/components_v2/PDP/ButtonsAtEnd";

export default function Main() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadProducts = async () => {
      if (!brandDetails) return;

      const productIds = brandDetails.brandDetailsMeta?.shopifyHandles ?? [];
      const brandWebsite = brandDetails.brandDetailsMeta?.website ?? "";

      if (!productIds.length || !brandWebsite) {
        setProducts([]);
        setProductsLoading(false);
        return;
      }

      try {
        setProductsLoading(true);

        const results = await fetchProductList({
          brandId: brandWebsite,
          productIds,
          storyDiscountMeta: null,
          reelOrPostDiscountMeta: null,
        });

        const validProducts = results
          .filter((r) => r.success && r.data)
          .map((r) => r.data);
        setProducts(validProducts);
        // console.log("validProducts", validProducts[0].product.productId);
      } catch (error) {
        console.error("Error fetching products", error);
        setProducts([]);
      } finally {
        setProductsLoading(false);
      }
    };

    if (brandDetails) {
      loadProducts();
    }
  }, [brandDetails]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={{ flex: 1 }}>
          <ProductDetailScreen />
          <Divider style={styles.wideDivider} />
          <CashbackForPostingOnInsta />
          <Divider style={styles.wideDivider} />
          <SeeHowCherryWorks />
          <Divider style={styles.wideDivider} />
          <CalculateYourCashbackButton />
          <Divider style={styles.wideDivider} />
          <BrandContent products={products} />
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <ButtonsAtEnd />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignContent: "center",
    justifyContent: "center",
  },
  dividerStandard: {
    width: "90%",
    marginTop: 32,
    marginBottom: 16,
    marginHorizontal: 32,
    height: 2,
    backgroundColor: "#f3f3f3",
  },
  divider: {
    width: "100%",
    marginHorizontal: 32,
    marginTop: 25,
    marginBottom: 10,
    height: 2,
    backgroundColor: "#f3f3f3",
  },
  wideDivider: {
    width: "110%",
    // marginTop: 25,
    // marginBottom: 10,
    height: 12,
    backgroundColor: "#f3f3f3",
  },
  dividerBottom: {
    width: "95%",
    marginTop: 16,
    marginBottom: 32,
    marginHorizontal: 32,
    height: 2,
    backgroundColor: "#f3f3f3",
  },
});
