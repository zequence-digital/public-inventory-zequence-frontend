"use client";

import CustomButton from "@/components/dashboard/custom-button";
import { InputField } from "@/components/form/components/input-field";
import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { Spinner } from "@/components/spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrentBranch } from "@/hooks/use-current-branch";
import { cn } from "@/lib/utils";
import { useAddStockUsage, useStocks } from "@/queries/stocks";
import { AddStockUsageSchema } from "@/schemas/stocks/stock-usage/add-stock-usage-schema";
import type { AddStockUsage } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import plus from "/public/images/plus.svg";

export function AddStockUsageForm() {
  const ref = useRef<HTMLFormElement | null>(null);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [branchId, setBranchId] = useState<
    { id: number; name: string } | undefined
  >(undefined);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");

  const form = useForm<AddStockUsage>({
    resolver: zodResolver(
      AddStockUsageSchema.omit({
        branchId: true,
      }),
    ),
    mode: "all",
  });

  const { mutate: createStock, isPending } = useAddStockUsage(ref);

  const {
    pendingBranch: pendingCurrentBranch,
    isErrorBranch: isErrorCurrentBranch,
    errorBranch: errorCurrentBranch,
    currentBranch,
  } = useCurrentBranch();

  useEffect(() => {
    if (currentBranch) {
      setBranchId(currentBranch);
    }
  }, [currentBranch]);

  // const {
  //   data: stockList,
  //   isError: isErrorStock,
  //   error: errorStock,
  //   isPending: pendingStock,
  // } = useStocks(pageNumber, search, branchId?.id);

  const {
    data: stockList,
    isError: isErrorStock,
    error: errorStock,
    isPending: pendingStock,
  } = useStocks(pageNumber, search, branchId?.id, undefined, undefined, true); // Note the added 'true'

  if (isErrorStock) {
    return <ApiErrorMessage message={errorStock.message} />;
  }

  return (
    <div>
      <div className="mt-8 w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              createStock({
                quantity: Number(data.quantity),
                branchId: currentBranch?.id as number,
                stockRefNumber: referenceNumber,
              }),
            )}
            ref={ref}
          >
            <div className="grid grid-auto-fit-lg w-full gap-8">
              <div>
                {/*From Branch */}

                <FormField
                  control={form.control}
                  name="branchId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputField
                          disabled
                          label="Stock Branch"
                          id="fromBranchId"
                          name="fromBranchId"
                          type="text"
                          placeholder="#"
                          isPending={pendingCurrentBranch}
                          value={currentBranch?.name}
                        />
                      </FormControl>

                      {isErrorCurrentBranch && (
                        <FormMessage>{errorCurrentBranch?.message}</FormMessage>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                {/* Item */}

                {stockList?.data?.records &&
                stockList?.data?.records.length > 0 ? (
                  <FormField
                    control={form.control}
                    name="stockRefNumber"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Stock category</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              const item = stockList?.data?.records?.find(
                                (item) => item.name === value,
                              );

                              if (item) {
                                setReferenceNumber(item.referenceNumber);
                              }
                            }}
                          >
                            <SelectTrigger
                              className={cn(
                                `w-full h-[48px] px-4  text-sm bg-white border border-muted-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`,
                                {
                                  "animate-pulse bg-gray-300": pendingStock,
                                },
                              )}
                            >
                              <SelectValue placeholder="Select a stock" />
                            </SelectTrigger>
                            <SelectContent>
                              {stockList?.data?.records?.map((item) => (
                                <SelectItem
                                  id={item.guid}
                                  key={item.guid}
                                  value={item?.name}
                                >
                                  {item?.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <InputField
                    disabled
                    label="Stock category"
                    id="stockRefNumber"
                    name="stockRefNumber"
                    type="text"
                    placeholder="#"
                    isPending={pendingStock}
                    value="No stock available"
                  />
                )}
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputField
                          onChange={field.onChange}
                          label="Quantity"
                          id="quantity"
                          name="quantity"
                          type="number"
                          placeholder="#"
                          isPending={isPending}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <CustomButton
              src={plus}
              type="submit"
              className={cn(
                `bg-primary-100 text-white border-primary-100 hover:bg-primary-100/90 w-fit flex mt-8`,
                {
                  "cursor-not-allowed": isPending,
                },
              )}
              label="Add and Continue"
              pendingLabel={<Spinner className=" border-white" />}
              isPending={isPending}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
