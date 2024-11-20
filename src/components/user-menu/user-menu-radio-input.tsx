"use client";

import type { GetAllOrganizationBranch } from "@/types";
import { useState } from "react";
import { EditBranchModalForm } from "../branches/form/edit-branch-form";
import { DeleteBranch } from "../delete-table-item/delete-branch";
import { UserMenuAccountAction } from "./user-menu-account-action";

type Props = {
  branch: GetAllOrganizationBranch["data"][number] | undefined;
};

export function UserMenuRadioForm({ branch }: Props) {
  const [activeBranch, setActiveBranch] = useState<
    GetAllOrganizationBranch["data"][number] | undefined
  >(branch);
  const [open, onOpenChange] = useState(false);
  const [openDelete, onOpenDeleteChange] = useState(false);
  return (
    <div>
      <EditBranchModalForm
        activeBranch={activeBranch}
        open={open}
        onOpenChange={onOpenChange}
      />
      <DeleteBranch
        open={openDelete}
        onOpenChange={onOpenDeleteChange}
        activeBranch={activeBranch}
      />
      <div>
        <div className="flex items-center whitespace-nowrap">
          <div className="self-stretch text-slate-500 text-xs font-normal">
            {branch?.name}
          </div>
          <div className="cursor-pointer flex ml-auto text-slate-500">
            <UserMenuAccountAction
              openDelete={openDelete}
              onOpenDeleteChange={onOpenDeleteChange}
              activeBranch={activeBranch}
              setActiveBranch={setActiveBranch}
              open={open}
              setOpen={onOpenChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
