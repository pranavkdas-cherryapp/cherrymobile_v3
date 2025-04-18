// Enums
export enum Category {
  Fashion = "fashion",
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
  productFilterList: string[];
  brandFilterList: string[];
  colorFilterList: string[];
  priceRangeFilterLimits: {
    lowerLimit: string;
    upperLimit: string;
  };
  sortOptions: SortOption[];
}

export interface AppliedFiltersList {
  productFilterList: string[];
  brandFilterList: string[];
  colorFilterList: string[];
  priceRangeFilterLimits: {
    lowerLimit: string;
    upperLimit: string;
  };
  sortOptions: SortOption | null;
}

export interface ShoppingPageState {
  productsToDisplay: any[]; // Replace with proper Product type when available
  filtersList: FiltersList;
  appliedFilters: AppliedFiltersList;
  productsListLoading: boolean;
  error: any;
}

// Initial State
export const initialState: ShoppingPageState = {
  productsToDisplay: [],
  filtersList: {
    productFilterList: [],
    brandFilterList: [],
    colorFilterList: [],
    priceRangeFilterLimits: {
      lowerLimit: "0",
      upperLimit: "0",
    },
    sortOptions: [],
  },
  appliedFilters: {
    productFilterList: [],
    brandFilterList: [],
    colorFilterList: [],
    priceRangeFilterLimits: {
      lowerLimit: "0",
      upperLimit: "0",
    },
    sortOptions: null,
  },
  productsListLoading: false,
  error: null,
};
