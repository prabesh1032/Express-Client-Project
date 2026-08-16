import * as yup from "yup";

//* login schema
export const loginSchema = yup.object({
  email: yup
    .string()
    .email("invalid email format")
    .required("email is required"),
  password: yup.string().required("password is required"),
});

//* sign up schema
export const signUpSchema = yup.object({
  full_name: yup.string().required("full name is required"),
  user_name: yup.string().min(3, "minimum 3 characters is required").required("user name is required"),
  email: yup
    .string()
    .email("invalid email format")
    .required("email is required"),
  password: yup
    .string()
    .required("password is required")
    .matches(/[A-Z]/, "at least one uppercase eg:[A-Z] is required")
    .matches(/[a-z]/, "at least one lowercase:[a-z] is required")
    .matches(/[0-9]/, "at least one number :[0-9] is required")
    .matches(
      /[*!@#_$]/,
      "At least one especial character :[*!@#_$] is required",
    )
    .min(6, "minimum 6 characters is required"),
  c_password: yup
    .string()
    .required("confirm password is required")
    .oneOf([yup.ref("password")], "password does not matched"),
});
