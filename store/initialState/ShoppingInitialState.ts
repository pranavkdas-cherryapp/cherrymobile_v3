import {
  FashionFilterList,
  BeautyFilterList,
  AccessoriesFilterList,
  EntertainmentFilterList,
  FilterOptions,
} from "@/store/constants/ShoppingConstants";

// Enums
export enum Category {
  Fashion = "fashion",
  Clothing = "fashion", // Currently Clothing used instead of Fashion
  Beauty = "beauty",
  Accessories = "accessories",
  Entertainment = "entertainment",
}

export enum SortOption {
  PriceLowToHigh = "priceLowToHigh",
  PriceHighToLow = "priceHighToLow",
  NewReleases = "newReleases",
  Recommended = "recommended",
}

// Types
export interface FiltersList {
  productFilterList: Record<Category, string[]>;
  // brandFilterList: string[]; // This should be stitched together from the productFilterList
  // colorFilterList: string[];
  // priceRangeFilterLimits: {
  //   lowerLimit: string;
  //   upperLimit: string;
  // };
  sortOptions: SortOption[];
}

export interface AppliedFiltersList {
  productFilterList: string[];
  brandFilterList: string[];
  // colorFilterList: string[];
  // priceRangeFilterLimits: {
  //   lowerLimit: string;
  //   upperLimit: string;
  // };
  sortOptions: SortOption | null;
}

export interface ShoppingPageState {
  productsToDisplay: any[]; // Replace with proper Product type when available
  filtersList: FiltersList;
  appliedFilters: AppliedFiltersList;
  productsListLoading: boolean;
  error: any;
  isFilterVisible: boolean;
  selectedFilterType: keyof typeof FilterOptions | null;
  selectedCategory: Category | null;
}

// Initial State
export const initialState: ShoppingPageState = {
  productsToDisplay: [],
  filtersList: {
    productFilterList: {
      [Category.Fashion]: FashionFilterList,
      [Category.Beauty]: BeautyFilterList,
      [Category.Accessories]: AccessoriesFilterList,
      [Category.Entertainment]: EntertainmentFilterList,
    },
    // colorFilterList: [],
    // priceRangeFilterLimits: {
    //   lowerLimit: "0",
    //   upperLimit: "0",
    // },
    sortOptions: [
      SortOption.PriceLowToHigh,
      SortOption.PriceHighToLow,
      SortOption.NewReleases,
      SortOption.Recommended,
    ],
  },
  appliedFilters: {
    productFilterList: [],
    brandFilterList: [],
    // colorFilterList: [],
    // priceRangeFilterLimits: {
    //   lowerLimit: "0",
    //   upperLimit: "0",
    // },
    sortOptions: null,
  },
  productsListLoading: false,
  error: null,
  isFilterVisible: false,
  selectedFilterType: null,
  selectedCategory: Category.Fashion,
};
