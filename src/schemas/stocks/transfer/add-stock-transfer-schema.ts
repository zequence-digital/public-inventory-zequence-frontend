// {
//   "stockReferenceNumber": "string",
//   "quantity": 0,
//   "fromBranchId": 0,
//   "toBranchId": 0
// }
import { z } from "zod";

export const AddStockTransferSchema = z.object({
  stockReferenceNumber: z
    .string({ required_error: "Stock reference number is required" })
    .min(3, {
      message: "Stock reference number must be at least 3 characters",
    })
    .trim(),
  quantity: z.coerce
    .number({
      required_error: "Product quantity is required",
      invalid_type_error: "Product quantity must be a number",
    })
    .positive(),
  fromBranchId: z.coerce
    .number({
      required_error: "Branch is required",
      invalid_type_error: "Branch must be a number",
    })
    .positive(),
  toBranchId: z.string({
    required_error: "Branch is required",
    invalid_type_error: "Branch must be a number",
  }),
});
