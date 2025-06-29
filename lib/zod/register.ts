import { z } from "zod";

export const RegisterSchema = z.object({
    fullName: z.string().min(2, { message: "Please Enter Your Full Name" }),
    email: z.string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid email"),
    password: z.string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
})