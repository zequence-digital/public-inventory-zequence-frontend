// {
//   "roleName": "ADMIN",
//   "inviteeEmailAddress": "string"
// name: "string",
// branchId: "string"
// }

import { z } from "zod";

export const InviteUserSchema = z.object({
  roleName: z.string({ required_error: "Role name is required" }),
  inviteeEmailAddress: z
    .string({ required_error: "Email is required" })
    .email()
    .trim()
    .toLowerCase(),
  branchId: z.string({ required_error: "Branch is required" }),
  name: z
    .string({ required_error: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters" })
    .trim(),
});
