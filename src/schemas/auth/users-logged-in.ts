import { z } from "zod";

export const UsersLoggedIn = z.array(
  z.object({
    id: z.number(),
    username: z.string(),
    email: z.string(),
    user: z.null(),
    fullName: z.null(),
    enabled: z.boolean(),
    verified: z.boolean(),
    accountNonLocked: z.boolean(),
    deleted: z.boolean(),
  }),
);
