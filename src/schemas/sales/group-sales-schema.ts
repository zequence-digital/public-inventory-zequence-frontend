import { z } from "zod";

export const GroupSalesSchema = z.object({
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
        salesRefNumber: z.string(),
        invoiceLogData: z.array(
          z.object({
            productData: z.object({
              guid: z.string(),
              referenceNumber: z.string(),
              createdBy: z.string(),
              updatedBy: z.string().nullable(),
              deletedBy: z.string().nullable(),
              category: z.object({
                name: z.string(),
                guid: z.string(),
              }),
              status: z.string(),
              name: z.string(),
              branch: z.string(),
              description: z.string().nullable(),
              photoLink: z.string().nullable(),
              notes: z.string(),
              price: z.number(),
              tags: z.string(),
              quantity: z.number(),
              threshold: z.number(),
              deleted: z.boolean(),
              createdAt: z.string(),
              updatedAt: z.string().nullable(),
              deletedAt: z.string().nullable(),
            }),
            branchData: z.object({
              id: z.number(),
              name: z.string(),
            }),
            customerType: z.string(),
            quantityRequested: z.number(),
            rate: z.number(),
            amount: z.number(),
          }),
        ),
        totalAmount: z.number(),
        createdAt: z.string(),
        updatedAt: z.string(),
      }),
    ),
  }),
});
