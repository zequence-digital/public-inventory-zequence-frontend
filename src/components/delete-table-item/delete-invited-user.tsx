"use client";

import { Alert } from "../dialog/alert-dialog";
import { Spinner } from "../spinner";
import { useRemoveInvitedUser } from "@/queries/settings/user-and-role";
import { useState } from "react";

export function DeleteInvitedUser({ emailAddress }: { emailAddress: string }) {
  const { mutate: removeInvitedUser, isPending: pendingInvitedUser } =
    useRemoveInvitedUser();
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Alert
        title="Delete User"
        description="Are you sure you want to delete this user?"
        open={open}
        onOpenChange={setOpen}
        handleContinue={() => {
          removeInvitedUser(emailAddress);
          setOpen(false);
        }}
        handleCancel={() => setOpen(false)}
      />
      <button
        onClick={() => setOpen(true)}
        className="text-slate-700 text-sm ml-10 pt-3 cursor-pointer  font-medium leading-[15px]"
      >
        {pendingInvitedUser ? <Spinner /> : " Remove user"}
      </button>
    </div>
  );
}
