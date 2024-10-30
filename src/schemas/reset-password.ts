import { z } from "zod";

export const ResetPasswordSchema = z
  .object({
    verificationCode: z
      .string({ required_error: "Verification code is required" })
      .length(6, { message: "Verification code must be 6 characters" }),
    newPassword: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      )
      .trim(),
    // confirmPassword field should match the password field
    confirmNewPassword: z.string().optional(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });
