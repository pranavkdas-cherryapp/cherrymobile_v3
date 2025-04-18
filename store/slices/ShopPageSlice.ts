import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "@/store/createAppSlice";
import {
  initialState,
  FiltersList,
  AppliedFiltersList,
} from "@/store/initialState/ShopPageInitialState";
import { getProductsPayloadCreator } from "@/store/asyncThunks/ShopPageThunk";
import { getProductsListExtraReducers } from "@/store/asyncThunks/ShopPageThunk";

export const shopPageSlice = createAppSlice({
  name: "shopPage",
  initialState,
  reducers: (create) => ({
    getProducts: create.asyncThunk(
      getProductsPayloadCreator,
      getProductsListExtraReducers
    ),
  }),

  selectors: {
    getProducts: (state: any) => state.products,
  }
});




  export const { getProducts } =
    shopPageSlice.actions;


  // {
  //   setProducts(state, action: PayloadAction<any[]>) {
  //     state.productsToDisplay = action.payload;
  //   },
  //   addMoreProducts(state, action: PayloadAction<any[]>) {
  //     state.productsToDisplay = [...state.productsToDisplay, ...action.payload];
  //   },
  //   setFiltersList(state, action: PayloadAction<FiltersList>) {
  //     state.filtersList = action.payload;
  //   },
  //   setAppliedFilters(state, action: PayloadAction<AppliedFiltersList>) {
  //     state.appliedFilters = action.payload;
  //   },
  //   setProductsListLoading(state, action: PayloadAction<boolean>) {
  //     state.productsListLoading = action.payload;
  //   },
  //   setError(state, action: PayloadAction<any>) {
  //     state.error = action.payload;
  //   },
  //   resetProducts(state) {
  //     state.productsToDisplay = [];
  //   },
  // },
});
