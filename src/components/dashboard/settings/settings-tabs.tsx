"use client";

import { Tab } from "@/components/tab/tab-component";
import { UsersAndRole } from "./user-and-role/user-and-role";

type Tab = {
  label: string;
  content: React.ReactNode;
};

const tabs: Tab[] = [
  {
    label: "Users & Roles",
    content: <UsersAndRole />,
  },
];

type Props = {};

export const SettingsTabs = ({}: Props) => {
  return (
    <div>
      <div className="text-slate-700 mb-4 text-3xl font-semibold leading-[38px]">
        Settings
      </div>
      <Tab labelClassName="text-slate-500 text-sm font-semibold" tabs={tabs} />
    </div>
  );
};
