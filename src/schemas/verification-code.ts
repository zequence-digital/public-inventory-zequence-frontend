import * as z from "zod";

export const verificationCodeSchema = z.object({
  // email field should be a valid email
  emailAddress: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Invalid email" })
    .toLowerCase()
    .trim(),
  verificationCode: z
    .string({ required_error: "Verification code is required" })
    .length(6, { message: "Verification code must be 6 characters" }),
});
