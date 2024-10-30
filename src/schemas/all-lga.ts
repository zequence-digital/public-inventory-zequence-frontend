import { z } from "zod";

export const LgaSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(z.string()),
});
