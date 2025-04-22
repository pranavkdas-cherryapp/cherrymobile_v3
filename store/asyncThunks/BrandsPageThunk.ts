import { getAllBrands } from "@/store/apis/BrandsApis"; // adjust path
import type { RootState } from "@/store/store";

export const getAllBrandsListPayloadCreator = async (
  data: any,
  thunkAPI: any
) => {
  const brandsData = await getAllBrands(200, 1);
  return brandsData?.brands || [];
};

export const getAllBrandsListExtraReducers = {
  pending: (state: any) => {
    state.loading = true;
  },
  rejected: (state: any, action: any) => {
    state.error = action.error;
  },
  fulfilled: (state: any, action: any) => {
    state.allBrandsList = action.payload;
  },
  settled: (state: any, action: any) => {
    state.loading = false;
  },
};
