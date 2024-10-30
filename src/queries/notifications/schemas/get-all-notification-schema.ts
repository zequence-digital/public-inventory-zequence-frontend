import { z } from "zod";

export const GetAllNotificationSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(
    z.object({
      messageUtil: z.object({}),
      type: z.string(),
      description: z.string(),
      message: z.string(),
      requireAction: z.boolean(),
      createdAt: z.string(),
    }),
  ),
});
