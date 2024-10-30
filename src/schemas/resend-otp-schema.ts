import { z } from "zod";

// "action": "SIGNUP_EMAIL_VERIFICATION"
export const ResendOtpSchema = z.object({
  emailAddress: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({
      message: "Invalid email",
    })
    .toLowerCase(),
});
