"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn, formatDate } from "@/lib/utils";

import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { useSingleGroupStockUsage } from "@/queries/stocks";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useReducer } from "react";
import CustomButton from "../../custom-button";
import { ViewStockUsage } from "./view-stock-usage";

type Props = {
  className?: string;
  id: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function ViewAndPrintStockUsageModal({ className, id, ...rest }: Props) {
  const [open, onOpenChange] = useReducer((open) => !open, false);
  const {
    data: packedStockUsage,
    isPending,
    isError,
    error,
  } = useSingleGroupStockUsage(id);

  if (isError) {
    return <ApiErrorMessage message={error?.message} />;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ViewStockUsage onOpenChange={onOpenChange} />
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent
          {...rest}
          className={cn(
            `max-w-[573px] w-full min-h-[650px] shadow-none border-none`,
            className,
          )}
        >
          <AlertDialogHeader>
            <Cross1Icon
              className="size-5 text-muted-400 w-fit ml-auto flex justify-end cursor-pointer items-end mb-10"
              onClick={onOpenChange}
            />
            <div className=" space-y-6">
              <AlertDialogTitle className="w-full flex items-center justify-between border border-slate-700 p-4 rounded-lg mb-6">
                <div className="space-y-1">
                  <div className="text-sm text-slate-500">Date created:</div>
                  <div className="text-xs text-slate-700">
                    {formatDate(packedStockUsage?.data?.createdAt)}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-sm text-slate-500">Product ID:</div>
                  <div className="text-xs text-slate-700">
                    {packedStockUsage?.data?.guid.slice(0, 8) + "..."}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-slate-500">Total Quantity:</div>
                  <div className="text-xs text-slate-700">
                    {packedStockUsage?.data?.totalQuantity}
                  </div>
                </div>
              </AlertDialogTitle>
              <AlertDialogDescription className="border border-slate-700 p-4 rounded-lg space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-sm text-slate-500">Product Name:</div>
                  <div className="text-sm text-slate-500">Quantity:</div>
                  <div className="text-sm text-slate-500">Category:</div>
                </div>
                <div className="flex flex-col  gap-6">
                  {packedStockUsage?.data?.stockUsages?.map((item) => (
                    <div
                      key={item?.stock?.name}
                      className="grid grid-cols-3 gap-4"
                    >
                      <div className="space-y-1">
                        <div className="text-xs text-slate-700">
                          {item?.stock?.name}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-slate-700">
                          {item?.quantity}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs text-slate-700">
                          {item?.stock?.category?.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>

          <div className="flex items-center justify-between h-full mt-auto">
            <CustomButton
              onClick={() => window.print()}
              className="bg-primary-100 h-fit text-white"
              label="Download"
            />

            <CustomButton
              onClick={onOpenChange}
              className=" bg-muted-650"
              label="Cancel"
            />
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
