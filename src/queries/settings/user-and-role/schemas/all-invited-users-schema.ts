import { z } from "zod";

export const AllInvitedUsersSchema = z.object({
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
        emailAddress: z.string(),
        status: z.string(),
        userType: z.string(),
        roleName: z.string(),
        admin: z.string(),
        createdAt: z.string(),
      }),
    ),
  }),
});
