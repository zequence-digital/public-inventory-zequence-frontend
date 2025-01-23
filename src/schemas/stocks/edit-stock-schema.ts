import { z } from "zod";

export const EditStockSchema = z.object({
  stockName: z
    .string({ required_error: "Product name is required" })
    .min(3, {
      message: "Product name must be at least 3 characters",
    })
    .trim(),
  stockDescription: z
    .string({ required_error: "Product description is required" })
    .min(3, { message: "Product description must be at least 3 characters" })
    .trim(),
  stockThreshHoldLimit: z.coerce
    .number({
      required_error: "Threshold limit is required",
      invalid_type_error: "Threshold limit must be a number",
    })
    .positive(),
  stockBranch: z
    .string({ required_error: "Product branch is required" })
    .min(3, { message: "Product branch must be at least 3 characters" })
    .trim(),
  categories: z
    .string({ required_error: "Product category is required" })
    .min(3, { message: "Product category must be at least 3 characters" })
    .trim(),
  stockQuantity: z.coerce
    .number({
      required_error: "Product quantity is required",
      invalid_type_error: "Product quantity must be a number",
    })
    .positive(),
  id: z.number(),
});
