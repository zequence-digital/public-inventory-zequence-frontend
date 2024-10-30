"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DotsVerticalIcon } from "@radix-ui/react-icons";

type Props = {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const UserMenuAccountAction = ({ className, ...rest }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DotsVerticalIcon className="size-5 text-slate-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent {...rest}>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
