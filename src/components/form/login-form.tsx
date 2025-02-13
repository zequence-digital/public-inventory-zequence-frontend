"use client";

import { EyeClose, EyeOpen, Logo } from "@/assets";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { loginSchema } from "@/schemas/login";
import { useLogin } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useReducer } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { CardWrapper } from "../auth/card-wrapper";
import { Spinner } from "../spinner";
import OrDivider from "./components/or-divider";
import SubmitButton from "./components/submit-button";

type LoginSchema = z.infer<typeof loginSchema>;
const LoginForm = () => {
  const [showPassword, setShowPassword] = useReducer((state) => !state, false);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "all",
  });

  const { mutate: login, isPending } = useLogin();
  return (
    <CardWrapper
      className="max-w-lg w-full"
      actionLabel="Sign up"
      logo={Logo}
      message="Log in to your account"
      showSocial
      isGoogleLogin
      headerLabel="Welcome back! please enter your details."
      backButtonHref="/auth/sign-up"
      backButtonLabel="Don't have an account?"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => login(data))}
          className="space-y-3"
        >
          <FormField
            control={form.control}
            name="queryParam"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel
                  className={cn(`text-muted-200`, {
                    "text-destructive": fieldState?.invalid,
                  })}
                >
                  Email or Username
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn(
                      `w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-300`,
                      {
                        "border-destructive focus-visible:ring-transparent":
                          fieldState?.invalid,
                      },
                    )}
                    placeholder="Enter your email or Username"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                      className={cn(
                        ` w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-300`,
                        {
                          "border-destructive focus-visible:ring-transparent":
                            fieldState?.invalid,
                        },
                      )}
                      type={showPassword ? "text" : "password"}
                      placeholder="*********"
                      {...field}
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
          <Link
            className=" text-xs border-b border-black hover:border-none transition-colors duration-300 font-semibold my-1 inline-block"
            href="/auth/reset-password"
          >
            Forgot password?
          </Link>
          <SubmitButton
            loadingLabel={<Spinner className=" border-white" />}
            isPending={isPending}
            className="bg-primary-100 hover:bg-primary-100/90 transition-colors duration-300"
            label="Sign in"
          />
          <OrDivider />
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
