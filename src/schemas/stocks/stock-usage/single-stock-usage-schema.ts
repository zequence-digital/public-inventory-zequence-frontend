import { z } from "zod";

export const SingleStockUsageSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    guid: z.string(),
    packRefNumber: z.string(),
    createdBy: z.string(),
    updatedBy: z.string(),
    stock: z.object({
      guid: z.string(),
      createdBy: z.string(),
      updatedBy: z.string(),
      deletedBy: z.string(),
      name: z.string(),
      notes: z.string(),
      status: z.string(),
      category: z.object({
        name: z.string(),
        guid: z.string(),
      }),
      quantity: z.number(),
      referenceNumber: z.string(),
      branch: z.object({
        id: z.number(),
        name: z.string(),
      }),
      thresholdQuantity: z.number(),
      deleted: z.boolean(),
      createdAt: z.string(),
      updatedAt: z.string(),
      deletedAt: z.string(),
    }),
    branch: z.object({
      id: z.number(),
      name: z.string(),
    }),
    quantity: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    packed: z.boolean(),
  }),
});
