import { z } from "zod";

export const ContinueSignUpSchema = z
  .object({
    username: z
      .string({ required_error: "Username is required" })
      .trim()
      .min(3, { message: "Username must be at least 3 characters" }),
    // email field should be a valid email
    // email field should be a valid email

    //  password field show follow the password policy
    // 1. At least 8 characters
    // 2. At least one uppercase letter
    // 3. At least one lowercase letter
    // 4. At least one number
    // 5. At least one special character
    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      )
      .trim(),
    // confirmPassword field should match the password field
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
