import { z } from "zod";

export const AllCountriesSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      code: z.string(),
    }),
  ),
});
