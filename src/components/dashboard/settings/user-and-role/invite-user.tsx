"use client";

import CustomButton from "../../custom-button";
import { InviteUserModalForm } from "./invite-user-modal";
import { useInviteUserModalAction } from "@/store/use-invite-user-modal";

export function InviteUser() {
  const { open, onOpenChange } = useInviteUserModalAction();
  return (
    <>
      <InviteUserModalForm />
      <div className="flex max-lg:flex-col justify-between">
        <div className="h-[88px] pb-px flex-col justify-start items-start gap-5 inline-flex">
          <div className="self-stretch justify-start items-start gap-4 inline-flex">
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-2 inline-flex">
              <div className="self-stretch text-slate-700 text-lg font-semibold leading-7">
                Users & roles
              </div>
              <div className="self-stretch">
                <span className="text-slate-500 text-sm font-normal leading-[8px]">
                  Invite a member and start collaborating. Manage member’s roles
                  and set their access level.
                  <br />
                </span>
                <span className="text-slate-500 text-sm font-normal underline leading-[8px]">
                  Learn more about inviting members
                </span>
              </div>
            </div>
          </div>
        </div>
        <CustomButton
          onClick={() => onOpenChange(true)}
          className="bg-primary-100 h-fit text-white"
          label="invite members"
        />
      </div>
    </>
  );
}
