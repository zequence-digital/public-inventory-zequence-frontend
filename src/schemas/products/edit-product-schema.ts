import { z } from "zod";

export const EditProductSchema = z.object({
  productName: z
    .string({ required_error: "Product name is required" })
    .min(3, {
      message: "Product name must be at least 3 characters",
    })
    .trim(),
  productDescription: z
    .string({ required_error: "Product description is required" })
    .min(3, { message: "Product description must be at least 3 characters" })
    .trim(),
  productThreshHoldLimit: z.coerce
    .number({
      required_error: "Threshold limit is required",
      invalid_type_error: "Threshold limit must be a number",
    })
    .int()
    .positive(),
  productBranch: z
    .string({ required_error: "Product branch is required" })
    .min(3, { message: "Product branch must be at least 3 characters" })
    .trim(),
  categories: z
    .string({ required_error: "Product category is required" })
    .min(3, { message: "Product category must be at least 3 characters" })
    .trim(),
  costPrice: z.coerce.number({
    required_error: "Product cost price is required",
    invalid_type_error: "Product cost price must be a number",
  }),
  productQuantity: z.coerce
    .number({
      required_error: "Product quantity is required",
      invalid_type_error: "Product quantity must be a number",
    })
    .int()
    .positive(),
  id: z.number(),
});
