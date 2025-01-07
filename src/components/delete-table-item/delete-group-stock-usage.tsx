"use client";

import { useActiveUser } from "@/crypto";
import { useDeleteGroupStockUsage } from "@/queries/stocks";
import { useState } from "react";
import { Alert } from "../dialog/alert-dialog";
import SvgTrash from "../svg/svg-trash";

export function DeleteGroupStockUsage({ id }: { id: string }) {
  const [open, setOpen] = useState(false);
  const user = useActiveUser();

  const { mutate: deleteSales, isPending } = useDeleteGroupStockUsage(id);

  return (
    <div>
      <Alert
        title="Delete Group Stock Usage"
        description="Are you sure you want to delete this group stock usage?"
        open={open}
        onOpenChange={setOpen}
        handleContinue={() => {
          deleteSales(id);
          setOpen(false);
        }}
        handleCancel={() => setOpen(false)}
      />
      {user?.data?.roleName === "ADMIN" && (
        <button disabled={isPending} onClick={() => setOpen(true)}>
          <SvgTrash className="size-4 stroke-muted-400 hover:stroke-destructive cursor-pointer" />
        </button>
      )}
    </div>
  );
}
