import { z } from "zod";

export const DashboardOverviewSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    productSummary: z.object({
      totalItemCount: z.number(),
      totalInStock: z.number(),
      totalRunningOut: z.number(),
      totalOutOfStock: z.number(),
    }),
    stockSummary: z.object({
      totalItemCount: z.number(),
      totalInStock: z.number(),
      totalRunningOut: z.number(),
      totalOutOfStock: z.number(),
    }),
  }),
});
