"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { ApiErrorMessage } from "../messages/api-error-message";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CreateBranchModalForm } from "../branches/form/create-branche-form";
import Image from "next/image";
import SvgAdd from "../svg/svg-add";
import { UserMenuRadioForm } from "./user-menu-radio-input";
import { formatName } from "@/lib/utils";
import { logOut } from "@/services/auth";
import { useBranches } from "@/queries/branches";
import { useLoggedInUser } from "@/crypto";
import { useState } from "react";

export const UserMenu = () => {
  const user = useLoggedInUser();
  const [open, onOpenChange] = useState(false);
  const { data: branches, isPending, isError, error } = useBranches();
  return (
    <>
      <CreateBranchModalForm open={open} onOpenChange={onOpenChange} />
      <Popover>
        <PopoverTrigger className="my-6 pl-4 md:pl-2 md:mt-0">
          <div className="flex items-center gap-2">
            <div className="relative shrink-0 [&_span]:rounded-lg ">
              <Avatar>
                <AvatarImage
                  src={user?.data?.businessProfile?.companyLogo}
                  alt="avatar"
                />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </div>
            <p className="text-slate-700 text-base font-semibold">
              {user?.data && formatName(user?.data?.fullName)}
            </p>
            <CaretSortIcon className="size-4 stroke-slate-700" />
          </div>
        </PopoverTrigger>
        <PopoverContent className=" w-64">
          <div className=" space-y-8 ">
            <div className="text-slate-700 text-sm font-semibold ">
              My Branches
            </div>
            {isError && <ApiErrorMessage message={error.message} />}
            {isPending && (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="w-full">
                    <div className="animate-pulse bg-muted-300 h-7 rounded" />
                  </div>
                ))}
              </div>
            )}
            {branches?.data?.length === 0 && (
              <div className="text-slate-500 text-sm font-normal">
                You have no branches yet.
              </div>
            )}
            {branches?.data
              ?.sort((a, b) => a.name.localeCompare(b.name))
              .map((branch) => (
                <UserMenuRadioForm key={branch.id} branch={branch} />
              ))}
            <div
              className="h-7 pr-2 py-1 rounded cursor-pointer justify-center items-center gap-2 inline-flex"
              onClick={() => onOpenChange(true)}
            >
              <SvgAdd className=" stroke-muted-200" />
              <div className="text-slate-700 text-sm font-normal  leading-tight">
                Create new branch
              </div>
            </div>
            <div>
              <button
                onClick={logOut}
                className="text-red-500 text-sm font-normal leading-tight flex items-center gap-2"
              >
                <Image
                  src="/images/logout.svg"
                  width={16}
                  height={16}
                  alt="Exit Icon"
                />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};
