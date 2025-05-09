"use client";

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
import { useDashboardItems } from "@/queries/dashboard-overview";
import { useAddStockRequest, useStocks } from "@/queries/stocks";
import { AddStockTransferSchema } from "@/schemas/stocks/transfer/add-stock-transfer-schema";
import type { AddStockTransfer } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import CustomButton from "../../custom-button";
import { StockListOverview } from "../stock-list-overview";

export function StockRequestForm() {
  const ref = useRef<HTMLFormElement | null>(null);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [branchId, setBranchId] = useState<
    { id: number; name: string } | undefined
  >(undefined);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");

  const form = useForm<AddStockTransfer>({
    resolver: zodResolver(AddStockTransferSchema.omit({ fromBranchId: true })),
    mode: "all",
  });

  const { mutate: createStock, isPending } = useAddStockRequest(ref);

  const {
    pendingBranch: pendingCurrentBranch,
    isErrorBranch: isErrorCurrentBranch,
    errorBranch: errorCurrentBranch,
    currentBranch,
    filterNotCurrentBranch,
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
      <StockListOverview isPending={pendingStock} stocks={stockList} />
      <div className="mt-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              createStock({
                quantity: Number(data.quantity),
                toBranchId: currentBranch?.id as number,
                fromBranchId: branchId?.id as number,
                stockReferenceNumber: referenceNumber,
              }),
            )}
            ref={ref}
          >
            <div className="grid grid-auto-fit-xl gap-8">
              <div>
                {/*From Branch */}

                <FormField
                  control={form.control}
                  name="fromBranchId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputField
                          readOnly
                          disabled
                          label="Requesting Branch:"
                          id="fromBranchId"
                          name="fromBranchId"
                          type="text"
                          placeholder="Requesting branch"
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
                {/*To Branch */}

                <FormField
                  control={form.control}
                  name="toBranchId"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Request from:</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            const branchSelected = filterNotCurrentBranch?.find(
                              (item) => item.name === value,
                            );

                            if (branchSelected) {
                              setBranchId(branchSelected);
                            }
                          }}
                        >
                          <SelectTrigger
                            className={cn(
                              `w-full h-[48px] px-4  text-sm bg-white border border-muted-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`,
                              {
                                "animate-pulse bg-gray-300":
                                  pendingCurrentBranch,
                              },
                            )}
                          >
                            <SelectValue placeholder="Select a Branch" />
                          </SelectTrigger>
                          <SelectContent>
                            {filterNotCurrentBranch?.map((item) => (
                              <SelectItem
                                id={item.name}
                                key={item.id}
                                value={item.name}
                              >
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      {isErrorCurrentBranch && (
                        <FormMessage>{errorCurrentBranch?.message}</FormMessage>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {(stockList?.data?.records?.length ?? 0 > 0) ? (
                <div>
                  {/* Item */}

                  <FormField
                    control={form.control}
                    name="stockReferenceNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock</FormLabel>
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
                              {stockList?.data?.records
                                ?.slice()
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((item) => (
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
                </div>
              ) : (
                <div>
                  <FormItem>
                    <FormControl>
                      <InputField
                        readOnly
                        disabled
                        label="Stock"
                        id="stockReferenceNumber"
                        name="stockReferenceNumber"
                        type="text"
                        placeholder="Stock"
                        isPending={pendingStock}
                        value="No stock available for branch selected"
                      />
                    </FormControl>
                  </FormItem>
                </div>
              )}
              {/* select field for picking a quantity */}
              <div>
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputField
                          step="any"
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
              type="submit"
              className="bg-primary-100 text-white border-primary-100 hover:bg-primary-100/90 w-fit flex justify-end ml-auto mt-8"
              label="Request Stock"
              pendingLabel={<Spinner className=" border-white" />}
              isPending={isPending}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
