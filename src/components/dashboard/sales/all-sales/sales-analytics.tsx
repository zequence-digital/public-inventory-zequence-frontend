"use client";

import { cn, formatNumber } from "@/lib/utils";

import { DotsVerticalIcon } from "@radix-ui/react-icons";

type SalesAnalyticsProps = {
  className?: string;
  title?: string;
  total?: number;

  percentage: number;
  chartElement?: JSX.Element;
};
export function SalesAnalytics({
  className,
  title,
  total,

  percentage,
  chartElement,
}: SalesAnalyticsProps) {
  return (
    <div
      className={cn(
        `w-full h-44 p-6 bg-white rounded-lg shadow border border-gray-200 flex-col justify-start items-start gap-6 inline-flex`,
        className,
      )}
    >
      <div className="self-stretch justify-start items-start gap-2 inline-flex">
        <div className="grow shrink basis-0 text-slate-700 text-base font-semibold leading-normal">
          {title}
        </div>
        <div className="flex-col justify-start items-start inline-flex">
          <DotsVerticalIcon className="size-5 text-muted-300 cursor-pointer" />
        </div>
      </div>
      <div className="self-stretch justify-start items-end gap-4 inline-flex">
        <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
          <div className="self-stretch text-slate-900 text-4xl font-semibold leading-[44px]">
            {formatNumber(total || 0)}
          </div>
          <div className="self-stretch justify-start items-center gap-2 inline-flex">
            <div className="justify-center items-center gap-1 flex">
              <div className="relative">
                <picture>
                  <img
                    src={
                      percentage > 10
                        ? "/images/up-arrow.svg"
                        : "/images/down-arrow.svg"
                    }
                    alt="Arrow Icon"
                  />
                </picture>
              </div>
              <div
                className={cn(
                  `text-center text-success-200 text-sm font-medium leading-tight`,
                  {
                    " text-destructive-100": percentage <= 10,
                  },
                )}
              >
                {percentage} %
              </div>
            </div>
            <div className="grow shrink basis-0 text-slate-700 text-sm font-medium leading-tight">
              vs last month
            </div>
          </div>
        </div>
        <div className="self-stretch justify-end items-end inline-flex">
          {chartElement}
        </div>
      </div>
    </div>
  );
}
