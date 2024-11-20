"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { GetAllOrganizationBranch } from "@/types";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

type Props = {
  className?: string;
  open: boolean;
  openDelete: boolean;
  onOpenDeleteChange: (open: boolean) => void;
  setOpen: (open: boolean) => void;
  activeBranch: GetAllOrganizationBranch["data"][number] | undefined;
  setActiveBranch: (
    activeBranch: GetAllOrganizationBranch["data"][number] | undefined,
  ) => void;
} & React.HTMLAttributes<HTMLDivElement>;

export const UserMenuAccountAction = ({
  className,
  open,
  setOpen,
  activeBranch,
  setActiveBranch,
  openDelete,
  onOpenDeleteChange,
  ...rest
}: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <DotsVerticalIcon className="size-5 text-slate-500" />
      </DropdownMenuTrigger>
      <DropdownMenuContent {...rest}>
        <DropdownMenuItem
          onClick={() => {
            setOpen(true);
            setActiveBranch(activeBranch);
          }}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            onOpenDeleteChange(true);
            setActiveBranch(activeBranch);
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
