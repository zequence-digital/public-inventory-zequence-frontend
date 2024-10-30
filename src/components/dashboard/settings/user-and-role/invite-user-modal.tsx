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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { InputField } from "@/components/form/components/input-field";
import { Spinner } from "@/components/spinner";
import { cn } from "@/lib/utils";
import { useInviteUser } from "@/queries/settings/user-and-role";
import { InviteUserSchema } from "@/schemas/settings/invite-user-schema";
import { useInviteUserModalAction } from "@/store/use-invite-user-modal";
import type { InviteUser } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../../custom-button";

const roles = ["ADMIN", "CASHIER", "STAFF"];

type Props = { className?: string } & React.HTMLAttributes<HTMLDivElement>;

export function InviteUserModalForm({ className, ...rest }: Props) {
  const ref = useRef<HTMLFormElement | null>(null);
  const { open, onOpenChange } = useInviteUserModalAction();

  const form = useForm<InviteUser>({
    resolver: zodResolver(InviteUserSchema),
    mode: "all",
  });

  const { mutate: invite, isPending } = useInviteUser(ref);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        {...rest}
        className={cn(` max-w-[400px] w-full`, className)}
      >
        <AlertDialogHeader>
          <div>
            <Image
              width={48}
              height={48}
              src={"/images/users.svg"}
              alt="User"
            />
          </div>
          <AlertDialogTitle>Invite new user</AlertDialogTitle>
          <AlertDialogDescription>
            Invite new members and manage their roles
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <div className="mt-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => invite(data))}
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
                              placeholder="Full name"
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
                    {/* Email */}

                    <FormField
                      control={form.control}
                      name="inviteeEmailAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <InputField
                              id="email"
                              name="email"
                              type="text"
                              placeholder="Email address"
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
                    {/* Role */}

                    <FormField
                      control={form.control}
                      name="roleName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select onValueChange={field.onChange}>
                              <SelectTrigger
                                className={cn(
                                  `w-full h-[48px] px-4  text-sm bg-white border border-muted-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`,
                                  {},
                                )}
                              >
                                <SelectValue placeholder="Role" />
                              </SelectTrigger>
                              <SelectContent>
                                {roles?.map((role) => (
                                  <SelectItem id={role} key={role} value={role}>
                                    {role}
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
                    label="Send invite"
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
