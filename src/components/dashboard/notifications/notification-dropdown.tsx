"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { useState } from "react";

export function NotificationDropdown() {
  const [notification, setNotification] = useState<"UNREAD" | "READ" | "ALL">(
    "ALL",
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3  rounded-full text-2xl px-2 py-1 ">
        <span>
          {notification === "UNREAD"
            ? "Unread"
            : notification === "READ"
              ? "Read"
              : "All"}
        </span>
        <ChevronDownIcon className=" inline-block font-semibold text-black" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" py-4">
        <DropdownMenuItem
          className={cn(`flex items-center gap-2 py-3 justify-between`, {
            "bg-gray-100": notification === "ALL",
          })}
          onClick={() => setNotification("ALL")}
        >
          <span className="text-slate-700 text-sm font-medium  leading-[15px]">
            Show all notifications
          </span>
          {notification === "ALL" && (
            <CheckIcon className="text-blue-600 size-6" />
          )}
        </DropdownMenuItem>
        {/* Show unread notifications */}
        <DropdownMenuItem
          onClick={() => setNotification("UNREAD")}
          className="flex items-center gap-2 py-3 justify-between"
        >
          <span className="text-slate-700 text-sm font-medium  leading-[15px]">
            Show unread notifications
          </span>
          {notification === "UNREAD" && (
            <CheckIcon className="text-blue-600 size-6" />
          )}
        </DropdownMenuItem>
        {/* Show read notifications */}
        <DropdownMenuItem
          onClick={() => setNotification("READ")}
          className="flex items-center gap-2 py-3 justify-between"
        >
          <span className="text-slate-700 text-sm font-medium  leading-[15px]">
            Show read notifications
          </span>
          {notification === "READ" && (
            <CheckIcon className="text-blue-600 size-6" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
