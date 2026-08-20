import axios from "axios";
import { ApiResponse } from "@/types/brand.types";
import { Category, CategoryInput } from "@/types/category.types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1",
  headers: { "Content-Type": "application/json" },
});
const handleError = (error: unknown, fallback: string): never => {
  if (axios.isAxiosError(error))
    throw error.response?.data ?? { message: fallback };
  throw error;
};
const toFormData = (data: CategoryInput) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  const image = data.image?.[0];
  if (image) formData.append("image", image);
  return formData;
};

export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  try {
    return (await api.get<ApiResponse<Category[]>>("/categories")).data;
  } catch (error) {
    return handleError(error, "Unable to load categories");
  }
};
export const getCategory = async (
  id: string,
): Promise<ApiResponse<Category>> => {
  try {
    return (await api.get<ApiResponse<Category>>(`/categories/${id}`)).data;
  } catch (error) {
    return handleError(error, "Unable to load category");
  }
};
export const createCategory = async (
  data: CategoryInput,
): Promise<ApiResponse<Category>> => {
  try {
    return (
      await api.post<ApiResponse<Category>>("/categories", toFormData(data), {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data;
  } catch (error) {
    return handleError(error, "Unable to create category");
  }
};
export const updateCategory = async ({
  id,
  data,
}: {
  id: string;
  data: CategoryInput;
}): Promise<ApiResponse<Category>> => {
  try {
    return (
      await api.patch<ApiResponse<Category>>(
        `/categories/${id}`,
        toFormData(data),
        { headers: { "Content-Type": "multipart/form-data" } },
      )
    ).data;
  } catch (error) {
    return handleError(error, "Unable to update category");
  }
};
export const deleteCategory = async (
  id: string,
): Promise<ApiResponse<Category>> => {
  try {
    return (await api.delete<ApiResponse<Category>>(`/categories/${id}`)).data;
  } catch (error) {
    return handleError(error, "Unable to delete category");
  }
};
