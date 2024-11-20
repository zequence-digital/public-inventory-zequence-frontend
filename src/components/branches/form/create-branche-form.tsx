"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import type { CreateOrganizationBranch } from "@/types";
import { CreateOrganizationBranchSchema } from "@/schemas/branch/create-organization-branch";
import CustomButton from "@/components/dashboard/custom-button";
import { InputField } from "@/components/form/components/input-field";
import { Spinner } from "@/components/spinner";
import { cn } from "@/lib/utils";
import { useCreateBranch } from "@/queries/branches";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function CreateBranchModalForm({
  className,
  open,
  onOpenChange,
  ...rest
}: Props) {
  const ref = useRef<HTMLFormElement | null>(null);

  const form = useForm<CreateOrganizationBranch>({
    resolver: zodResolver(CreateOrganizationBranchSchema),
    mode: "all",
  });

  const { mutate: createBranch, isPending } = useCreateBranch(
    ref,
    onOpenChange,
  );

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        {...rest}
        className={cn(` max-w-[400px] w-full`, className)}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Branch</AlertDialogTitle>
          <AlertDialogDescription>
            Add a new branch to your inventory
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <div className="mt-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => createBranch(data))}
                ref={ref}
              >
                <div className="grid grid-auto-fit-xl gap-5">
                  <div>
                    {/* Name */}

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputField
                              id="name"
                              name="name"
                              type="text"
                              placeholder="Branch name"
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
                <AlertDialogFooter className=" flex justify-between w-full mt-6">
                  <AlertDialogCancel
                    className=" flex mr-auto border border-gray-500 w-full"
                    onClick={() => onOpenChange(false)}
                  >
                    Cancel
                  </AlertDialogCancel>
                  <CustomButton
                    isPending={isPending}
                    pendingLabel={<Spinner className="border-white" />}
                    className="bg-primary-100 text-center flex items-center justify-center text-white w-full"
                    label="Create new branch"
                  />
                </AlertDialogFooter>
              </form>
            </Form>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
