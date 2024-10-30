import { z } from "zod";
// {
//   "name": "string",
//   "notes": "string",
//   "categoryGuid": "string",
//   "quantity": 0,
//   "thresholdQuantity": 0,
//   "branchId": 0
// }

export const AddStockSchema = z.object({
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
  thresholdQuantity: z.coerce
    .number({
      required_error: "Threshold limit is required",
      invalid_type_error: "Threshold limit must be a number",
    })
    .int()
    .positive(),
  branchId: z.coerce
    .number({
      required_error: "Branch is required",
      invalid_type_error: "Branch must be a number",
    })
    .int()
    .positive(),
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
});
