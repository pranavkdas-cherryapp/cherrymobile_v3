import apiClient from "@/store/apis/httpsClient";
import {
  Category,
  AppliedFiltersList,
  SortOption,
} from "@/store/initialState/ShoppingInitialState";
export async function searchAndFilterProductsApi(
  selectedCategory: Category,
  appliedFilters: AppliedFiltersList,
  searchQuery: string,
  numResultsPerQuery: number,
  pageNumber: number
) {
  const searchQueryParams = `query=${searchQuery}`;
  const categoryParams = `categoryName:=${selectedCategory}`;
  const appliedFilterToQueryKeyMap = {
    productFilterList: "productType",
    brandFilterList: "brandName",
  };

  let appliedFiltersParams = Object.entries(appliedFilterToQueryKeyMap)
    .map(([filterKey, queryKey]) => {
      const value = appliedFilters[filterKey as keyof AppliedFiltersList];
      if (!value || (Array.isArray(value) && value.length === 0)) return null;

      if (Array.isArray(value)) {
        const joined = value.join(",");
        return `${queryKey}:=[${joined}]`;
      }

      return `${queryKey}:=${value}`;
    })
    .filter(Boolean)
    .join(encodeURIComponent("&&"));

  console.log(appliedFiltersParams, "appliedFiltersParams");

  appliedFiltersParams = `filterBy=${[appliedFiltersParams, categoryParams]
    .filter(Boolean)
    .join(encodeURIComponent("&&"))}`;

  const SortByFilterToQueryKeyMap = {
    [SortOption.PriceLowToHigh]: "sortBy=price&sortOrder=asc",
    [SortOption.PriceHighToLow]: "sortBy=price&sortOrder=desc",
    [SortOption.NewReleases]: "sortBy=publishedAt&sortOrder=desc",
  };
  if (appliedFilters.sortOptions) {
    appliedFiltersParams += `&${
      SortByFilterToQueryKeyMap[appliedFilters.sortOptions]
    }`;
  }

  const queryParams = `${searchQueryParams}&${appliedFiltersParams}&perPage=${numResultsPerQuery}&page=${pageNumber}`;
  console.log(queryParams);
  const response = await apiClient.get(
    `/shopping-tab/v1/search/variants?${queryParams}`
  );

  return response.data;
}
