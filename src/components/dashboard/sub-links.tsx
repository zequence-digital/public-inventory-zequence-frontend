"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { subLinks } from "@/routes";
import { usePathname } from "next/navigation";

export function SubLinks() {
  const pathname = usePathname();
  return (
    <div className="flex flex-row gap-2 md:flex-col md:gap-2 w-fit md:w-full">
      {subLinks.map((link) => {
        const Icon = link.IconComponent;
        const activeLink = pathname === link.href;
        return (
          <Link
            className={cn(
              `flex grow w-full items-center rounded-md text-sm font-medium h-fit hover:bg-primary-100/80 md:flex-none md:justify-start px-3 hover:text-white [&_svg]:hover:text-white group py-2`,
              {
                "bg-muted-700 text-primary-100": activeLink,
              },
            )}
            key={link.name}
            href={link.href}
          >
            <div className="flex items-center gap-2 ">
              <Icon
                className={cn(
                  `size-5 inline-block stroke-muted-200 group-hover:stroke-white transition-all duration-300 ease-in-out`,
                  {
                    "stroke-primary-100": activeLink,
                  },
                )}
              />
              <span className="hidden md:block">{link.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
