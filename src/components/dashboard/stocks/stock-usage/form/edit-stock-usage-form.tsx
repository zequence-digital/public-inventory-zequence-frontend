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
import {
  useEditStockUsage,
  useSingleStockUsage,
  useStocks,
} from "@/queries/stocks";
import { useEffect, useRef, useState } from "react";

import CustomButton from "@/components/dashboard/custom-button";
import { InputField } from "@/components/form/components/input-field";
import { Spinner } from "@/components/spinner";
import { useCurrentBranch } from "@/hooks/use-current-branch";
import { cn } from "@/lib/utils";
import { AddStockUsageSchema } from "@/schemas/stocks/stock-usage/add-stock-usage-schema";
import type { AddStockUsage } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type Props = {
  stockUsageId: string;
};

export function EditStockUsageForm({ stockUsageId }: Props) {
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
        stockRefNumber: true,
        quantity: true,
      }),
    ),
    mode: "all",
  });

  const { mutate: createStock, isPending } = useEditStockUsage(ref);
  const {
    data: stockUsage,
    isError,
    error,
    isPending: isPendingStockUsage,
  } = useSingleStockUsage(stockUsageId);

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

  const {
    data: stockList,
    isError: isErrorStock,
    error: errorStock,
    isPending: pendingStock,
  } = useStocks(pageNumber, search, branchId?.id);

  useEffect(() => {
    const item = stockList?.data?.records?.find(
      (item) =>
        item?.name.toLocaleLowerCase() ===
        stockUsage?.data?.stock?.name.toLocaleLowerCase(),
    );
    if (item) {
      setReferenceNumber(item?.referenceNumber);
    }
  }, [stockList?.data?.records, stockUsage?.data?.stock?.name, stockUsageId]);

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
                guid: stockUsageId,
              }),
            )}
            ref={ref}
          >
            <div className="grid grid-auto-fit-lg w-full gap-8">
              <div>
                {/*Branch */}

                <FormField
                  control={form.control}
                  name="branchId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputField
                          disabled
                          label="Stock Branch"
                          id="branchId"
                          name="branchId"
                          type="text"
                          placeholder="Branch"
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

                <FormField
                  control={form.control}
                  name="stockRefNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock category</FormLabel>
                      <FormControl>
                        <Select
                          defaultValue={referenceNumber}
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
                                "animate-pulse bg-gray-300":
                                  pendingStock || isPendingStockUsage,
                              },
                            )}
                          >
                            <SelectValue
                              placeholder={stockUsage?.data?.stock?.name}
                            />
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
                      {(isErrorStock || isError) && (
                        <FormMessage>
                          {isErrorStock ? errorStock?.message : error?.message}
                        </FormMessage>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputField
                          defaultValue={stockUsage?.data?.quantity}
                          onChange={field.onChange}
                          label="Quantity"
                          id="quantity"
                          name="quantity"
                          type="number"
                          placeholder="#"
                          isPending={isPending}
                        />
                      </FormControl>

                      {isError && <FormMessage>{error?.message}</FormMessage>}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <CustomButton
              type="submit"
              className="bg-primary-100 text-white border-primary-100 hover:bg-primary-100/90 w-fit flex mt-8"
              label="Update usage"
              pendingLabel={<Spinner className=" border-white" />}
              isPending={isPending}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
