"use client";

import { useDeleteStockUsage } from "@/queries/stocks";
import type { GetAllStockUsage } from "@/types";
import { useState } from "react";
import { Alert } from "../dialog/alert-dialog";
import SvgTrash from "../svg/svg-trash";

type Props = {
  sales: GetAllStockUsage["data"]["records"][number];
};

export function DeleteStockUsage({ sales }: Props) {
  const [open, setOpen] = useState(false);

  const { mutate: deleteSales, isPending } = useDeleteStockUsage(sales?.guid);

  return (
    <div>
      <Alert
        title="Delete Stock Usage"
        description="Are you sure you want to delete this stock?"
        open={open}
        onOpenChange={setOpen}
        handleContinue={() => {
          deleteSales(sales?.guid);
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
