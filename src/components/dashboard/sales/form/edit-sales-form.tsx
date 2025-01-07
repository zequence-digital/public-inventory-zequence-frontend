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
import { useEditSales, useSale } from "@/queries/sales";
import { AddSalesSchema, customerType } from "@/schemas/sales/add-sales-schema";
import { useEffect, useRef, useState } from "react";

import { InputField } from "@/components/form/components/input-field";
import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { Spinner } from "@/components/spinner";
import { useCurrentBranch } from "@/hooks/use-current-branch";
import { useUnpaginatedData } from "@/hooks/use-unpaginated-data";
import { cn } from "@/lib/utils";
import { useDashboardItems } from "@/queries/dashboard-overview";
import type { UpdateSale } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomButton from "../../custom-button";
import { SalesListOverview } from "../sales-list-overview";
import plus from "/public/images/plus.svg";

type Props = {
  salesId: string;
};

export function EditSalesForm({ salesId }: Props) {
  const ref = useRef<HTMLFormElement | null>(null);
  const [referenceNumber, setReferenceNumber] = useState("");

  const form = useForm<UpdateSale>({
    resolver: zodResolver(
      AddSalesSchema.omit({
        productRefNumber: true,
        branchId: true,
        customerType: true,
        quantityRequested: true,
        item: true,
      }),
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
    activeProducts,
    pendingEntireProduct,
    isErrorEntireProduct,
    errorEntireProduct,
  } = useUnpaginatedData();

  const {
    data: sales,
    isError: isErrorSales,
    isPending: pendingSales,
    error: errorSales,
  } = useSale(salesId);

  const { mutate: updateSales, isPending } = useEditSales(ref);

  useEffect(() => {
    const item = activeProducts?.find(
      (item) =>
        item?.name.toLocaleLowerCase() ===
        sales?.data?.product?.name.toLocaleLowerCase(),
    );

    if (item) {
      setReferenceNumber(item?.referenceNumber);
    }
  }, [activeProducts, sales?.data?.product?.name, salesId]);

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
                                  pendingEntireProduct || pendingSales,
                              },
                            )}
                          >
                            <SelectValue
                              placeholder={sales?.data?.product?.name}
                            />
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
                      {(isErrorEntireProduct || isErrorSales) && (
                        <FormMessage>
                          {errorEntireProduct?.message || errorSales?.message}
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
