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
import { useEffect, useReducer } from "react";

import { EmailMessageNotice } from "./components/email-message-notice";
import { Input } from "@/components/ui/input";
import ResendCodeOrChangeAccount from "./components/resend-code-or-change-account";
import { Spinner } from "../spinner";
import SubmitButton from "@/components/form/components/submit-button";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useVerifyOTP } from "@/services/auth";
import { verificationCodeSchema } from "@/schemas/verification-code";
import { zodResolver } from "@hookform/resolvers/zod";

type VerificationCode = z.infer<typeof verificationCodeSchema>;
const VerifyCodeForm = () => {
  const [countDown, setCountDown] = useReducer((state) => state - 1, 60);
  const { mutate: verifyOtp, isPending } = useVerifyOTP();
  const [email] = useLocalStorage("email", "");

  useEffect(() => {
    const interval = setInterval(() => {
      if (countDown > 0) {
        setCountDown();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);

  const form = useForm<VerificationCode>({
    mode: "all",
    resolver: zodResolver(verificationCodeSchema.omit({ emailAddress: true })),
  });

  return (
    <Form {...form}>
      <form
        className="space-y-3 max-w-lg w-full"
        onSubmit={form.handleSubmit((data) =>
          verifyOtp({
            ...data,
            emailAddress: email,
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
                  {...field}
                  value={email}
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
        <EmailMessageNotice />
        <FormField
          control={form.control}
          name="verificationCode"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                className={cn(`text-muted-200`, {
                  "text-destructive": fieldState?.invalid,
                })}
              >
                Verification Code
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={cn(
                    `w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-300`,
                    {
                      "border-destructive focus-visible:ring-transparent":
                        fieldState?.invalid,
                    },
                  )}
                  placeholder="Enter the verification code"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {countDown <= 0 ? (
          <ResendCodeOrChangeAccount />
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-200">
              Resend code in {countDown} seconds
            </span>
          </div>
        )}
        <SubmitButton
          isPending={isPending}
          loadingLabel={<Spinner className=" border-white" />}
          className="bg-primary-100 hover:bg-primary-100/90 transition-colors duration-300"
          label="Continue"
        />
      </form>
    </Form>
  );
};

export default VerifyCodeForm;
