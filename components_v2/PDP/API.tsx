import { Product } from "./BrandDetails";
import { components } from "@/types/apiTypes";
import axios from "axios";
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

export const fetchProductList = async (
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
