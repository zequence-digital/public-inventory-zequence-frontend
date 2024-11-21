"use client";

import { Alert } from "../dialog/alert-dialog";
import type { GetAllOrganizationBranch } from "@/types";
import { useDeleteBranch } from "@/queries/branches";

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
        title={`Delete ${activeBranch?.name.toUpperCase()}`}
        description={`Are you sure you want to delete ${activeBranch?.name.toUpperCase()} branch?`}
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
