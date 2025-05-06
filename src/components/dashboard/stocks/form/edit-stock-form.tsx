"use client";

import { InputField } from "@/components/form/components/input-field";
import { Spinner } from "@/components/spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useCurrentBranch } from "@/hooks/use-current-branch";
import { useEditStock, useStock } from "@/queries/stocks";
import { AddStockSchema } from "@/schemas/stocks/add-stock-schema";
import type { UpdateStock } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";

import CustomButton from "../../custom-button";

type Props = {
  stockId: string;
};
export function EditStockForm({ stockId }: Props) {
  const ref = useRef<HTMLFormElement | null>(null);

  const form = useForm<UpdateStock>({
    resolver: zodResolver(
      AddStockSchema.omit({ categoryGuid: true, branchId: true }),
    ),
    mode: "all",
  });
  const {
    data: stock,
    isPending: pendingStock,
    isError,
    error,
  } = useStock(stockId);

  const { currentBranch, isErrorBranch, errorBranch, pendingBranch } =
    useCurrentBranch();

  const { mutate: editProduct, isPending } = useEditStock(ref);

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="mt-8">
      <div className="self-stretch text-slate-700 mb-8 text-lg font-semibold leading-7">
        Edit Stock: {stock?.data.name}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            editProduct({
              ...data,
              guid: stock?.data.guid as string,
              quantity: Number(data.quantity),
              thresholdQuantity: Number(data.thresholdQuantity),
              branchId: Number(data.branchId),
            }),
          )}
          ref={ref}
        >
          <div className="grid grid-auto-fit-lg gap-8">
            <div>
              {/* Branch */}

              <FormField
                control={form.control}
                name="branchId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputField
                        disabled
                        readOnly
                        value={currentBranch?.name}
                        label="Stock Branch"
                        id="branch"
                        name="branch"
                        type="text"
                        placeholder="Enter stock branch here"
                        isPending={pendingBranch}
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
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputField
                        defaultValue={stock?.data.name}
                        label="Stock Name"
                        id="Name"
                        name="Name"
                        type="text"
                        placeholder="Enter stock name here"
                        isPending={isPending || pendingStock}
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
                name="costPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputField
                        defaultValue={stock?.data.costPrice}
                        label="Cost Price"
                        id="costPrice "
                        name="costPrice"
                        type="number"
                        placeholder="Enter cost price here"
                        isPending={isPending || pendingStock}
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
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputField
                        step="any"
                        defaultValue={stock?.data.quantity}
                        label="Quantity"
                        id="Quantity"
                        name="Quantity"
                        type="number"
                        placeholder="Enter stock quantity here"
                        isPending={isPending || pendingStock}
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
                        defaultValue={stock?.data.notes ?? ""}
                        label="Description"
                        id="Description"
                        name="Description"
                        type="text"
                        placeholder="Enter stock description here"
                        isPending={isPending || pendingStock}
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
                        defaultValue={stock?.data.thresholdQuantity}
                        hasCustomIcon
                        step="any"
                        width={15}
                        height={15}
                        src={`/images/thresh-hold.svg`}
                        alt="ThreshHold Alert Icon"
                        label="Threshold alert"
                        id="threshold"
                        name="threshold"
                        type="number"
                        placeholder="Enter stock threshold limit here"
                        isPending={isPending || pendingStock}
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
            label="Edit Stock"
            pendingLabel={<Spinner className=" border-white" />}
            isPending={isPending}
          />
        </form>
      </Form>
    </div>
  );
}
