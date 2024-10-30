import { z } from "zod";

export const SignUpSchema = z.object({
  // email field should be a valid email
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email" })
    .toLowerCase()
    .trim(),
});
