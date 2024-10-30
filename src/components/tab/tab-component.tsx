"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

type TabProps = {
  tabs: {
    label: string;
    content: React.ReactNode;
  }[];
  className?: string;
  labelClassName?: string;
};

function tabConstructor(tab: string) {
  return tab
    .split(" ")
    .join("-")
    .toLocaleLowerCase()
    .replace("&", "and")
    .replace("'", "");
}

export function Tab({ tabs, className, labelClassName }: TabProps) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") ?? tabConstructor(tabs[0].label);

  return (
    <div className={cn(`w-full `, className)}>
      <div className="w-full flex border-b border-b-neutral-300 space-x-6">
        {tabs.map((tab) => (
          <Link
            href={{ query: { tab: tabConstructor(tab.label) } }}
            className={cn(
              `relative top-px py-3 px-1 border-b-2 capitalize  border-b-transparent whitespace-nowrap text-sm font-semibold text-neutral-500 hover:text-primary-100 hover:border-b-primary-100`,
              labelClassName,
              {
                " border-b-primary-100 text-primary-100  font-semibold border-b-2":
                  activeTab === tabConstructor(tab.label),
              },
            )}
            key={tab.label}
          >
            {tab.label}
          </Link>
        ))}
      </div>
      <div className={cn(`py-6  px-0`)}>
        {tabs.map((tab) => (
          <div key={tab.label}>
            {activeTab === tabConstructor(tab.label) ? tab.content : null}
          </div>
        ))}
      </div>
    </div>
  );
}
