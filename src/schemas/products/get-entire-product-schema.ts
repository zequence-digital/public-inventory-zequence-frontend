import { z } from "zod";

export const GetEntireProductSchema = z.array(
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
    price: z.number(),
    tags: z.string(),
    quantity: z.number(),
    threshold: z.number(),
    deleted: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string(),
  }),
);
