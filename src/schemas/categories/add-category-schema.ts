import { z } from "zod";

export const AddCategorySchema = z.object({
  name: z
    .string({ required_error: "Category name is required" })
    .min(3, {
      message: "Category name must be at least 3 characters",
    })
    .trim(),
  description: z
    .string({ required_error: "Category description is required" })
    .max(275, {
      message: "Category description must be at most 255 characters",
    }),

  categoryType: z.enum(["PRODUCT", "STOCK"], {
    required_error: "You need to select one item.",
  }),
  status: z.string({
    required_error: "Please select a status to display.",
  }),
});
