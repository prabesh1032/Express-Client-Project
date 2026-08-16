import axios from "axios";
import { LoginResponse, TLogin, TRegister } from "@/types/auth.types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api/v1",
  headers: { "Content-Type": "application/json" },
});

//* login user
export const login = async (data: TLogin): Promise<LoginResponse> => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data ?? { message: "Unable to log in" };
    }
    throw error;
  }
};

export const register = async (data: TRegister) => {
  try {
    const formData = new FormData();
    formData.append("full_name", data.full_name);
    formData.append("user_name", data.user_name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    const profileImage = data.profile_image?.[0];
    if (profileImage) formData.append("profile_image", profileImage);

    const response = await api.post("/auth/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data ?? { message: "Unable to create account" };
    }
    throw error;
  }
};
