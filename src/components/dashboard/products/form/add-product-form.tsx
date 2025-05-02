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
import { useAddProduct, useProducts } from "@/queries/products";
import { AddProductSchema } from "@/schemas/products/add-product-schema";
import type { AddProduct } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import CustomButton from "../../custom-button";
import { ProductListOverview } from "../product-list-overview";

export function AddProductForm() {
  const ref = useRef<HTMLFormElement | null>(null);
  const [branchId, setBranchId] = useState<
    { id: number; name: string } | undefined
  >(undefined);

  const { currentBranch, isErrorBranch, pendingBranch, errorBranch } =
    useCurrentBranch();

  useEffect(() => {
    if (currentBranch) {
      setBranchId(currentBranch);
    }
  }, [currentBranch]);

  const form = useForm<AddProduct>({
    resolver: zodResolver(AddProductSchema.omit({ branchId: true })),
    mode: "all",
  });

  const {
    data: prod,
    isPending: pendingProd,
    isError: isErrorProd,
    error: errorProd,
  } = useProducts();

  const {
    entireCategory,
    pendingEntireCategory,
    errorEntireCategory,
    isErrorEntireCategory,
  } = useUnpaginatedData();

  const products = entireCategory?.filter(
    (item) => item.categoryType === "PRODUCT" && item.status === "ACTIVE",
  );

  const { mutate: createProduct, isPending } = useAddProduct(ref);

  if (isErrorProd) {
    return <ApiErrorMessage message={errorProd.message} />;
  }

  return (
    <div>
      <ProductListOverview products={prod} isPending={pendingProd} />
      <div className="mt-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              createProduct({
                ...data,
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
                          value={branchId?.name}
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
                    <FormItem className=" space-y-1">
                      {products && products?.length > 0 ? (
                        <FormLabel>Product Category</FormLabel>
                      ) : null}
                      <FormControl>
                        {products && products?.length > 0 ? (
                          <Select onValueChange={field.onChange}>
                            <SelectTrigger
                              className={cn(
                                `w-full h-[48px] px-4 text-sm bg-white border border-muted-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`,
                                {
                                  "animate-pulse bg-gray-300":
                                    pendingEntireCategory,
                                },
                              )}
                            >
                              <SelectValue placeholder="Select a Category" />
                            </SelectTrigger>
                            <SelectContent>
                              {products?.map((item) => (
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
                            disabled
                            label="Product Category"
                            id="categories"
                            name="categories"
                            type="text"
                            placeholder="No categories available"
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
                {/* Product Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputField
                          label="Product Name"
                          id="productName"
                          name="ProductName"
                          type="text"
                          placeholder="Enter product name here"
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
                          label="Product Quantity"
                          id="productQuantity"
                          name="productQuantity"
                          type="number"
                          placeholder="Enter product quantity here"
                          isPending={isPending}
                          onChange={field.onChange}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/*selling Price */}
              <div>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputField
                          label="Selling Price"
                          id="price"
                          name="price"
                          type="number"
                          placeholder="Enter product price here"
                          isPending={isPending}
                          onChange={field.onChange}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/*cost Price */}
              <div>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputField
                          label="Cost Price"
                          id="costPrice"
                          name="costPrice"
                          type="number"
                          placeholder="Enter product cost price here"
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
                          label="Product Description"
                          id="productDescription"
                          name="productDescription"
                          type="text"
                          placeholder="Enter product description here"
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
                  name="threshold"
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
                          id="productThreshHoldLimit"
                          name="productThreshHoldLimit"
                          type="number"
                          placeholder="Enter product threshold limit here"
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
              label="Add Product"
              pendingLabel={<Spinner className=" border-white" />}
              isPending={isPending}
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
