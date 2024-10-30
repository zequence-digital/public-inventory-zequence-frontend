import { z } from "zod";

export const ResetEmailPasswordSchema = z.object({
  // email field should be a valid email
  emailAddress: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email" })
    .toLowerCase()
    .trim(),
});
