"use client";

import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { InvitedUserSkeleton } from "@/components/table/skeleton/invited-user-skeleton";
import { useActiveInvitedUser } from "@/queries/settings/user-and-role";
import { ActiveUser } from "./active-user";

export function ActiveUsers() {
  const {
    data: activeUsers,
    isPending,
    isError,
    error,
  } = useActiveInvitedUser();

  return (
    <div className=" w-full border-t border-b py-5 border-muted-650">
      <div className=" flex-col justify-start items-start gap-5 inline-flex ">
        <div className="w-[280px] text-slate-700 text-lg font-semibold">
          {(activeUsers?.data?.records?.length ?? 0) === 0
            ? "No active members yet"
            : (activeUsers?.data?.records?.length ?? 0) +
              ` Active member${
                (activeUsers?.data?.records?.length ?? 0) > 1 ? "s" : ""
              }`}
        </div>
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
        {activeUsers?.data?.records?.map((user) => {
          return (
            <ActiveUser
              key={user?.emailAddress}
              name={user?.emailAddress}
              roleName={user?.roleName}
              emailAddress={user?.emailAddress}
              src={user?.photoLink}
              alt={user?.emailAddress}
            />
          );
        })}
      </div>
    </div>
  );
}
