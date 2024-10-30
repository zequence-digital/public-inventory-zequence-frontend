"use client";

import "react-phone-input-2/lib/style.css";

import { DragAndDrop, FileUpload, UserAvatar } from "@/assets";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useFileUpload, useFileUploadState } from "@/services/file-upload";
import { useCallback, useState } from "react";
import { UserRole, UserType } from "./components/select-field";

import { Logo } from "@/assets";
import { CardWrapper } from "@/components/auth/card-wrapper";
import SubmitButton from "@/components/form/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useBranches } from "@/queries/stocks";
import { completeSignUpSchema } from "@/schemas/complete-registration";
import { useCompleteRegistration } from "@/services/auth";
import { useSignUpEmail } from "@/store/use-sign-up-email";
import type { CompleteSignUp } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { ApiErrorMessage } from "../messages/api-error-message";
import { Spinner } from "../spinner";

export const CompleteSignUpForm = () => {
  const [selectedImage, setSelectedImage] = useState<File | undefined>();
  const [state, setState] = useState("");

  const { mutate: uploadFile, isPending: pendingFileUpload } = useFileUpload(
    selectedImage as File,
  );

  const { email } = useSignUpEmail();

  const form = useForm<CompleteSignUp>({
    resolver: zodResolver(completeSignUpSchema.omit({ emailAddress: true })),
    mode: "all",
  });

  const { data: states, isPending, isError, error, isPaused } = useAllStates();

  const { mutate: complete, isPending: pendingComplete } =
    useCompleteRegistration();

  const {
    data: countries,
    isError: isErrorCountries,
    error: errorCountries,
    isPending: isPendingCountries,
    isPaused: isPausedCountries,
  } = useCountries();

  const {
    data: branches,
    isPending: pendingBranch,
    isError: isErrorBranch,
    error: errorBranch,
  } = useBranches();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setSelectedImage(acceptedFiles?.[0] || undefined);
      uploadFile(acceptedFiles?.[0] as File);
    },
    [uploadFile],
  );

  const {
    data: lgas,
    isPending: isPendingLga,
    isError: isErrorLga,
    error: errorLga,
    isPaused: isPausedLga,
  } = useAllStatesLga(state);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const data = useFileUploadState();

  const companyUploadUrl = data[0]?.data?.data;

  function onStateChange(value: string) {
    setState(value);
  }

  return (
    <CardWrapper
      className="max-w-[802px] w-full"
      logo={Logo}
      message="Account created successfully!"
      headerLabel="Let’s proceed to set up your profile"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            complete({
              fullName: data.fullName,
              emailAddress: email,
              mobileNumber: data.mobileNumber,
              countryId: data.countryId,
              state: data.state,
              userType: data.userType,
              branchId: Number(data.branchId),
              lga: data.lga,
              businessProfileRequest: {
                companyLogoUrl: companyUploadUrl,
                companyName: data.companyName,
                businessUserRole: data.businessUserRole,
              },
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
                        value={email}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        onStateChange(state);
                      }}
                      defaultValue={state}
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
                      State
                    </FormLabel>
                    <Select
                      onValueChange={(state) => {
                        field.onChange(state);
                        onStateChange(state);
                      }}
                      defaultValue={state}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(``, {
                            " animate-pulse cursor-not-allowed bg-slate-400":
                              isPending,
                          })}
                        >
                          <SelectValue placeholder="Enter a State" />
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
                      LGA
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger
                          className={cn(``, {
                            " animate-pulse cursor-not-allowed bg-slate-400":
                              isPendingLga,
                          })}
                        >
                          <SelectValue placeholder="Enter a LGA" />
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
              {/* Branch */}

              <FormField
                control={form.control}
                name="branchId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Branch</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger
                          className={cn(
                            `w-full px-4  text-sm bg-white border border-muted-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`,
                            {
                              "animate-pulse bg-gray-300": pendingBranch,
                            },
                          )}
                        >
                          <SelectValue placeholder="Select a Branch" />
                        </SelectTrigger>
                        <SelectContent>
                          {branches?.data?.map((item) => (
                            <SelectItem
                              id={item.name}
                              key={item.id}
                              value={item.id.toString()}
                            >
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>

                    {isErrorBranch && (
                      <FormMessage>{errorBranch?.message}</FormMessage>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-3">
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

              {/* companyName */}
              <FormField
                control={form.control}
                name="companyName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={cn(`text-muted-200`, {
                        "text-destructive": fieldState?.invalid,
                      })}
                    >
                      Company Name
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
                        placeholder="Enter your company name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* User Type */}
              <FormField
                control={form.control}
                name="userType"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="userRole"
                      className={cn(`text-muted-200`, {
                        "text-destructive": fieldState?.invalid,
                      })}
                    >
                      User Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select User Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {UserType.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* User's Role */}
              <FormField
                control={form.control}
                name="businessUserRole"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="userRole"
                      className={cn(`text-muted-200`, {
                        "text-destructive": fieldState?.invalid,
                      })}
                    >
                      User&apos;s role
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select User Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {UserRole.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* logoImage */}
              <FormField
                control={form.control}
                name="companyLogoUrl"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel
                      className={cn(`text-muted-200`, {
                        "text-destructive": fieldState?.invalid,
                      })}
                    >
                      {pendingFileUpload ? "Uploading..." : "Company's Logo"}
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
                                      e.target.files?.[0] ?? undefined,
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
            isPending={pendingComplete}
            loadingLabel={<Spinner className=" border-white" />}
            className={cn(
              `bg-primary-100 hover:bg-primary-100/90 w-fit transition-colors duration-300`,
              {
                "cursor-not-allowed": pendingComplete || pendingFileUpload,
              },
            )}
            label="Proceed to Dashboard"
          />
        </form>
      </Form>
    </CardWrapper>
  );
};
