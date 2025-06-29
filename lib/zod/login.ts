import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string({ required_error: "Email is required" })
        .email("Invalid email"),
    password: z.string({ required_error: "Password is required" })
        .min(1, "Password is required")
        .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
});
/* number: z.string({ required_error: "Number is required" })
    .min(11, "Complete The Number")
    .max(11, "Number should not exceed 11 digits")
    .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi number"), */