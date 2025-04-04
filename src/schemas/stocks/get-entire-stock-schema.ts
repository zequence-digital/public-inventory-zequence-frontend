import { z } from "zod";

export const GetEntireStockSchema = z.array(
  z.object({
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
    weight: z.number(),
    referenceNumber: z.string(),
    branch: z.object({
      id: z.number(),
      name: z.string(),
      organizationEmail: z.string(),
    }),
    thresholdQuantity: z.number(),
    deleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string(),
  }),
);
