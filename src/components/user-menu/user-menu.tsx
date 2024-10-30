"use client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { CaretSortIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { UserMenuRadioForm } from "./user-menu-radio-input";
import { formatName } from "@/lib/utils";
import { logOut } from "@/services/auth";
import { useCurrentUser } from "@/hooks/use-current-user";

export const UserMenu = () => {
  const user = useCurrentUser();
  return (
    <Popover>
      <PopoverTrigger className="my-6 md:mt-0">
        <div className="flex items-center gap-2">
          <div className="relative shrink-0 [&_span]:rounded-lg ">
            <Avatar>
              <AvatarImage
                src={user?.data.businessProfile.companyLogo}
                alt="avatar"
              />
              <AvatarFallback></AvatarFallback>
            </Avatar>
          </div>
          <p className="text-slate-700 text-base font-semibold">
            {formatName(user?.data.fullName ?? "")}
          </p>
          <CaretSortIcon className="size-4 stroke-slate-700" />
        </div>
      </PopoverTrigger>
      <PopoverContent className=" w-64">
        <div className=" space-y-8 ">
          <div className="text-slate-700 text-sm font-semibold ">
            My Organizations
          </div>
          <UserMenuRadioForm />
          <div className="h-7 pr-2 py-1 rounded cursor-pointer justify-center items-center gap-2 inline-flex">
            <Image
              src="/images/plus.svg"
              width={16}
              height={16}
              alt="Add Icon"
            />
            <div className="text-slate-700 text-sm font-normal  leading-tight">
              New organization
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
  );
};
