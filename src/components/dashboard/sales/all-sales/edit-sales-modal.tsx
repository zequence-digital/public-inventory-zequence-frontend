"use client";

import { DeleteSales } from "@/components/delete-table-item/delete-sales";
import { InputField } from "@/components/form/components/input-field";
import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { Spinner } from "@/components/spinner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useActiveUser } from "@/crypto";
import { cn, formatDate, formatName } from "@/lib/utils";
import { useEditSingleSalePack, useSingleGroupSales } from "@/queries/sales";
import { AddSalesSchema } from "@/schemas/sales/add-sales-schema";
import type { GroupSales, UpdateSale } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useReducer, useRef } from "react";
import { useForm } from "react-hook-form";

import CustomButton from "../../custom-button";
import { EditInvoicePack } from "./edit-invoice-pack";

type Props = {
  className?: string;
  sales: GroupSales["data"]["records"][number];
} & React.HTMLAttributes<HTMLDivElement>;

export function EditSalesInvoiceModal({ className, sales, ...rest }: Props) {
  const ref = useRef<HTMLFormElement | null>(null);
  const user = useActiveUser();
  const [open, onOpenChange] = useReducer((open) => !open, false);
  const {
    data: invoice,
    isPending,
    isError,
    error,
  } = useSingleGroupSales(sales?.guid);
  const { mutate: updateSales, isPending: pendingUpdateSales } =
    useEditSingleSalePack(onOpenChange, ref);

  const form = useForm<
    Omit<UpdateSale, "productRefNumber" | "branchId" | "customerType" | "item">
  >({
    resolver: zodResolver(
      AddSalesSchema.omit({
        productRefNumber: true,
        branchId: true,
        customerType: true,
        item: true,
      }),
    ),
    mode: "all",
  });

  if (isError) {
    return <ApiErrorMessage message={error?.message} />;
  }

  if (isPending) {
    return <Spinner />;
  }

  return (
    <>
      {user?.data?.roleName === "ADMIN" && (
        <>
          <EditInvoicePack onOpenChange={onOpenChange} />
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
                      <div className="text-sm text-black font-semibold">
                        Date created:
                      </div>
                      <div className="text-xs text-black font-semibold">
                        {formatDate(invoice?.data?.createdAt)}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-black font-semibold">
                        Customer Type:
                      </div>
                      <div className="text-xs text-black font-semibold">
                        {invoice?.data?.invoiceLogData[0]?.customerType}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-black font-semibold">
                        Product ID:
                      </div>
                      <div className="text-xs text-black font-semibold">
                        {invoice?.data?.salesRefNumber}
                      </div>
                    </div>
                  </AlertDialogTitle>
                  <AlertDialogDescription className="border border-slate-700 p-4 rounded-lg space-y-3">
                    <div className="flex flex-col  gap-6">
                      {invoice?.data?.invoiceLogData?.map((item) => (
                        <Form key={item.productData.guid} {...form}>
                          <form
                            onSubmit={form.handleSubmit((data) =>
                              updateSales({
                                quantityRequested: data?.quantityRequested,
                                guid: item?.guid,
                              }),
                            )}
                            ref={ref}
                            className="flex items-start gap-2"
                          >
                            <div className="flex-1">
                              <FormField
                                control={form.control}
                                name="quantityRequested"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <InputField
                                        className="h-9"
                                        label={formatName(
                                          item?.productData?.name,
                                        )}
                                        type="text"
                                        defaultValue={item.quantityRequested}
                                        name={`product-${item.productData.guid}`}
                                        id={`product-${item.productData.guid}`}
                                        placeholder="Quantity"
                                        onChange={field.onChange}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="flex items-baseline gap-2">
                              <CustomButton
                                type="submit"
                                className={cn(
                                  `bg-primary-100 text-white border-primary-100 hover:bg-primary-100/90 w-fit mt-8 `,
                                  {
                                    "cursor-not-allowed": pendingUpdateSales,
                                  },
                                )}
                                label="Update"
                                pendingLabel={
                                  <Spinner className=" border-white" />
                                }
                              />
                              <DeleteSales id={item?.guid} />
                            </div>
                          </form>
                        </Form>
                      ))}
                    </div>
                  </AlertDialogDescription>
                </div>
              </AlertDialogHeader>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </>
  );
}
