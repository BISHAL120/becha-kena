import { object, string } from "zod";

export const loginSchema = object({
  number: string({ required_error: "Number is required" })
    .min(11, "Complete The Number")
    .max(11, "Number should not exceed 11 digits")
    .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi number"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
export const registerSchema = object({
  fullName: string().min(2, { message: "Please Enter Your Full Name" }),
  fullAddress: string().min(2, { message: "Please Enter Your Full Address" }),
  division: string().min(2, { message: "Please select Your Division" }),
  businessCategory: string().min(2, {
    message: "Please select Interested Business",
  }),
  number: string({ required_error: "Number is required" })
    .min(11, "Complete The Number")
    .max(11, "Number should not exceed 11 digits")
    .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi number"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

/* export const resetSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
});
 */
export const newPasswordSchema = object({
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(1, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmPassword: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(1, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});
