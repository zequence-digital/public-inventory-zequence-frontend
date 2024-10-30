"use client";

import { useDeleteStockUsage } from "@/queries/stocks";
import { useState } from "react";
import { Alert } from "../dialog/alert-dialog";
import SvgTrash from "../svg/svg-trash";

export function DeleteStockUsage({ id }: { id: string }) {
  const [open, setOpen] = useState(false);

  const { mutate: deleteSales, isPending } = useDeleteStockUsage(id);

  return (
    <div>
      <Alert
        title="Delete Stock Usage"
        description="Are you sure you want to delete this stock?"
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
