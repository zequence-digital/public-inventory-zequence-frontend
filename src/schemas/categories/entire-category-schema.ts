import { z } from "zod";

export const EntireCategorySchema = z.array(
  z.object({
    guid: z.string(),
    description: z.string(),
    categoryType: z.string(),
    photoLink: z.string(),
    createdBy: z.string(),
    updatedBy: z.string(),
    deletedBy: z.string(),
    name: z.string(),
    tags: z.array(z.string()),
    deleted: z.boolean(),
    status: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string(),
    subCategory: z.boolean(),
  }),
);
