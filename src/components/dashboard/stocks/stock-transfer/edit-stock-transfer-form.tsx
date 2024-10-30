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
  useEditStockTransfer,
  useSingleStockTransfer,
  useStocks,
} from "@/queries/stocks";
import { useEffect, useRef, useState } from "react";

import { InputField } from "@/components/form/components/input-field";
import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { Spinner } from "@/components/spinner";
import { useCurrentBranch } from "@/hooks/use-current-branch";
import { cn } from "@/lib/utils";
import { AddStockTransferSchema } from "@/schemas/stocks/transfer/add-stock-transfer-schema";
import type { UpdateStockTransfer } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomButton from "../../custom-button";
import { StockListOverview } from "../stock-list-overview";

type Props = {
  stockTransferId: string;
};
export function EditStockTransferForm({ stockTransferId }: Props) {
  const ref = useRef<HTMLFormElement | null>(null);
  const [branchId, setBranchId] = useState<
    { id: number; name: string } | undefined
  >(undefined);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");

  const form = useForm<UpdateStockTransfer>({
    resolver: zodResolver(
      AddStockTransferSchema.omit({
        stockReferenceNumber: true,
        quantity: true,
        fromBranchId: true,
      }),
    ),
    mode: "all",
  });

  const { mutate: createStock, isPending } = useEditStockTransfer(ref);

  const {
    pendingBranch: pendingCurrentBranch,
    isErrorBranch: isErrorCurrentBranch,
    errorBranch: errorCurrentBranch,
    currentBranch,
    filterNotCurrentBranch,
  } = useCurrentBranch();

  const {
    data: stockTransfer,
    isPending: pendingStockTransfer,
    isError: isErrorStockTransfer,
    error: errorStockTransfer,
  } = useSingleStockTransfer(stockTransferId);

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
                toBranchId: Number(data.toBranchId),
                fromBranchId: Number(data.fromBranchId),
                guid: stockTransferId,
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
                          label="Transfer from:"
                          id="fromBranchId"
                          name="fromBranchId"
                          type="text"
                          placeholder="Transfer from"
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
                {/*Transfer to Branch */}

                <FormField
                  control={form.control}
                  name="toBranchId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Transfer to:</FormLabel>
                      <FormControl>
                        <Select
                          defaultValue={stockTransfer?.data?.toBranch?.name}
                          onValueChange={field.onChange}
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
                            <SelectValue
                              placeholder={stockTransfer?.data?.toBranch?.name}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {filterNotCurrentBranch?.map((item) => (
                              <SelectItem
                                id={item.name}
                                key={item.id}
                                value={item.id.toString()}
                              >
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      {isErrorCurrentBranch ||
                        (isErrorStockTransfer && (
                          <FormMessage>
                            {errorCurrentBranch?.message ||
                              errorStockTransfer?.message}
                          </FormMessage>
                        ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <CustomButton
              type="submit"
              className="bg-primary-100 text-white border-primary-100 hover:bg-primary-100/90 w-fit flex justify-end ml-auto mt-8"
              label="Update Stock Transfer"
              pendingLabel={<Spinner className=" border-white" />}
              isPending={isPending}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
