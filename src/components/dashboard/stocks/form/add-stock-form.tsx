"use client";

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
import { useAddStock, useStocks } from "@/queries/stocks";
import { useEffect, useRef, useState } from "react";

import { InputField } from "@/components/form/components/input-field";
import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { Spinner } from "@/components/spinner";
import { useCurrentBranch } from "@/hooks/use-current-branch";
import { useUnpaginatedData } from "@/hooks/use-unpaginated-data";
import { cn } from "@/lib/utils";
import { AddStockSchema } from "@/schemas/stocks/add-stock-schema";
import type { AddStock } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomButton from "../../custom-button";
import { StockListOverview } from "../stock-list-overview";

export function AddStockForm() {
  const ref = useRef<HTMLFormElement | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const [branchId, setBranchId] = useState<
    { id: number; name: string } | undefined
  >(undefined);

  const form = useForm<AddStock>({
    resolver: zodResolver(AddStockSchema.omit({ branchId: true })),
    mode: "all",
  });

  const { mutate: createStock, isPending } = useAddStock(ref);

  const { currentBranch, isErrorBranch, pendingBranch, errorBranch } =
    useCurrentBranch();

  useEffect(() => {
    if (currentBranch) {
      setBranchId(currentBranch);
    }
  }, [currentBranch]);

  const {
    data: stockList,
    isError: isErrorStock,
    error: errorStock,
    isPending: pendingStock,
  } = useStocks(pageNumber, search, branchId?.id);
  const {
    entireCategory,
    pendingEntireCategory,
    errorEntireCategory,
    isErrorEntireCategory,
  } = useUnpaginatedData();

  const stocks = entireCategory?.filter(
    (item) => item.categoryType === "STOCK" && item.status === "ACTIVE",
  );

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
                ...data,
                quantity: Number(data.quantity),
                thresholdQuantity: Number(data.thresholdQuantity),
                branchId: currentBranch?.id as number,
              }),
            )}
            ref={ref}
          >
            <div className="grid grid-auto-fit-xl gap-8">
              <div>
                {/* Branch */}

                <FormField
                  control={form.control}
                  name="branchId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputField
                          label="Branch"
                          id="branch"
                          name="branch"
                          type="text"
                          placeholder="Enter branch name here"
                          isPending={pendingBranch}
                          value={currentBranch?.name}
                          disabled
                        />
                      </FormControl>

                      {isErrorBranch && (
                        <FormMessage>{errorBranch?.message}</FormMessage>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                {/* If categories exist, show select field, else show input field */}

                <FormField
                  control={form.control}
                  name="categoryGuid"
                  render={({ field }) => (
                    <FormItem>
                      {stocks?.length ? (
                        <FormLabel>Stock Category</FormLabel>
                      ) : null}
                      <FormControl>
                        {stocks?.length ? (
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger
                              className={cn(
                                `w-full h-[48px] px-4  text-sm bg-white border border-muted-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`,
                                {
                                  "animate-pulse bg-gray-300":
                                    pendingEntireCategory,
                                },
                              )}
                            >
                              <SelectValue placeholder="Select a Category" />
                            </SelectTrigger>
                            <SelectContent>
                              {stocks?.map((item, index) => (
                                <SelectItem
                                  id={item.guid}
                                  key={item.guid}
                                  value={item.guid}
                                >
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <InputField
                            label="Stock Category"
                            id="categories"
                            name="categories"
                            type="text"
                            placeholder="Enter stock category here"
                            isPending={isPending}
                            onChange={field.onChange}
                          />
                        )}
                      </FormControl>
                      {isErrorEntireCategory && (
                        <FormMessage>
                          {errorEntireCategory?.message}
                        </FormMessage>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                {/* Stock Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputField
                          label="Stock Name"
                          id="stockName"
                          name="stockName"
                          type="text"
                          placeholder="Enter stock name here"
                          isPending={isPending}
                          onChange={field.onChange}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                {/* Quantity */}
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputField
                          label="Quantity"
                          id="Quantity"
                          name="Quantity"
                          type="number"
                          placeholder="Enter stock quantity here"
                          isPending={isPending}
                          onChange={field.onChange}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputField
                          label="Stock Description"
                          id="Description"
                          name="Description"
                          type="text"
                          placeholder="Enter stock description here"
                          isPending={isPending}
                          onChange={field.onChange}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="thresholdQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputField
                          hasCustomIcon
                          width={15}
                          height={15}
                          src={`/images/thresh-hold.svg`}
                          alt="ThreshHold Alert Icon"
                          label="Threshold alert"
                          id="threshold"
                          name="threshold"
                          type="number"
                          placeholder="Enter stock threshold limit here"
                          isPending={isPending}
                          onChange={field.onChange}
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
              label="Add Stock"
              pendingLabel={<Spinner className=" border-white" />}
              isPending={isPending}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
