"use client";

import { Alert } from "../dialog/alert-dialog";
import SvgTrash from "../svg/svg-trash";
import { useDeleteCategory } from "@/queries/categories";
import { useState } from "react";

export function DeleteCategory({ id }: { id: string }) {
  const [open, setOpen] = useState(false);

  const { mutate: deleteCategory, isPending } = useDeleteCategory(id);

  return (
    <div>
      <Alert
        title="Delete Category"
        description="Are you sure you want to delete this category?"
        open={open}
        onOpenChange={setOpen}
        handleContinue={() => {
          deleteCategory(id);
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
