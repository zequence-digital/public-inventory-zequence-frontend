"use client";

import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { ResendOtpSchema } from "@/schemas/resend-otp-schema";
import { Spinner } from "../spinner";
import SubmitButton from "@/components/form/components/submit-button";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useResendOTP } from "@/services/auth";
import { useSignUpEmail } from "@/store/use-sign-up-email";
import { zodResolver } from "@hookform/resolvers/zod";

type ResendCode = z.infer<typeof ResendOtpSchema>;
const ResendCodeForm = () => {
  const { mutate: resendOtp, isPending } = useResendOTP();
  const { setEmail } = useSignUpEmail();
  const form = useForm<ResendCode>({
    mode: "all",
    resolver: zodResolver(ResendOtpSchema),
  });

  return (
    <Form {...form}>
      <form
        className="space-y-3 max-w-lg w-full"
        onSubmit={form.handleSubmit((data) =>
          resendOtp({
            ...data,
            action: "SIGNUP_EMAIL_VERIFICATION",
          }),
        )}
      >
        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                className={cn(`text-muted-200`, {
                  "text-destructive": fieldState?.invalid,
                })}
              >
                Email
              </FormLabel>
              <FormControl>
                <Input
                  onChange={(e) => {
                    setEmail(e.target.value);
                    field.onChange(e);
                  }}
                  className={cn(
                    `w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-300`,
                    {
                      "border-destructive focus-visible:ring-transparent":
                        fieldState?.invalid,
                    },
                  )}
                  placeholder="Enter your email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton
          isPending={isPending}
          loadingLabel={<Spinner className="border-white" />}
          className="bg-primary-100 hover:bg-primary-100/90 transition-colors duration-300"
          label="Resend Code"
        />
      </form>
    </Form>
  );
};

export default ResendCodeForm;
