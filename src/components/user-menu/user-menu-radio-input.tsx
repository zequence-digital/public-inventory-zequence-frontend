"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { useCurrentUser } from "@/hooks/use-current-user";
import { formatName } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomImage } from "../custom-image/custom-image";
import { UserMenuAccountAction } from "./user-menu-account-action";

const FormSchema = z.object({
  type: z.enum(["all", "company", "individual"], {
    required_error: "You need to select a notification type.",
  }),
});

export function UserMenuRadioForm() {
  const user = useCurrentUser();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  return (
    <Form {...form}>
      <form className="space-y-6 ">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col gap-4"
                >
                  <div>
                    <FormItem className="flex items-center gap-1 space-y-0">
                      <FormControl className=" shrink-0">
                        <RadioGroupItem
                          className="user-radio"
                          value={user?.data.fullName ?? ""}
                        />
                      </FormControl>
                      <FormLabel className="font-normal flex item-center gap-2">
                        <CustomImage
                          className=" rounded [&_span]:rounded-lg "
                          src={user?.data.businessProfile.companyLogo ?? ""}
                          alt={user?.data.businessProfile.companyName ?? ""}
                        />
                        <div className="flex-col justify-start items-start inline-flex whitespace-nowrap">
                          <div className="self-stretch text-slate-700 text-sm font-medium ">
                            {formatName(user?.data.fullName ?? "")}
                          </div>
                          <div className="self-stretch text-slate-500 text-xs font-normal">
                            {user?.data.businessProfile.companyName}
                          </div>
                        </div>
                      </FormLabel>
                      <div className="cursor-pointer flex ml-auto text-slate-500">
                        <UserMenuAccountAction />
                      </div>
                    </FormItem>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
