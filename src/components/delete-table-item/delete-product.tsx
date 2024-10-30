"use client";

import { Alert } from "../dialog/alert-dialog";
import SvgTrash from "../svg/svg-trash";
import { useDeleteProduct } from "@/queries/products";
import { useState } from "react";

export function DeleteProduct({ id }: { id: string }) {
  const [open, setOpen] = useState(false);

  const { mutate: deleteProduct, isPending } = useDeleteProduct(id);

  return (
    <div>
      <Alert
        title="Delete Product"
        description="Are you sure you want to delete this product?"
        open={open}
        onOpenChange={setOpen}
        handleContinue={() => {
          deleteProduct(id);
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
