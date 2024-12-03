"use client";

import { useEffect, useState } from "react";

import { DeleteBranch } from "../delete-table-item/delete-branch";
import { EditBranchModalForm } from "../branches/form/edit-branch-form";
import type { GetAllOrganizationBranch } from "@/types";
import { UserMenuAccountAction } from "./user-menu-account-action";
import { useActiveUser } from "@/crypto";

type Props = {
  branch: GetAllOrganizationBranch["data"][number] | undefined;
};

export function UserMenuRadioForm({ branch }: Props) {
  const user = useActiveUser();

  const [activeBranch, setActiveBranch] = useState<
    GetAllOrganizationBranch["data"][number] | undefined
  >(branch);
  const [open, onOpenChange] = useState(false);
  const [openDelete, onOpenDeleteChange] = useState(false);
  useEffect(() => {
    setActiveBranch(branch);
  }, [branch]);

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
            {branch?.name.toLocaleLowerCase() ===
              user?.data?.branch?.name.toLocaleLowerCase() &&
            user?.data?.roleName === "ADMIN"
              ? `${user?.data?.branch?.name.toLocaleUpperCase()} (HEAD OFFICE)`
              : branch?.name.toLocaleLowerCase() ===
                  user?.data?.branch?.name.toLocaleLowerCase()
                ? `${branch?.name.toUpperCase()} (MY BRANCH)`
                : branch?.name.toUpperCase()}
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
