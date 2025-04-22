import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "@/store/createAppSlice";
import { brandsInitialState } from "@/store/initialState/BrandsInitialState";
import {
  getAllBrandsListExtraReducers,
  getAllBrandsListPayloadCreator,
} from "@/store/asyncThunks/BrandsPageThunk";

export const brandsSlice = createAppSlice({
  name: "brands",
  initialState: brandsInitialState,
  reducers: (create) => ({
    getBrandsList: create.asyncThunk(
      // not sture if this is needed
      getAllBrandsListPayloadCreator,
      getAllBrandsListExtraReducers
    ),
  }),

  selectors: {
    getAllBrandsListSelector: (state: any) => state.allBrandsList,
  },
});

export const { getBrandsList } = brandsSlice.actions;

export const { getAllBrandsListSelector } = brandsSlice.selectors;
