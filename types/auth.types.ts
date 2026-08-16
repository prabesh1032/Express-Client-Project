import { loginSchema } from "@/schemas/auth.schema";
import * as yup from "yup";
import { Role } from "@/types/enum.types";

//! login & register types/interfaces

// export type TLogin = {
//   email: string;
//   password: string;
// };

export type TLogin = yup.InferType<typeof loginSchema>;

export type TRegister = {
  full_name: string;
  user_name: string;
  email: string;
  password: string;
  profile_image?: FileList;
};

export type TSignUpForm = TRegister & { c_password: string };

export type AuthUser = {
  _id: string;
  full_name: string;
  user_name: string;
  email: string;
  role: Role;
  profile_image?: string | null;
};

export type LoginResponse = {
  message: string;
  data: AuthUser;
  success: boolean;
};
