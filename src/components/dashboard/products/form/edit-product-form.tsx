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
import { useEditProduct, useProduct } from "@/queries/products";
import { AddProductSchema } from "@/schemas/products/add-product-schema";
import type { UpdateProduct } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";

import CustomButton from "../../custom-button";

type Props = {
  productId: string;
};
export function EditProductForm({ productId }: Props) {
  const ref = useRef<HTMLFormElement | null>(null);

  const form = useForm<UpdateProduct>({
    resolver: zodResolver(
      AddProductSchema.omit({ categoryGuid: true, branchId: true }),
    ),
    mode: "all",
  });
  const {
    data: product,
    isPending: pendingProduct,
    isError,
    error,
  } = useProduct(productId);

  const { currentBranch, isErrorBranch, errorBranch, pendingBranch } =
    useCurrentBranch();

  const { mutate: editProduct, isPending } = useEditProduct(ref);

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="mt-8">
      <div className="self-stretch text-slate-700 mb-8 text-lg font-semibold leading-7">
        Edit Product: {product?.data?.name}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            editProduct({
              ...data,
              branchId: currentBranch?.id as number,
              guid: product?.data?.guid as string,
              quantity: Number(data.quantity),
              threshold: Number(data.threshold),
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
                        label="Product Branch"
                        id="productBranch"
                        name="productBranch"
                        type="text"
                        placeholder="Enter product branch here"
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
                        defaultValue={product?.data?.name}
                        label="Product Name"
                        id="productName"
                        name="ProductName"
                        type="text"
                        placeholder="Enter product name here"
                        isPending={isPending || pendingProduct}
                        onChange={field.onChange}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Quantity */}
            <div>
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputField
                        defaultValue={product?.data?.quantity}
                        label="Product Quantity"
                        id="productQuantity"
                        name="productQuantity"
                        type="number"
                        placeholder="Enter product quantity here"
                        isPending={isPending || pendingProduct}
                        onChange={field.onChange}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Selling Price */}
            <div>
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputField
                        defaultValue={product?.data?.price}
                        label="Selling Price"
                        id="price"
                        name="price"
                        type="number"
                        placeholder="Enter product price here"
                        isPending={isPending || pendingProduct}
                        onChange={field.onChange}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Cost Price */}
            <div>
              <FormField
                control={form.control}
                name="costPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputField
                        defaultValue={product?.data?.costPrice}
                        label="Cost Price"
                        id="costPrice"
                        name="costPrice"
                        type="number"
                        placeholder="Enter product cost price here"
                        isPending={isPending || pendingProduct}
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
                        defaultValue={product?.data?.notes}
                        label="Product Description"
                        id="productDescription"
                        name="productDescription"
                        type="text"
                        placeholder="Enter product description here"
                        isPending={isPending || pendingProduct}
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
                        defaultValue={product?.data?.threshold}
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
                        isPending={isPending || pendingProduct}
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
            label="Edit Product"
            pendingLabel={<Spinner className=" border-white" />}
            isPending={isPending}
          />
        </form>
      </Form>
    </div>
  );
}
