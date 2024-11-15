import { z } from "zod";

export const GetBranchByIdSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({
    id: z.number(),
    name: z.string(),
    organizationEmail: z.string(),
  }),
});
