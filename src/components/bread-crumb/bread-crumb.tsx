"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { BackButton } from "./back-button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type BreadCrumbsProps = { className?: string; title?: string };
export function BreadCrumbComponent({ className, title }: BreadCrumbsProps) {
  const pathname = usePathname();

  function capitalize(str: string | null) {
    if (str === null) {
      return "";
    }
    return str
      .split("-")
      .map((s) => s[0].toUpperCase() + s.slice(1))
      .join(" ");
  }

  const organizedPathname = pathname.split("/").slice(1);

  return (
    <div className="max-w-2xl w-full overflow-clip">
      {organizedPathname.length > 2 && (
        <BackButton title="Back" className=" ml-0 border-none" />
      )}
      <div>
        <h1 className="text-2xl font-semibold -mb-4">
          {title || capitalize(organizedPathname[organizedPathname.length - 1])}
        </h1>
      </div>
      <div className={cn(` h-[72px] w-full flex items-center`, className)}>
        <Breadcrumb>
          <BreadcrumbList>
            <div>
              <BreadcrumbPage className="flex items-center">
                {organizedPathname.map((path, index) => {
                  return (
                    <div
                      className={cn(
                        `flex items-center text-primary-100 gap-2`,
                        {
                          " text-muted-400":
                            index === organizedPathname.length - 1,
                        },
                      )}
                      key={path}
                    >
                      <div
                      // href={
                      //   index === organizedPathname.length - 1
                      //     ? ""
                      //     : `/${organizedPathname.slice(0, index + 1).join("/")}`
                      // }
                      >
                        <span>{capitalize(path)}</span>
                      </div>
                      {index < organizedPathname.length - 1 && (
                        <BreadcrumbSeparator className="pr-2 mt-px text-gray-700" />
                      )}
                    </div>
                  );
                })}
              </BreadcrumbPage>
            </div>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}
