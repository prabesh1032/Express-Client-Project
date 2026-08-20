import axios from "axios";
import { ApiResponse } from "@/types/brand.types";
import { Product, ProductInput } from "@/types/product.types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1",
  headers: { "Content-Type": "application/json" },
});
const handleError = (error: unknown, fallback: string): never => {
  if (axios.isAxiosError(error))
    throw error.response?.data ?? { message: fallback };
  throw error;
};
const toFormData = (data: ProductInput) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("price", String(data.price));
  formData.append("stock", String(data.stock));
  formData.append("brand", data.brand);
  formData.append("category", data.category);
  const image = data.image?.[0];
  if (image) formData.append("image", image);
  return formData;
};

export const getProducts = async (): Promise<ApiResponse<Product[]>> => {
  try {
    return (await api.get<ApiResponse<Product[]>>("/products")).data;
  } catch (error) {
    return handleError(error, "Unable to load products");
  }
};
export const getProduct = async (id: string): Promise<ApiResponse<Product>> => {
  try {
    return (await api.get<ApiResponse<Product>>(`/products/${id}`)).data;
  } catch (error) {
    return handleError(error, "Unable to load product");
  }
};
export const createProduct = async (
  data: ProductInput,
): Promise<ApiResponse<Product>> => {
  try {
    return (
      await api.post<ApiResponse<Product>>("/products", toFormData(data), {
        headers: { "Content-Type": "multipart/form-data" },
      })
    ).data;
  } catch (error) {
    return handleError(error, "Unable to create product");
  }
};
export const updateProduct = async ({
  id,
  data,
}: {
  id: string;
  data: ProductInput;
}): Promise<ApiResponse<Product>> => {
  try {
    return (
      await api.patch<ApiResponse<Product>>(
        `/products/${id}`,
        toFormData(data),
        { headers: { "Content-Type": "multipart/form-data" } },
      )
    ).data;
  } catch (error) {
    return handleError(error, "Unable to update product");
  }
};
export const deleteProduct = async (
  id: string,
): Promise<ApiResponse<Product>> => {
  try {
    return (await api.delete<ApiResponse<Product>>(`/products/${id}`)).data;
  } catch (error) {
    return handleError(error, "Unable to delete product");
  }
};
