import { getAllBrands } from "@/store/apis/BrandsApis"; // adjust path
import { generateDataFromBrands } from "@/store/utils/BrandsPageUtils";
import { Category } from "@/store/initialState/ShoppingInitialState";
import type { RootState } from "@/store/store";

export const getAllBrandsListPayloadCreator = async () => {
  const brandsData = await getAllBrands(100, 1);
  return brandsData?.brands || [];
};

export const getAllBrandsListExtraReducers = {
  pending: (state: any) => {
    state.loading = true;
  },
  rejected: (state: any, action: any) => {
    state.error = action.error?.message || "Something went wrong";
  },
  fulfilled: (state: any, action: any) => {
    const brandIdBrandDictionary = action.payload.reduce(
      (acc: any, item: any) => {
        acc[item.brandId] = item;
        return acc;
      },
      {}
    );
    state.brandIdBrandDictionary = brandIdBrandDictionary;

    const brandGroupedByStartingLetterList = generateDataFromBrands(
      action.payload
    );
    state.brandGroupedByStartingLetterList = brandGroupedByStartingLetterList;

    const brandsGroupedByCategoryDict = action.payload.reduce(
      (acc: Record<Category, any[]>, item: any) => {
        const category = Category[item.category.name as keyof typeof Category];
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(item.name);
        return acc;
      },
      {} as Record<keyof typeof Category, any[]>
    );
    state.brandsGroupedByCategoryDict = brandsGroupedByCategoryDict;
  },
  settled: (state: any, action: any) => {
    state.loading = false;
  },
};
