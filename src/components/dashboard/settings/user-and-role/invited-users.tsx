"use client";

import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { InvitedUser } from "./invited-user";
import { InvitedUserSkeleton } from "@/components/table/skeleton/invited-user-skeleton";
import { useInvitedUsers } from "@/queries/settings/user-and-role";
import { useState } from "react";

export function InvitedUsers() {
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const {
    data: invitedUsers,
    isError,
    error,
    isPending,
  } = useInvitedUsers(pageNumber, search);

  return (
    <div>
      <div className="max-w-[280px] text-slate-700 py-5 text-lg font-semibold">
        Invited members
      </div>
      {invitedUsers?.data?.records?.length === 0 && (
        <div className="text-slate-500 text-sm font-normal leading-[8px]">
          No invited members yet
        </div>
      )}

      {isError && <ApiErrorMessage message={error?.message} />}
      {isPending && (
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="w-full">
              <InvitedUserSkeleton />
            </div>
          ))}
        </div>
      )}
      {invitedUsers?.data?.records?.map((user) => {
        return (
          <InvitedUser
            key={user?.createdAt}
            name={user?.admin}
            emailAddress={user?.emailAddress}
            roleName={user?.roleName}
          />
        );
      })}
    </div>
  );
}
