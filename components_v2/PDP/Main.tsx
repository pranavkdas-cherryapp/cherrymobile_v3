import { useState, useEffect } from "react";
import { View } from "react-native";
import BrandContent from "@/components_v2/PDP/BrandContent";
import axios from "axios";
import { components } from "@/types/apiTypes";

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
        console.log("validProducts", validProducts[0].product.productId);
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

  interface ProductListParams {
    brandId: string;
    productIds: string[];
    onLoadingChange?: (loading: boolean) => void;
    onProductsLoaded?: (products: Product[]) => void;
    storyDiscountMeta: components["schemas"]["CategoryDiscountDetails"] | null;
    reelOrPostDiscountMeta:
      | components["schemas"]["CategoryDiscountDetails"]
      | null;
  }

  interface ProgressCallback {
    onProductFetched?: (product: Product) => void;
  }

  const getProductDetails = async (
    brandUrl: string,
    productId: string
  ): Promise<any> => {
    try {
      const url = `https://www.${brandUrl}/products/${productId}.json`;
      console.log("Fetching product from:", url);

      const response = await axios.get(url, {
        timeout: 10000,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
    }
  };

  const fetchProductList = async (
    props: ProductListParams,
    callbacks?: ProgressCallback
  ): Promise<any[]> => {
    if (!props.productIds || props.productIds.length === 0) return [];

    const results: any[] = new Array(props.productIds.length);

    try {
      const promises = props.productIds.map(async (productId, index) => {
        try {
          const response = await getProductDetails(props.brandId, productId);
          console.log("Fetched Product:", response);

          results[index] = {
            data: response,
            productId,
            success: true,
            error: null,
          };
          callbacks?.onProductFetched?.(results[index]);
          return results[index]; // ✅ Return correct product
        } catch (error) {
          results[index] = {
            data: null,
            productId,
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
          };
          callbacks?.onProductFetched?.(results[index]);
          return results[index]; // ✅ Return correct error object
        }
      });

      return await Promise.all(promises); // ✅ Await the entire array of promises
    } catch (error) {
      console.error("Error in fetchProductList:", error);
      return props.productIds.map((productId) => ({
        data: null,
        error: "Failed to process API calls",
        success: false,
        productId,
      }));
    }
  };

  return (
    <View>
      <BrandContent products={products} />
    </View>
  );
}
