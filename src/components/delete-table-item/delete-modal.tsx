"use client";

import { Alert } from "../dialog/alert-dialog";
import SvgTrash from "../svg/svg-trash";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = {
  isPending?: boolean;
  fn: () => void;
  title: string;
  description: string;
  className?: string;
};

export function DeleteModal({
  isPending,
  fn,
  title,
  description,
  className,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Alert
        title={title}
        description={description}
        open={open}
        onOpenChange={setOpen}
        handleContinue={() => {
          fn();
          setOpen(false);
        }}
        handleCancel={() => setOpen(false)}
      />
      <button disabled={isPending} onClick={() => setOpen(true)}>
        <SvgTrash
          className={cn(
            `size-4 stroke-muted-400 hover:stroke-destructive cursor-pointer`,
            className,
          )}
        />
      </button>
    </div>
  );
}
