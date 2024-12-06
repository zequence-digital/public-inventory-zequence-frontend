"use client";

import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

type Props = {
  readStatus: "READ" | "UNREAD" | "ALL";
  setReadStatus: (readStatus: "READ" | "UNREAD" | "ALL") => void;
};

export function NotificationDropdown({ readStatus, setReadStatus }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3  rounded-full text-2xl px-2 py-1 ">
        <span>
          {readStatus === "UNREAD"
            ? "Unread"
            : readStatus === "READ"
              ? "Read"
              : "All"}
        </span>
        <ChevronDownIcon className=" inline-block font-semibold text-black" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" py-4">
        <DropdownMenuItem
          className={cn(
            `flex items-center cursor-pointer gap-2 py-3 justify-between`,
            {
              "bg-gray-100": readStatus === "ALL",
            },
          )}
          onClick={() => setReadStatus("ALL")}
        >
          <span className="text-slate-700 text-sm font-medium  leading-[15px]">
            Show all notifications
          </span>
          {readStatus === "ALL" && (
            <CheckIcon className="text-blue-600 size-6" />
          )}
        </DropdownMenuItem>
        {/* Show unread notifications */}
        <DropdownMenuItem
          onClick={() => setReadStatus("UNREAD")}
          className="flex items-center cursor-pointer gap-2 py-3 justify-between"
        >
          <span className="text-slate-700 text-sm font-medium  leading-[15px]">
            Show unread notifications
          </span>
          {readStatus === "UNREAD" && (
            <CheckIcon className="text-blue-600 size-6" />
          )}
        </DropdownMenuItem>
        {/* Show read notifications */}
        <DropdownMenuItem
          onClick={() => setReadStatus("READ")}
          className="flex items-center cursor-pointer gap-2 py-3 justify-between"
        >
          <span className="text-slate-700 text-sm font-medium  leading-[15px]">
            Show read notifications
          </span>
          {readStatus === "READ" && (
            <CheckIcon className="text-blue-600 size-6" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
