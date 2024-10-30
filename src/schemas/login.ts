import { z } from "zod";

export const loginSchema = z.object({
  queryParam: z
    .string({ required_error: "Email or username is required" })
    .trim()
    .min(3, { message: "Email or username must be at least 3 characters" }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
});
