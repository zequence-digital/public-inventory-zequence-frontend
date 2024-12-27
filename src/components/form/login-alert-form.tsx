"use client";

import * as z from "zod";

import { EyeClose, EyeOpen } from "@/assets";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Spinner } from "../spinner";
import SubmitButton from "./components/submit-button";
import { cn } from "@/lib/utils";
import { loginSchema } from "@/schemas/login";
import { useActiveUser } from "@/crypto";
import { useForm } from "react-hook-form";
import { useLogin } from "@/services/auth";
import { usePathname } from "next/navigation";
import { useReducer } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

type LoginSchema = z.infer<typeof loginSchema>;
export function LoginAlertForm() {
  const [showPassword, setShowPassword] = useReducer((state) => !state, false);
  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema.omit({ queryParam: true })),
    mode: "all",
  });
  const user = useActiveUser();
  const pathname = usePathname();

  const { mutate: login, isPending } = useLogin(pathname, ".alert-form");
  return (
    <div className="alert-form hidden" role="alert">
      {/* Overlay */}
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/80 z-[1000]" />
      <div className="absolute top-0 p-4 h-fit bg-white rounded-md left-0 right-0 bottom-0 z-[2000] flex items-center max-w-2xl mx-auto justify-center mt-auto mb-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) =>
              login({
                ...data,
                queryParam: user?.data?.username as string,
              }),
            )}
            className="space-y-3 w-full"
          >
            <h1 className="text-2xl font-semibold text-destructive text-center">
              Session Expired🕒
            </h1>
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
                      readOnly
                      value={user?.data?.username}
                      className={cn(
                        `w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-300`,
                        {
                          "border-destructive focus-visible:ring-transparent":
                            fieldState?.invalid,
                        },
                      )}
                      placeholder="Enter your email or Username"
                      onChange={field.onChange}
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
              label="Login"
            />
          </form>
        </Form>
      </div>
    </div>
  );
}
