"use client";

import "react-phone-input-2/lib/style.css";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DragAndDrop,
  EyeClose,
  EyeOpen,
  FileUpload,
  UserAvatar,
} from "@/assets";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAllStates, useAllStatesLga, useCountries } from "@/queries/state";
import { useReducer, useState } from "react";

import { ApiErrorMessage } from "../messages/api-error-message";
import { CardWrapper } from "@/components/auth/card-wrapper";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/assets";
import { NewInvitee } from "@/types";
import { NewInviteeSchema } from "@/schemas/new-invitee-schema";
import PasswordPolicyMessage from "./components/password-policy-message";
import { PasswordPolicyRule } from "@/types/password-policy";
import PhoneInput from "react-phone-input-2";
import { Spinner } from "../spinner";
import SubmitButton from "@/components/form/components/submit-button";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useImageUpload } from "@/hooks/use-image-upload";
import { useInviteeSignUp } from "@/services/auth";
import usePasswordPolicy from "@/hooks/password-policy";
import { zodResolver } from "@hookform/resolvers/zod";

export const NewInviteeSignUpForm = () => {
  const [countryCode, setCountryCode] = useState("");
  const [state, setState] = useState("");
  const [showPassword, setShowPassword] = useReducer((state) => !state, false);
  const [showConfirmPassword, setShowConfirmPassword] = useReducer(
    (state) => !state,
    false,
  );

  const {
    selectedImage,
    setSelectedImage,
    companyUploadUrl,
    pendingFileUpload,
    isDragActive,
    getRootProps,
    getInputProps,
    uploadFile,
  } = useImageUpload();

  const {
    password,
    confirmPassword,
    onPasswordChange,
    onPasswordMustMatch,
    passwordPolicy,
  } = usePasswordPolicy();

  const {
    data: states,
    isPending,
    isError,
    error,
    isPaused,
  } = useAllStates(countryCode);

  const {
    data: countries,
    isError: isErrorCountries,
    error: errorCountries,
    isPending: isPendingCountries,
    isPaused: isPausedCountries,
  } = useCountries();

  const {
    data: lgas,
    isPending: isPendingLga,
    isError: isErrorLga,
    error: errorLga,
    isPaused: isPausedLga,
  } = useAllStatesLga(countryCode, state);

  const { mutate: invite, isPending: pendingInvite } = useInviteeSignUp();

  const form = useForm<NewInvitee>({
    resolver: zodResolver(NewInviteeSchema),
    mode: "all",
  });

  return (
    <CardWrapper
      className="max-w-[802px] w-full"
      logo={Logo}
      message="Create an account"
      headerLabel="Set up your account to accept your invitation"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            invite({
              ...data,
              imageLink: companyUploadUrl,
            }),
          )}
          className={cn(`
					  flex flex-col space-y-6 w-full items-center
					  `)}
        >
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-3">
              {/* Email */}
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
                        className={cn(
                          `w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-300`,
                          {
                            "border-destructive focus-visible:ring-transparent":
                              fieldState?.invalid,
                          },
                        )}
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* User Name */}
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
                        className={cn(
                          `w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-300`,
                          {
                            "border-destructive focus-visible:ring-transparent":
                              fieldState?.invalid,
                          },
                        )}
                        placeholder="Enter your username"
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
            </div>
            <div className="space-y-3">
              {/* fullName */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={cn(`text-muted-200`, {
                        "text-destructive": fieldState?.invalid,
                      })}
                    >
                      Full Name
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
                        placeholder="Enter your full name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Country */}

              <FormField
                control={form.control}
                name="countryId"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="country"
                      className={cn(`text-muted-200 -mb-2`, {
                        "text-destructive": fieldState?.invalid,
                      })}
                    >
                      Country
                    </FormLabel>
                    <Select
                      onValueChange={(state) => {
                        field.onChange(state);
                        const country = countries?.data?.find(
                          (c) => c.id === Number(state),
                        );
                        if (country) {
                          setCountryCode(country.code);
                        }
                      }}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(``, {
                            " animate-pulse cursor-not-allowed bg-slate-400":
                              isPendingCountries,
                          })}
                        >
                          <SelectValue placeholder="Select a Country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {countries?.data?.map((country) => (
                          <SelectItem
                            key={country.name}
                            value={country.id.toString()}
                          >
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {isErrorCountries && (
                      <ApiErrorMessage message={errorCountries?.message} />
                    )}
                    {isPausedCountries && (
                      <ApiErrorMessage message="Check your network and try again" />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* state */}

              <FormField
                control={form.control}
                name="state"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={cn(`text-muted-200 -mb-2`, {
                        "text-destructive": fieldState?.invalid,
                      })}
                    >
                      State/Province
                    </FormLabel>
                    <Select
                      onValueChange={(state) => {
                        field.onChange(state);
                        const currentState = states?.data?.find(
                          (s) => s.slug === state,
                        );
                        if (currentState) {
                          setState(currentState.slug);
                        }
                      }}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(``, {
                            " animate-pulse cursor-not-allowed bg-slate-400":
                              isPending,
                          })}
                        >
                          <SelectValue placeholder="Enter a State/Province" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {states?.data
                          ?.sort((a, b) => a.slug.localeCompare(b.slug))
                          .map((state) => (
                            <SelectItem key={state.name} value={state.slug}>
                              {state.slug}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    {isError && <ApiErrorMessage message={error?.message} />}
                    {isPaused && (
                      <ApiErrorMessage message="Check your network and try again" />
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* city with local government area as options */}

              {countryCode === "NG" && (
                <FormField
                  control={form.control}
                  name="lga"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel
                        htmlFor="lga"
                        className={cn(`text-muted-200 -mb-2`, {
                          "text-destructive": fieldState?.invalid,
                        })}
                      >
                        LGA/City
                      </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger
                            className={cn(``, {
                              " animate-pulse cursor-not-allowed bg-slate-400":
                                isPendingLga,
                            })}
                          >
                            <SelectValue placeholder="Enter a LGA/City" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {lgas?.data?.map((lga) => (
                            <SelectItem key={lga} value={lga}>
                              {lga}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {isErrorLga && (
                        <ApiErrorMessage
                          className="text-destructive"
                          message={errorLga?.message}
                        />
                      )}
                      {isPausedLga && (
                        <ApiErrorMessage message="Check your network and try again" />
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {/* phoneNumber */}

              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={cn(`text-muted-200`, {
                        "text-destructive": fieldState?.invalid,
                      })}
                    >
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <PhoneInput
                        inputStyle={{
                          width: "100%",
                          border: "1px solid #d3d3d3",
                          borderRadius: "5px",
                        }}
                        inputProps={{
                          name: "phoneNumber",
                          autoComplete: "phone number",
                          placeholder: "+234 (123) 456-7890",
                        }}
                        country={"NG"}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* logoImage */}
              <FormField
                control={form.control}
                name="imageLink"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={cn(`text-muted-200`, {
                        "text-destructive": fieldState?.invalid,
                      })}
                    >
                      {pendingFileUpload ? "Uploading..." : "Image"}
                    </FormLabel>
                    <FormControl>
                      <div {...getRootProps()}>
                        <div className="space-y-1">
                          <Label
                            htmlFor="logoImage"
                            className="flex items-center gap-2"
                          >
                            <div>
                              <Avatar className="size-20 shrink-0">
                                <AvatarImage
                                  className="shrink-0"
                                  src={
                                    pendingFileUpload
                                      ? "Wait while we upload your logo"
                                      : selectedImage
                                        ? URL.createObjectURL(selectedImage)
                                        : ""
                                  }
                                />
                                <AvatarFallback>
                                  <Image src={UserAvatar} alt="User Avatar" />
                                </AvatarFallback>
                              </Avatar>
                            </div>
                            {isDragActive ? (
                              "Drag and Drop"
                            ) : (
                              <>
                                <div className="flex">
                                  <Image
                                    src={DragAndDrop}
                                    alt="Drag and drop"
                                  />
                                  <Image src={FileUpload} alt="File upload" />
                                </div>
                                <input
                                  type="file"
                                  className="hidden"
                                  accept="image/*"
                                  {...getInputProps()}
                                  onChange={(e) => {
                                    field.onChange(e.target.files);
                                    setSelectedImage(
                                      e.target.files?.[0] ?? null,
                                    );
                                    uploadFile(selectedImage as File);
                                  }}
                                />
                              </>
                            )}
                          </Label>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <SubmitButton
            isPending={pendingInvite}
            loadingLabel={<Spinner className=" border-white" />}
            className={cn(
              `bg-primary-100 hover:bg-primary-100/90 w-fit transition-colors duration-300`,
              {
                "cursor-not-allowed": pendingInvite || pendingFileUpload,
              },
            )}
            label="Create new account"
          />
        </form>
      </Form>
    </CardWrapper>
  );
};
