"use client";

import { useActiveUser } from "@/crypto";

const WelcomeMessage = () => {
  const user = useActiveUser();

  return (
    <div className="flex-col justify-start items-start gap-1 inline-flex mb-6">
      <p className="self-stretch text-slate-900 text-3xl font-semibold leading-[38px]">
        <span>{`Welcome back, ${user?.data?.username.at(0)}${user?.data.username.slice(1).toLocaleLowerCase()} `}</span>
      </p>
      <p className="self-stretch text-slate-700 text-base font-normal leading-normal">
        Track, manage and forecast your inventories here.
      </p>
    </div>
  );
};

export default WelcomeMessage;
