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
import {
  useResetPassword,
  useSendEmailOptForResetPassword,
} from "@/services/auth";
import { useReducer, useRef, useState } from "react";

import { CardWrapper } from "@/components/auth/card-wrapper";
import SubmitButton from "@/components/form/components/submit-button";
import { Input } from "@/components/ui/input";
import usePasswordPolicy from "@/hooks/password-policy";
import { cn } from "@/lib/utils";
import { ResetEmailPasswordSchema } from "@/schemas/reset-email-password-schema";
import { ResetPasswordSchema } from "@/schemas/reset-password";
import { useSignUpEmail } from "@/store/use-sign-up-email";
import { PasswordPolicyRule } from "@/types/password-policy";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Spinner } from "../spinner";
import { Label } from "../ui/label";
import { InputField } from "./components/input-field";
import PasswordPolicyMessage from "./components/password-policy-message";

type SendEmailSignUp = z.infer<typeof ResetEmailPasswordSchema>;
type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;
const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useReducer((state) => !state, false);
  const [showConfirmPassword, setShowConfirmPassword] = useReducer(
    (state) => !state,
    false,
  );
  const sendEmailFormRef = useRef<HTMLFormElement | null>(null);
  const [showPasswordResetForm, setShowPasswordResetForm] = useState(false);
  const {
    password,
    confirmPassword,
    onPasswordChange,
    onPasswordMustMatch,
    passwordPolicy,
  } = usePasswordPolicy();

  const { email, setEmail } = useSignUpEmail();
  const { mutate: sendEmail, isPending } = useSendEmailOptForResetPassword(
    sendEmailFormRef,
    setShowPasswordResetForm,
  );
  const { mutate: resetPassword, isPending: pendingResetPassword } =
    useResetPassword();

  const resetPasswordForm = useForm<ResetPasswordData>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "all",
  });

  const sendEmailForm = useForm<SendEmailSignUp>({
    mode: "all",
    resolver: zodResolver(ResetEmailPasswordSchema),
  });

  return (
    <CardWrapper
      className="max-w-lg w-full"
      logo={Logo}
      message="Reset Password"
      headerLabel="Reset your password to access the Inventory Management System."
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
      actionLabel="Login"
    >
      {showPasswordResetForm ? (
        <div>
          <Form {...resetPasswordForm}>
            <form
              onSubmit={resetPasswordForm.handleSubmit((data) =>
                resetPassword({
                  verificationCode: data.verificationCode,
                  emailAddress: email,
                  newPassword: data.newPassword,
                }),
              )}
              className="space-y-3"
            >
              <div>
                <Label className="text-muted-200">Email</Label>
                <Input
                  readOnly
                  value={email}
                  className={cn(
                    `w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-300`,
                  )}
                  placeholder="Enter your email"
                />
              </div>
              <FormField
                control={resetPasswordForm.control}
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
                      <InputField
                        className="h-9"
                        type="text"
                        name="verificationCode"
                        id="verificationCode"
                        onChange={field.onChange}
                        placeholder="Enter the verification code"
                        disabled={pendingResetPassword}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="relative">
                <FormField
                  control={resetPasswordForm.control}
                  name="newPassword"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel
                        className={cn(`text-muted-200`, {
                          "text-destructive": fieldState?.invalid,
                        })}
                      >
                        New Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={password}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>,
                          ) => {
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
                  control={resetPasswordForm.control}
                  name="confirmNewPassword"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel
                        className={cn(`text-muted-200`, {
                          "text-destructive": fieldState?.invalid,
                        })}
                      >
                        Confirm New Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          defaultValue={confirmPassword}
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement>,
                          ) => {
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
                isPending={pendingResetPassword}
                className="bg-primary-100 hover:bg-primary-100/90 transition-colors duration-300"
                label="Reset Password"
              />
            </form>
          </Form>
        </div>
      ) : (
        <div>
          <Form {...sendEmailForm}>
            <form
              ref={sendEmailFormRef}
              onSubmit={sendEmailForm.handleSubmit((data) =>
                sendEmail({
                  emailAddress: data.emailAddress,
                  otpType: "FORGOT_PASSWORD",
                }),
              )}
              className="space-y-3"
            >
              <FormField
                control={sendEmailForm.control}
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
                      <InputField
                        onChange={(e) => {
                          setEmail(e.target.value);
                          field.onChange(e);
                        }}
                        className={cn(`h-9`, {
                          "border-destructive focus-visible:ring-transparent":
                            fieldState?.invalid,
                        })}
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        disabled={isPending}
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
                label="Verify Email"
              />
            </form>
          </Form>
        </div>
      )}
    </CardWrapper>
  );
};

export default ResetPasswordForm;
