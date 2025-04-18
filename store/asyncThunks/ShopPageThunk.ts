import { getProductsList } from "@/store/apis/ShopPageApis"; // adjust path
import type { RootState } from "@/store/store";

export const getProductsPayloadCreator = async (data: any, thunkAPI: any) => {
  const appliedFilters = data.appliedFilters;
  const searchQuery = data.searchQuery;
  //   const state = thunkAPI.getState() as RootState;
  return await getProductsList(appliedFilters, searchQuery);
};

export const getProductsListExtraReducers = {
  pending: (state: any) => {
    state.isProductsListLoading = true;
  },
  rejected: (state: any, action: any) => {
    state.error = action.error;
  },
  fulfilled: (state: any, action: any) => {
    state.data.productsList = action.payload;
  },
  settled: (state: any, action: any) => {
    state.isProductsListLoading = false;
  },
};
