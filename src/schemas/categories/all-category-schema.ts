import { z } from "zod";

export const AllCategorySchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    meta: z.object({
      pageNumber: z.number(),
      pageSize: z.number(),
      pageCount: z.number(),
      totalCount: z.number(),
      numberOfPages: z.number(),
    }),
    records: z.array(
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
    ),
  }),
});
