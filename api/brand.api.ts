import axios from "axios";
import { ApiResponse, Brand, BrandInput } from "@/types/brand.types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1",
  headers: { "Content-Type": "application/json" },
});

const handleError = (error: unknown, fallback: string): never => {
  if (axios.isAxiosError(error))
    throw error.response?.data ?? { message: fallback };
  throw error;
};

const toFormData = (data: BrandInput) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  const logo = data.logo?.[0];
  if (logo) formData.append("logo", logo);
  return formData;
};

export const getBrands = async (): Promise<ApiResponse<Brand[]>> => {
  try {
    return (await api.get<ApiResponse<Brand[]>>("/brands")).data;
  } catch (error) {
    return handleError(error, "Unable to load brands");
  }
};

export const getBrand = async (id: string): Promise<ApiResponse<Brand>> => {
  try {
    return (await api.get<ApiResponse<Brand>>(`/brands/${id}`)).data;
  } catch (error) {
    return handleError(error, "Unable to load brand");
  }
};

export const createBrand = async (
  data: BrandInput,
): Promise<ApiResponse<Brand>> => {
  try {
    return (await api.post<ApiResponse<Brand>>("/brands", toFormData(data), {
      headers: { "Content-Type": "multipart/form-data" },
    })).data;
  } catch (error) {
    return handleError(error, "Unable to create brand");
  }
};

export const updateBrand = async ({
  id,
  data,
}: {
  id: string;
  data: BrandInput;
}): Promise<ApiResponse<Brand>> => {
  try {
    return (await api.patch<ApiResponse<Brand>>(`/brands/${id}`, toFormData(data), {
      headers: { "Content-Type": "multipart/form-data" },
    })).data;
  } catch (error) {
    return handleError(error, "Unable to update brand");
  }
};

export const deleteBrand = async (id: string): Promise<ApiResponse<Brand>> => {
  try {
    return (await api.delete<ApiResponse<Brand>>(`/brands/${id}`)).data;
  } catch (error) {
    return handleError(error, "Unable to delete brand");
  }
};
