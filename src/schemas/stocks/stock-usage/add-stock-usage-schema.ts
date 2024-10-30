import { z } from "zod";

export const AddStockUsageSchema = z.object({
  stockRefNumber: z
    .string({ required_error: "Stock reference number is required" })
    .min(3, {
      message: "Stock reference number must be at least 3 characters",
    })
    .trim(),
  quantity: z.coerce
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
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
});
