import { z } from "zod";

export const StateSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(
    z.object({
      slug: z.string(),
      name: z.string(),
    }),
  ),
});
