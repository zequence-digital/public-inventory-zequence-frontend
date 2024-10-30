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

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Input } from "@/components/ui/input";
import { Logo } from "@/assets";
import OrDivider from "@/components/form/components/or-divider";
import { SignUpSchema } from "@/schemas/sign-up";
import { Spinner } from "../spinner";
import SubmitButton from "@/components/form/components/submit-button";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useSignUp } from "@/services/auth";
import { useSignUpEmail } from "@/store/use-sign-up-email";
import { zodResolver } from "@hookform/resolvers/zod";

type SignUp = z.infer<typeof SignUpSchema>;

export const SignUpForm = () => {
  const form = useForm<SignUp>({
    mode: "all",
    resolver: zodResolver(SignUpSchema),
  });

  const { mutate: signUp, isPending } = useSignUp();
  const { setEmail } = useSignUpEmail();

  return (
    <CardWrapper
      className="max-w-lg w-full"
      actionLabel="Sign in"
      logo={Logo}
      message="Create an account"
      showSocial
      headerLabel="Set up your account easily"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account?"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => signUp(data))}
          className="space-y-3"
        >
          <FormField
            control={form.control}
            name="email"
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
            loadingLabel={<Spinner className=" border-white" />}
            isPending={isPending}
            className="bg-primary-100 hover:bg-primary-100/90 transition-colors duration-300"
            label="Continue with email"
          />
        </form>
      </Form>
      <OrDivider />
    </CardWrapper>
  );
};
