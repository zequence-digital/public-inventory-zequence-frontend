import { z } from "zod";

export const AllProductSchema = z.object({
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
        referenceNumber: z.string(),
        createdBy: z.string(),
        updatedBy: z.string(),
        deletedBy: z.string(),
        category: z.object({
          name: z.string(),
          guid: z.string(),
        }),
        status: z.string(),
        name: z.string(),
        branch: z.string(),
        description: z.string(),
        photoLink: z.string(),
        notes: z.string(),
        tags: z.string(),
        quantity: z.number(),
        threshold: z.number(),
        deleted: z.boolean(),
        createdAt: z.string(),
        updatedAt: z.string(),
        deletedAt: z.string(),
      }),
    ),
  }),
});
