"use client";

import { useDeleteBranch } from "@/queries/branches";
import type { GetAllOrganizationBranch } from "@/types";
import { Alert } from "../dialog/alert-dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeBranch: GetAllOrganizationBranch["data"][number] | undefined;
};

export function DeleteBranch({ activeBranch, open, onOpenChange }: Props) {
  const id = activeBranch?.id;
  const { mutate: deleteBranch, isPending } = useDeleteBranch(
    id as number,
    onOpenChange,
  );

  return (
    <div>
      <Alert
        isPending={isPending}
        title={`Delete ${activeBranch?.name}`}
        description={`Are you sure you want to delete ${activeBranch?.name} branch?`}
        open={open}
        onOpenChange={onOpenChange}
        handleContinue={() => {
          deleteBranch(id);
        }}
        handleCancel={() => onOpenChange(false)}
      />
    </div>
  );
}
