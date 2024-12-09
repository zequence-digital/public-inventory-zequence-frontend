"use client";

import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useAssignInvitedUserRole,
  useRemoveInvitedUser,
} from "@/queries/settings/user-and-role";

import { Spinner } from "@/components/spinner";
import { cn } from "@/lib/utils";

type Props = {
  roleName: string;
  emailAddress: string;
};

export function InvitedUserDropdown({ roleName, emailAddress }: Props) {
  const { mutate: changeRole, isPending } = useAssignInvitedUserRole();
  const { mutate: removeInvitedUser, isPending: pendingInvitedUser } =
    useRemoveInvitedUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 bg-muted-950 rounded-full text-xs px-2 py-1 ">
        <span>{roleName}</span>
        <ChevronDownIcon className=" inline-block font-semibold text-black" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" py-4">
        <DropdownMenuItem
          className={cn(`flex items-start cursor-pointer justify-between`, {
            "bg-gray-100": roleName === "ADMIN",
          })}
          onClick={() => changeRole({ emailAddress, roleName: "ADMIN" })}
        >
          {roleName === "ADMIN" && <CheckIcon className=" w-10" />}
          <span
            className={cn(`flex items-start flex-col w-full gap-1`, {
              "ml-8": roleName !== "ADMIN",
            })}
          >
            <span className="text-slate-700 text-sm font-medium  leading-[15px]">
              Admin
            </span>
            <span className="text-slate-500 text-xs font-normal leading-[14px]">
              Unrestricted to all activities
            </span>
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => changeRole({ emailAddress, roleName: "STAFF" })}
          className={cn(`flex items-start cursor-pointer justify-between`, {
            "bg-gray-100": roleName === "STAFF",
          })}
        >
          {roleName === "STAFF" && <CheckIcon className="w-10" />}
          <span
            className={cn(`flex items-start flex-col w-full gap-1`, {
              "ml-8": roleName !== "STAFF",
            })}
          >
            <span className="text-slate-700 text-sm font-medium leading-[15px]">
              Staff
            </span>
            <span className="text-slate-500 text-xs font-normal leading-[14px]">
              Access to all modules except reports and settings
            </span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => changeRole({ emailAddress, roleName: "CASHIER" })}
          className={cn(`flex items-start cursor-pointer justify-between`, {
            "bg-gray-100": roleName === "CASHIER",
          })}
        >
          {roleName === "CASHIER" && <CheckIcon className="w-10" />}
          <span
            className={cn(`flex items-start flex-col w-full gap-1`, {
              "ml-8": roleName !== "CASHIER",
            })}
          >
            <span className="text-slate-700 text-sm font-medium leading-[15px]">
              Cashier
            </span>
            <span className="text-slate-500 text-xs font-normal leading-[14px]">
              Access to reports only
            </span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <button
          onClick={() => removeInvitedUser(emailAddress)}
          className="text-slate-700 text-sm ml-10 pt-3 cursor-pointer  font-medium leading-[15px]"
        >
          {pendingInvitedUser ? <Spinner /> : " Remove user"}
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
