import { z } from "zod";

export const GetAllNotificationSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(
    z.object({
      guid: z.string(),
      type: z.string(),
      description: z.string(),
      message: z.string(),
      requireAction: z.boolean(),
      createdAt: z.string(),
      branchData: z.object({
        id: z.number(),
        name: z.string(),
        organizationEmail: z.string(),
      }),
      readStatus: z.string(),
    }),
  ),
});
