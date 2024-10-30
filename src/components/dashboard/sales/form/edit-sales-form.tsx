"use client";

import { AddSalesSchema, customerType } from "@/schemas/sales/add-sales-schema";
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
import { useEditSales, useSale } from "@/queries/sales";
import { useEffect, useRef, useState } from "react";

import { ApiErrorMessage } from "@/components/messages/api-error-message";
import CustomButton from "../../custom-button";
import { InputField } from "@/components/form/components/input-field";
import { SalesListOverview } from "../sales-list-overview";
import { Spinner } from "@/components/spinner";
import type { UpdateSale } from "@/types";
import { cn } from "@/lib/utils";
import plus from "/public/images/plus.svg";
import { useCurrentBranch } from "@/hooks/use-current-branch";
import { useDashboardItems } from "@/queries/dashboard-overview";
import { useForm } from "react-hook-form";
import { useProducts } from "@/queries/products";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  salesId: string;
};

export function EditSalesForm({ salesId }: Props) {
  const ref = useRef<HTMLFormElement | null>(null);
  const [referenceNumber, setReferenceNumber] = useState("");

  const form = useForm<UpdateSale>({
    resolver: zodResolver(
      AddSalesSchema.omit({ productRefNumber: true, branchId: true }),
    ),
    mode: "all",
  });

  const { currentBranch, isErrorBranch, pendingBranch, errorBranch } =
    useCurrentBranch();

  const {
    data: items,
    isError: isErrorItems,
    isPending: pendingItems,
    error: errorItems,
  } = useDashboardItems("ALL");

  const {
    data: product,
    isError: isErrorProduct,
    isPending: pendingProduct,
    error: errorProduct,
  } = useProducts();

  const {
    data: sales,
    isError: isErrorSales,
    isPending: pendingSales,
    error: errorSales,
  } = useSale(salesId);

  const { mutate: updateSales, isPending } = useEditSales(ref);

  useEffect(() => {
    if (sales?.data?.product?.name) {
      setReferenceNumber(sales?.data?.product?.referenceNumber);
    }
  }, [sales?.data?.product?.name, sales?.data?.product?.referenceNumber]);

  if (isErrorItems) {
    return <ApiErrorMessage message={errorItems?.message} />;
  }

  return (
    <div>
      <SalesListOverview isPending={pendingItems} items={items} />
      <div className="mt-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              updateSales({
                customerType: data.customerType,
                branchId: currentBranch?.id as number,
                productRefNumber: referenceNumber,
                quantityRequested: data?.quantityRequested,
                guid: salesId,
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
                          readOnly
                          disabled
                          label="Branch"
                          id="Branch"
                          name="Branch"
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
                    <FormItem>
                      <FormLabel>Customer Type</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger
                            className={cn(
                              `w-full h-[48px] px-4  text-sm bg-white border border-muted-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`,
                              {
                                "animate-pulse bg-gray-300": pendingSales,
                              },
                            )}
                          >
                            <SelectValue
                              placeholder={sales?.data?.customerType}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {customerType?.map((customer) => (
                              <SelectItem
                                defaultValue={sales?.data?.customerType}
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
                {/* Item */}

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
                            const item = product?.data?.records?.find(
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
                                  pendingProduct || pendingSales,
                              },
                            )}
                          >
                            <SelectValue
                              placeholder={sales?.data?.product?.name}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {product?.data?.records?.map((item) => (
                              <SelectItem
                                id={item.guid}
                                key={item.guid}
                                value={item.name}
                              >
                                {item.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      {(isErrorProduct || isErrorSales) && (
                        <FormMessage>
                          {errorProduct?.message || errorSales?.message}
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
                  name="quantityRequested"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputField
                          defaultValue={sales?.data?.quantityRequested}
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
              label="Update invoice"
              pendingLabel={<Spinner className=" border-white" />}
              isPending={isPending}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
