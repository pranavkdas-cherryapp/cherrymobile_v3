import { searchAndFilterProductsApi } from "@/store/apis/ShopPageApis"; // adjust path
import type { RootState } from "@/store/store";
import {
  AppliedFiltersList,
  Category,
} from "@/store/initialState/ShoppingInitialState";

export const searchAndFilterProductsPayloadCreator = async (
  isFirstPage: any,
  thunkAPI: any
) => {
  const state = thunkAPI.getState() as RootState;
  const appliedFilters = state.shopping.appliedFilters as AppliedFiltersList;
  const searchQuery = state.shopping.searchQuery as string;
  const selectedCategory = state.shopping.selectedCategory as Category;
  const numResultsPerQuery = state.shopping.numResultsPerQuery as number;
  const pageNumber: number = isFirstPage
    ? 1
    : (state.shopping.pageNumber as number);

  const response = await searchAndFilterProductsApi(
    selectedCategory,
    appliedFilters,
    searchQuery,
    numResultsPerQuery,
    pageNumber
  );
  return { response: response, isFirstPage: isFirstPage };
};

export const searchAndFilterProductsExtraReducers = {
  pending: (state: any) => {
    state.isProductsListLoading = true;
  },
  rejected: (state: any, action: any) => {
    state.isProductsListLoading = false;
    state.error = action.error;
  },
  fulfilled: (state: any, action: any) => {
    // state.productsList = [...state.productsList, ...action.payload];
    let variants = action.payload.response.variants.map((variant: any) => {
      return {
        ...variant,
        wishlist: Math.random() < 0.5,
        url: "/onboarding",
        height: 150 + Math.floor(Math.random() * 100), // Fixed random height
      };
    });
    if (action.payload.isFirstPage) {
      state.productsToDisplay = variants;
      state.pageNumber = 1;
    } else {
      state.productsToDisplay = [...state.productsToDisplay, ...variants];
    }
    if (variants.length < state.numResultsPerQuery) {
      state.isLastPage = true;
    } else {
      state.pageNumber = state.pageNumber + 1;
      state.isLastPage = false;
    }
    state.isProductsListLoading = false;
    console.log(
      "state.isLastPage",
      state.isLastPage,
      variants.length,
      state.isProductsListLoading
    );
  },
  settled: (state: any, action: any) => {
    state.isProductsListLoading = false;
  },
};
