"use client";

import { Logo } from "@/assets";
import { CardWrapper } from "@/components/auth/card-wrapper";
import OrDivider from "@/components/form/components/or-divider";
import SubmitButton from "@/components/form/components/submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useGoogleRedirect } from "@/hooks/use-google-redirect";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { cn } from "@/lib/utils";
import { SignUpSchema } from "@/schemas/sign-up";
import { useGoogleSignUp, useSignUp } from "@/services/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Spinner } from "../spinner";

type SignUp = z.infer<typeof SignUpSchema>;

export const SignUpForm = () => {
  const { pathname } = useGoogleRedirect("/auth/complete-registration");
  const form = useForm<SignUp>({
    mode: "all",
    resolver: zodResolver(SignUpSchema),
  });

  const { mutate: signUp, isPending } = useSignUp();
  const { mutate: googleSignUp, isPending: isGooglePending } =
    useGoogleSignUp();
  const [, setEmail] = useLocalStorage("email", "");

  return (
    <CardWrapper
      className="max-w-lg w-full"
      actionLabel="Sign in"
      logo={Logo}
      socialActionFn={() =>
        googleSignUp({ profileRegistrationUrl: pathname ?? "" })
      }
      isSocialPending={isGooglePending}
      message="Create an account"
      showSocial
      socialLabel="Sign up with Google"
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
