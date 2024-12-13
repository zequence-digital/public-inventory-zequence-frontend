"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCategory, useEditCategory } from "@/queries/categories";
import { useRef, useState } from "react";

import type { AddCategory } from "@/types";
import { AddCategorySchema } from "@/schemas/categories/add-category-schema";
import { ApiErrorMessage } from "@/components/messages/api-error-message";
import CustomButton from "../../custom-button";
import { InputField } from "@/components/form/components/input-field";
import { RadioField } from "@/components/form/components/radio-field";
import SelectField from "@/components/form/components/select-field";
import { Spinner } from "@/components/spinner";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { values } from "@/components/form/form-data/category-values";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  categoryId: string;
};

export function EditCategoryForm({ categoryId }: Props) {
  const ref = useRef<HTMLFormElement | null>(null);
  const [description, setDescription] = useState<number>(275);

  const { mutate: editCategory, isPending } = useEditCategory(ref);
  const {
    data: category,
    isPending: pendingCategory,
    isError: isErrorCategory,
    error: errorCategory,
  } = useCategory(categoryId);

  const form = useForm<AddCategory>({
    resolver: zodResolver(AddCategorySchema),
    mode: "all",
  });

  if (isErrorCategory) {
    return <ApiErrorMessage message={errorCategory.message} />;
  }

  return (
    <div className="mt-8">
      <Form {...form}>
        <div className="text-slate-700 text-lg mb-8 font-semibold leading-7">
          Edit Category: {category?.data?.name}[{category?.data?.categoryType}]
        </div>
        <form
          onSubmit={form.handleSubmit((data) =>
            editCategory({
              ...data,
              subCategory: true,
              guid: categoryId,
            }),
          )}
          ref={ref}
        >
          <div className=" mb-8">
            <FormField
              control={form.control}
              name="categoryType"
              render={({ field }) => (
                <FormItem className=" max-w-[15rem] w-full">
                  <FormControl className="w-full">
                    <RadioField
                      values={values}
                      defaultValue={category?.data?.categoryType}
                      className="justify-between w-full radio-category"
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className=" grid grid-flow-row gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className=" grid grid-cols-12 gap-4 items-start">
                  <FormLabel
                    className=" whitespace-nowrap md:col-span-3 col-span-full"
                    htmlFor="name"
                  >
                    Category Name
                  </FormLabel>
                  <div className=" md:col-span-6 col-span-full">
                    <FormControl>
                      <InputField
                        defaultValue={category?.data?.name}
                        className="w-full"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name"
                        isPending={isPending}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className=" grid grid-cols-12 gap-4 items-start">
                  <FormLabel
                    className=" whitespace-nowrap md:col-span-3 col-span-full"
                    htmlFor="name"
                  >
                    Description
                  </FormLabel>
                  <div className=" md:col-span-6 col-span-full">
                    <FormControl>
                      <Textarea
                        defaultValue={category?.data?.description}
                        placeholder="Description"
                        className="resize-none h-[154px] w-full border border-muted-300"
                        onChange={(e) => {
                          field.onChange(e);
                          setDescription(275 - e.target.value.length);
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      {description < 0
                        ? null
                        : `${description} characters left`}
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className=" grid grid-cols-12 gap-4 items-start">
                  <FormLabel
                    className=" whitespace-nowrap md:col-span-3 col-span-full"
                    htmlFor="name"
                  >
                    Status
                  </FormLabel>
                  <div className=" md:col-span-6 col-span-full">
                    <FormControl>
                      <SelectField
                        placeholder={category?.data?.status}
                        defaultValue={category?.data?.status}
                        className={cn(`h-[48px] w-full`, {
                          "animate-pulse bg-muted-300": pendingCategory,
                        })}
                        onValueChange={field.onChange}
                        selectList={["ACTIVE", "INACTIVE", "ARCHIVED"]}
                      />
                    </FormControl>

                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-end justify-end max-w-[56.5rem] w-full">
            <CustomButton
              type="submit"
              className={cn(
                `bg-primary-100 text-white border-primary-100 hover:bg-primary-100/90 w-fit flex justify-end ml-auto mt-8`,
                {
                  "cursor-not-allowed": isPending,
                },
              )}
              label="Edit Category"
              pendingLabel={<Spinner className=" border-white" />}
              isPending={isPending}
            />
          </div>
        </form>
      </Form>
    </div>
  );
}
