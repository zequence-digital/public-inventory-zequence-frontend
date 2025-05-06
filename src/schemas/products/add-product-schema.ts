import { z } from "zod";

export const AddProductSchema = z.object({
  name: z
    .string({ required_error: "Product name is required" })
    .min(3, {
      message: "Product name must be at least 3 characters",
    })
    .trim(),
  notes: z
    .string({ required_error: "Product description is required" })
    .min(3, { message: "Product description must be at least 3 characters" })
    .trim(),
  threshold: z.coerce
    .number({
      required_error: "Threshold limit is required",
      invalid_type_error: "Threshold limit must be a number",
    })
    .int()
    .positive(),
  branchId: z.coerce.number({ required_error: "Product branch is required" }),
  categoryGuid: z
    .string({ required_error: "Product category is required" })
    .min(3, { message: "Product category must be at least 3 characters" })
    .trim(),
  quantity: z.coerce
    .number({
      required_error: "Product quantity is required",
      invalid_type_error: "Product quantity must be a number",
    })
    .int()
    .positive(),
  costPrice: z.coerce.number({
    required_error: "Product cost price is required",
    invalid_type_error: "Product cost price must be a number",
  }),
  price: z.coerce
    .number({
      required_error: "Product price is required",
      invalid_type_error: "Product price must be a number",
    })
    .positive(),
});
