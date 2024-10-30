"use client";

import * as z from "zod";

import { EyeClose, EyeOpen, Logo } from "@/assets";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { ContinueSignUpSchema } from "@/schemas/continue-sign-up";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "../ui/label";
import OrDivider from "@/components/form/components/or-divider";
import PasswordPolicyMessage from "@/components/form/components/password-policy-message";
import { PasswordPolicyRule } from "@/types/password-policy";
import { Spinner } from "../spinner";
import SubmitButton from "@/components/form/components/submit-button";
import { cn } from "@/lib/utils";
import { useContinueSignUp } from "@/services/auth";
import { useForm } from "react-hook-form";
import usePasswordPolicy from "@/hooks/password-policy";
import { useReducer } from "react";
import { useSignUpEmail } from "@/store/use-sign-up-email";
import { zodResolver } from "@hookform/resolvers/zod";

type ContinueSignUp = z.infer<typeof ContinueSignUpSchema>;

const ContinueSignUpForm = () => {
  const [showPassword, setShowPassword] = useReducer((state) => !state, false);
  const [showConfirmPassword, setShowConfirmPassword] = useReducer(
    (state) => !state,
    false,
  );

  const { email } = useSignUpEmail();

  const form = useForm<ContinueSignUp>({
    mode: "all",
    resolver: zodResolver(ContinueSignUpSchema),
  });

  const {
    password,
    confirmPassword,
    onPasswordChange,
    onPasswordMustMatch,
    passwordPolicy,
  } = usePasswordPolicy();

  const { mutate: signUp, isPending } = useContinueSignUp();

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
          onSubmit={form.handleSubmit((data) =>
            signUp({
              username: data.username,
              emailAddress: email,
              password: data.password,
            }),
          )}
          className="space-y-3"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={cn(`text-muted-200`, {
                    "text-destructive": fieldState?.invalid,
                  })}
                >
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className={cn(
                      ` w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-300`,
                      {
                        "border-destructive focus-visible:ring-transparent":
                          fieldState?.invalid,
                      },
                    )}
                    placeholder="Enter your username"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Label className="text-muted-200">Email</Label>
            <Input
              value={email}
              className={cn(
                `w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-300`,
              )}
              placeholder="Enter your email"
            />
          </div>
          <div className="relative">
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel
                    className={cn(`text-muted-200`, {
                      "text-destructive": fieldState?.invalid,
                    })}
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        field.onChange(e.target.value);
                        onPasswordChange(e);
                      }}
                      className={cn(
                        ` w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-300`,
                        {
                          "border-destructive focus-visible:ring-transparent":
                            fieldState?.invalid,
                        },
                      )}
                      type={showPassword ? "text" : "password"}
                      placeholder="*********"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="button"
              className={cn(
                `absolute top-[2.36rem] right-3 transform  text-gray-400 focus:outline-none`,
              )}
              onClick={setShowPassword}
            >
              {showPassword ? (
                <Image src={EyeClose} alt="eye-close" />
              ) : (
                <Image src={EyeOpen} alt="eye-open" />
              )}
            </button>
          </div>
          <div className="relative">
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel
                    className={cn(`text-muted-200`, {
                      "text-destructive": fieldState?.invalid,
                    })}
                  >
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        field.onChange(e.target.value);
                        onPasswordMustMatch(e);
                      }}
                      className={cn(
                        ` w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-300`,
                        {
                          "border-destructive focus-visible:ring-transparent":
                            fieldState?.invalid,
                        },
                      )}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="*********"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="button"
              className={cn(
                `absolute top-[2.36rem] right-3 transform  text-gray-400 focus:outline-none`,
              )}
              onClick={setShowConfirmPassword}
            >
              {showConfirmPassword ? (
                <Image src={EyeClose} alt="eye-close" />
              ) : (
                <Image src={EyeOpen} alt="eye-open" />
              )}
            </button>
          </div>
          <PasswordPolicyMessage
            passwordPolicy={passwordPolicy as PasswordPolicyRule[]}
          />

          <SubmitButton
            loadingLabel={<Spinner className=" border-white" />}
            isPending={isPending}
            className="bg-primary-100 hover:bg-primary-100/90 transition-colors duration-300"
            label="Create new account"
          />
        </form>
      </Form>
      <OrDivider />
    </CardWrapper>
  );
};

export default ContinueSignUpForm;
