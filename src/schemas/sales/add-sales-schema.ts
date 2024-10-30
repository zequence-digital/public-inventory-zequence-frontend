import { z } from "zod";

// {
//   "customerType": "WALK_IN_CUSTOMER",
//   "branch": "string",
//   "productReferenceNumber": "string",
//   "quantity": 0,
// }

export const customerType = [
  "WALK_IN_CUSTOMER",
  "RETURNING_CUSTOMER",
  "CORPORATE_CUSTOMER",
];

export const AddSalesSchema = z.object({
  item: z.string({ required_error: "Items is required" }),
  customerType: z.string({ required_error: "Customer type is required" }),
  branchId: z.coerce.number({
    required_error: "Branch is required",
    invalid_type_error: "Branch must be a number",
  }),

  productRefNumber: z
    .string({ required_error: "Product reference number is required" })
    .min(3, {
      message: "Product reference number must be at least 3 characters",
    })
    .trim(),
  quantityRequested: z.coerce
    .number({
      required_error: "Quantity is required",
      invalid_type_error: "Quantity must be a number",
    })
    .int()
    .positive(),
});
