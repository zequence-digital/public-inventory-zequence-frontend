"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn, formatDate } from "@/lib/utils";
import { useReducer, useRef } from "react";

import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { Cross1Icon } from "@radix-ui/react-icons";
import CustomButton from "../../custom-button";
import { Spinner } from "@/components/spinner";
import { ViewInvoice } from "./view-invoice";
import { useReactToPrint } from "react-to-print";
import { useSingleGroupSales } from "@/queries/sales";

type Props = {
  className?: string;
  id: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function SalesInvoiceModal({ className, id, ...rest }: Props) {
  const [open, onOpenChange] = useReducer((open) => !open, false);
  const { data: invoice, isPending, isError, error } = useSingleGroupSales(id);
  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    bodyClass: "w-xs, p-6",
    pageStyle: "@page { size: A4; margin: 0; }",
  });

  if (isError) {
    return <ApiErrorMessage message={error?.message} />;
  }

  if (isPending) {
    return <Spinner />;
  }

  return (
    <div>
      <ViewInvoice onOpenChange={onOpenChange} />
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent
          {...rest}
          className={cn(
            `max-w-[573px] w-full min-h-screen shadow-none border-none`,
            className,
          )}
        >
          <AlertDialogHeader>
            <Cross1Icon
              className="size-5 text-muted-400 w-fit ml-auto flex justify-end cursor-pointer items-end mb-10"
              onClick={onOpenChange}
            />
            <div className="h-fit" ref={contentRef}>
              <div className=" space-y-6">
                <AlertDialogTitle className="w-full flex items-center justify-between border border-slate-700 p-4 rounded-lg mb-6">
                  <div className="space-y-1">
                    <div className="text-sm text-slate-500">Date created:</div>
                    <div className="text-xs text-slate-700">
                      {formatDate(invoice?.data?.createdAt)}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-slate-500">Customer Type:</div>
                    <div className="text-xs text-slate-700">
                      {invoice?.data?.invoiceLogData[0]?.customerType}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-slate-500">Product ID:</div>
                    <div className="text-xs text-slate-700">
                      {invoice?.data?.salesRefNumber}
                    </div>
                  </div>
                </AlertDialogTitle>
                <AlertDialogDescription className="border border-slate-700 p-4 rounded-lg space-y-3">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-sm text-slate-500">Product Name:</div>
                    <div className="text-sm text-slate-500">Quantity:</div>
                    <div className="text-sm text-slate-500">Unit Price:</div>
                    <div className="text-sm text-slate-500">Total Price:</div>
                  </div>
                  <div className="flex flex-col  gap-6">
                    {invoice?.data?.invoiceLogData.map((item) => (
                      <div
                        key={item.productData.guid}
                        className="grid grid-cols-4 gap-4"
                      >
                        <div className="space-y-1">
                          <div className="text-xs text-slate-700 flex flex-col">
                            <span className="font-semibold">
                              {item?.productData?.name}
                            </span>
                            <span>[{item?.productData?.notes}]</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-slate-700">
                            {item?.quantityRequested}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-slate-700">
                            NGN {item?.rate?.toLocaleString()}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-slate-700">
                            NGN {item?.amount?.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </AlertDialogDescription>
              </div>
              {/* Grand Total */}
              <div className="grid grid-cols-4 p-4">
                <div className="text-sm text-slate-700">Grand Total:</div>
                <div className="text-xs text-black font-semibold col-span-3 ml-auto border-b border-black">
                  NGN {invoice?.data?.totalAmount.toLocaleString()}
                </div>
              </div>
            </div>
          </AlertDialogHeader>

          <div className="flex items-center justify-between h-full mt-auto">
            <CustomButton
              onClick={() => reactToPrintFn()}
              className={cn(`bg-primary-100 h-fit text-white`)}
              label="Download"
            />

            <CustomButton
              onClick={onOpenChange}
              className={cn(`bg-muted-650`)}
              label="Cancel"
            />
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
