import { z } from "zod";

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const NewInviteeSchema = z
  .object({
    emailAddress: z
      .string({
        required_error: "Email is required",
      })
      .email({ message: "Invalid email" })
      .toLowerCase()
      .trim(),
    fullName: z
      .string()
      .min(3, { message: "Full Name is required!" })
      .trim()
      .toLowerCase(),
    mobileNumber: z
      .string()
      .min(10, "Phone number must be at least 10 characters")
      .max(15, "Phone number must be at most 15 characters")
      .regex(/^\d+$/, "Phone number must contain only numbers"),
    countryId: z.coerce.number({
      invalid_type_error: "Please select a country",
    }),
    state: z.string().min(3, "Please select a state").toLowerCase().trim(),
    lga: z.string().min(3, "Please select a LGA").toLowerCase().trim(),
    imageLink: z
      .custom<FileList>()
      .refine((fileList) => fileList?.length === 1, "Expected file")
      .transform((file) => file[0] as File)
      .refine((file) => {
        return file?.size <= MAX_FILE_SIZE;
      }, `File size should be less than 1gb.`)
      .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Only these types are allowed .jpg, .jpeg, .png, .webp and mp4",
      ),
    username: z.string().min(3, "Username is required").trim(),
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
