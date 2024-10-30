"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { AddStockUsage } from "./add-stock-usage";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function ViewAndAddStockUsageModal({
  className,
  id,
  open,
  onOpenChange,
  ...rest
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        {...rest}
        className={cn(
          `max-w-[1000px] w-full h-[90%] p-0 shadow-none border-none `,
          className,
        )}
      >
        <AlertDialogTitle className=" sr-only">
          Stock Usage Modal
        </AlertDialogTitle>
        <AlertDialogDescription className=" sr-only">
          Stock Usage
        </AlertDialogDescription>
        <div className="w-full h-full overflow-auto p-6">
          <AddStockUsage setOpen={onOpenChange} />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
