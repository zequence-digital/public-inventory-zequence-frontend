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
import { useUnpaginatedData } from "@/hooks/use-unpaginated-data";
import { cn } from "@/lib/utils";
import { useDashboardOverview } from "@/queries/dashboard-overview";
import { useAddSales } from "@/queries/sales";
import { AddSalesSchema, customerType } from "@/schemas/sales/add-sales-schema";
import type { AddSales } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

import CustomButton from "../../custom-button";
import { ProductOverview } from "../../home/product-overview";
import { StockOverview } from "../../home/stock-overview";
import plus from "/public/images/plus.svg";

export function AddSalesForm() {
  const ref = useRef<HTMLFormElement | null>(null);
  const [referenceNumber, setReferenceNumber] = useState("");

  const form = useForm<AddSales>({
    resolver: zodResolver(
      AddSalesSchema.omit({ productRefNumber: true, branchId: true }),
    ),
    mode: "all",
  });

  const {
    data: overview,
    isError: isErrorOverview,
    isPending: pendingOverview,
    error: errorOverview,
  } = useDashboardOverview();

  const {
    activeProducts,
    pendingEntireProduct,
    isErrorEntireProduct,
    errorEntireProduct,
  } = useUnpaginatedData();

  const { currentBranch, isErrorBranch, pendingBranch, errorBranch } =
    useCurrentBranch();

  const { mutate: createSales, isPending } = useAddSales(ref);

  if (isErrorOverview) {
    return <ApiErrorMessage message={errorOverview?.message} />;
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ProductOverview isPending={pendingOverview} products={overview} />
        <StockOverview isPending={pendingOverview} stocks={overview} />
      </div>
      <div className="mt-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              createSales({
                customerType: data.customerType,
                branchId: currentBranch?.id as number,
                productRefNumber: referenceNumber,
                quantityRequested: data.quantityRequested,
                discountAmount: data.discountAmount,
              }),
            )}
            ref={ref}
          >
            <div className="grid grid-auto-fit-xl gap-8">
              {/* Branch */}
              <div>
                <FormField
                  control={form.control}
                  name="branchId"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputField
                          disabled
                          label="Branch"
                          id="branchId"
                          name="branchId"
                          type="text"
                          placeholder="#"
                          isPending={pendingBranch}
                          value={currentBranch?.name}
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
                  name="customerType"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Customer Type</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger
                            className={cn(
                              `w-full h-[48px] px-4  text-sm bg-white border border-muted-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`,
                            )}
                          >
                            <SelectValue placeholder="Select a Customer Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {customerType?.map((customer) => (
                              <SelectItem
                                id={customer}
                                key={customer}
                                value={customer}
                              >
                                {customer}
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
              <div>
                <FormField
                  control={form.control}
                  name="discountAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputField
                          label="Discount Amount"
                          id="discountAmount"
                          name="discountAmount"
                          type="number"
                          placeholder="Enter discount amount here"
                          isPending={pendingBranch}
                          value={field.value || 0}
                          onChange={field.onChange}
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
                {/* Item */}

                {activeProducts && activeProducts?.length > 0 ? (
                  <FormField
                    control={form.control}
                    name="item"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              const item = activeProducts?.find(
                                (item) => item?.name === value,
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
                                    pendingEntireProduct,
                                },
                              )}
                            >
                              <SelectValue placeholder="Select a product" />
                            </SelectTrigger>
                            <SelectContent>
                              {activeProducts?.map((item) => (
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
                        {isErrorEntireProduct && (
                          <FormMessage>
                            {errorEntireProduct?.message}
                          </FormMessage>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ) : (
                  <InputField
                    disabled
                    label="Product Name"
                    id="ProductName"
                    name="ProductName"
                    type="text"
                    placeholder="No products found, please add a product"
                    isPending={pendingEntireProduct}
                  />
                )}
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="quantityRequested"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputField
                          label="Quantity"
                          id="Quantity"
                          name="Quantity"
                          type="number"
                          placeholder="#"
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
              imageClassName="text-white"
              src={plus}
              type="submit"
              className="bg-primary-100 text-white border-primary-100 hover:bg-primary-100/90 w-fit mt-8"
              label="Add invoice"
              pendingLabel={<Spinner className=" border-white" />}
              isPending={isPending}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
