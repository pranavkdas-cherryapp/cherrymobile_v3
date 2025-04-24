import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "@/store/createAppSlice";
import {
  initialState,
  FiltersList,
  AppliedFiltersList,
  Category,
  SortOption,
} from "@/store/initialState/ShoppingInitialState";
import {
  searchAndFilterProductsPayloadCreator,
  searchAndFilterProductsExtraReducers,
} from "@/store/asyncThunks/ShopPageThunk";
import {
  FilterOptions,
  FilterOptionsKeysMappedToShopFiltersValues,
} from "@/store/constants/ShoppingConstants";
export const shoppingSlice = createAppSlice({
  name: "shopping",
  initialState,
  reducers: (create) => ({
    searchAndFilterProducts: create.asyncThunk(
      searchAndFilterProductsPayloadCreator,
      searchAndFilterProductsExtraReducers
    ),
    setIsFilterVisible: create.reducer(
      (state, action: PayloadAction<boolean>) => {
        state.isFilterVisible = action.payload;
      }
    ),
    setSelectedFilterType: create.reducer(
      (state, action: PayloadAction<keyof typeof FilterOptions>) => {
        state.selectedFilterType = action.payload;
      }
    ),
    setSelectedCategory: create.reducer(
      (state, action: PayloadAction<Category>) => {
        state.productsListLoading = false;
        state.selectedCategory = action.payload;
        state.pageNumber = 1;
        state.isLastPage = false;
        state.productsToDisplay = [];
        state.appliedFilters = {
          productFilterList: [],
          brandFilterList: [],
          sortOptions: null,
        };
      }
    ),
    setAppliedOptionsOfFilter: create.reducer(
      (state, action: PayloadAction<string[] | SortOption | null>) => {
        const filterType = state.selectedFilterType;
        if (filterType) {
          const filterKey = FilterOptionsKeysMappedToShopFiltersValues[
            filterType as keyof typeof FilterOptionsKeysMappedToShopFiltersValues
          ] as keyof AppliedFiltersList;
          if (filterKey === "sortOptions") {
            state.appliedFilters[filterKey] =
              action.payload as SortOption | null;
          } else {
            state.appliedFilters[filterKey] = action.payload as string[];
          }
        }
      }
    ),
    increasePageNumber: create.reducer((state) => {
      state.pageNumber += 1;
    }),
  }),

  selectors: {
    getProductsLoadingSelector: (state: any) => state.productsListLoading,
    getIsFilterVisibleSelector: (state: any) => state.isFilterVisible,
    getSelectedFilterTypeSelector: (state: any) => state.selectedFilterType,
    getSelectedCategorySelector: (state: any) => state.selectedCategory,
    getAppliedOptionsOfFilterSelector: (state: any, action: any) => {
      const filterType = action.payload;
      if (filterType) {
        return state.appliedFilters[
          FilterOptionsKeysMappedToShopFiltersValues[
            filterType as keyof typeof FilterOptionsKeysMappedToShopFiltersValues
          ]
        ];
      }
      return [];
    },
    getOptionsOfFilterSelector: (state: any, action: any) => {
      const filterType = action.payload;
      if (filterType) {
        const filterTypeMappedToState =
          FilterOptionsKeysMappedToShopFiltersValues[
            filterType as keyof typeof FilterOptionsKeysMappedToShopFiltersValues
          ];
        if (filterTypeMappedToState === "productFilterList") {
          const selectedCategory = state.selectedCategory;
          return state.filtersList.productFilterList[selectedCategory];
        }
        return state.filtersList[filterTypeMappedToState];
      }
      return [];
    },
    getProductsToDisplaySelector: (state: any) => state.productsToDisplay,
    getIsLastPageSelector: (state: any) => state.isLastPage,
  },
});

export const {
  searchAndFilterProducts,
  setIsFilterVisible,
  setSelectedFilterType,
  setSelectedCategory,
  setAppliedOptionsOfFilter,
  increasePageNumber,
} = shoppingSlice.actions;

export const {
  getProductsLoadingSelector,
  getIsFilterVisibleSelector,
  getAppliedOptionsOfFilterSelector,
  getOptionsOfFilterSelector,
  getSelectedFilterTypeSelector,
  getSelectedCategorySelector,
  getProductsToDisplaySelector,
  getIsLastPageSelector,
} = shoppingSlice.selectors;
