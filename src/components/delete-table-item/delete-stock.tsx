"use client";

import { Alert } from "../dialog/alert-dialog";
import SvgTrash from "../svg/svg-trash";
import { useDeleteStock } from "@/queries/stocks";
import { useState } from "react";

export function DeleteStock({ id }: { id: string }) {
  const [open, setOpen] = useState(false);

  const { mutate: deleteStock, isPending } = useDeleteStock(id);

  return (
    <div>
      <Alert
        title="Delete Stock"
        description="Are you sure you want to delete this stock?"
        open={open}
        onOpenChange={setOpen}
        handleContinue={() => {
          deleteStock(id);
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
