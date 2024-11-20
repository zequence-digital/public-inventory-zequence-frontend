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
import type {
  CreateOrganizationBranch,
  GetAllOrganizationBranch,
} from "@/types";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { CreateOrganizationBranchSchema } from "@/schemas/branch/create-organization-branch";
import CustomButton from "@/components/dashboard/custom-button";
import { InputField } from "@/components/form/components/input-field";
import { Spinner } from "@/components/spinner";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { useUpdateBranch } from "@/queries/branches";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  className?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  activeBranch: GetAllOrganizationBranch["data"][number] | undefined;
} & React.HTMLAttributes<HTMLDivElement>;

export function EditBranchModalForm({
  className,
  open,
  onOpenChange,
  activeBranch,
  ...rest
}: Props) {
  const ref = useRef<HTMLFormElement | null>(null);

  const form = useForm<CreateOrganizationBranch>({
    resolver: zodResolver(CreateOrganizationBranchSchema),
    mode: "all",
  });

  const { mutate: updateBranch, isPending } = useUpdateBranch(
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
          <AlertDialogTitle>
            Update Branch({activeBranch?.name})
          </AlertDialogTitle>
          <AlertDialogDescription>Update branch details</AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <div className="mt-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) =>
                  updateBranch({
                    ...data,
                    branchId: activeBranch?.id as number,
                  }),
                )}
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
                              defaultValue={activeBranch?.name}
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
                    label="Update branch"
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
