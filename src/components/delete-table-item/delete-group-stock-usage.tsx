"use client";

import { Alert } from "../dialog/alert-dialog";
import SvgTrash from "../svg/svg-trash";
import { useDeleteGroupStockUsage } from "@/queries/stocks";
import { useState } from "react";

export function DeleteGroupStockUsage({ id }: { id: string }) {
  const [open, setOpen] = useState(false);

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
      <button disabled={isPending} onClick={() => setOpen(true)}>
        <SvgTrash className="size-4 stroke-muted-400 hover:stroke-destructive cursor-pointer" />
      </button>
    </div>
  );
}
