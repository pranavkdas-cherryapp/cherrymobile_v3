import apiClient from "@/store/apis/httpsClient";
import { components } from "@/types/apiTypes";

type PaginatedBrands = components["schemas"]["PaginatedUserBrands"];

export const getAllBrands = async (
  pageSize: number,
  pageNumber: number
): Promise<PaginatedBrands | null> => {
  try {
    const response = await apiClient.get(
      `/brands/v1/all?pageSize=${pageSize}&pageNumber=${pageNumber}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all brands", error);
    return null;
  }
};
