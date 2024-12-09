"use client";

import { Alert } from "../dialog/alert-dialog";
import SvgTrash from "../svg/svg-trash";
import { cn } from "@/lib/utils";
import { useDeleteSales } from "@/queries/sales";
import { useState } from "react";

export function DeleteSales({ id }: { id: string }) {
  const [open, setOpen] = useState(false);

  const { mutate: deleteSales, isPending } = useDeleteSales(id);

  return (
    <div>
      <Alert
        title="Delete Sales"
        description="Are you sure you want to delete this sale?"
        open={open}
        onOpenChange={setOpen}
        handleContinue={() => {
          deleteSales(id);
          setOpen(false);
        }}
        handleCancel={() => setOpen(false)}
      />
      <div onClick={() => setOpen(true)}>
        <SvgTrash
          className={cn(
            `size-4 stroke-muted-400 hover:stroke-destructive cursor-pointer`,
            {
              "animate-spin": isPending,
            },
          )}
        />
      </div>
    </div>
  );
}
