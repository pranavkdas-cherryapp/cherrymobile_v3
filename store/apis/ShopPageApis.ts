import apiClient from "@/store/apis/httpsClient";

export async function getProductsList(
  appliedFilters: string,
  searchQuery: string
) {
  const response = await apiClient.post("/api/v1/products/list", {
    appliedFilters: appliedFilters,
    searchQuery: searchQuery,
  });

  return response.data;
}
