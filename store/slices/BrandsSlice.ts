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
      getAllBrandsListPayloadCreator,
      getAllBrandsListExtraReducers
    ),
  }),

  selectors: {
    getBrandsGroupedByCategoryDict: (state: any, action: any) => {
      const categoryId = action.payload;
      if (categoryId in state.brandsGroupedByCategoryDict) {
        return state.brandsGroupedByCategoryDict[categoryId];
      }
      return [];
    },
    getBrandsGroupedByStartingLetterList: (state: any) => {
      return state.brandGroupedByStartingLetterList;
    },
  },
});

export const { getBrandsList } = brandsSlice.actions;

export const {
  getBrandsGroupedByCategoryDict,
  getBrandsGroupedByStartingLetterList,
} = brandsSlice.selectors;
