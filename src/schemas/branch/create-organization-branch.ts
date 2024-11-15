import { z } from "zod";

export const CreateOrganizationBranchSchema = z.object({
  name: z
    .string({ required_error: "Branch name is required" })
    .min(3, "Branch name must be at least 3 characters"),
});
