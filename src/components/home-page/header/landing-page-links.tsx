"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { links } from "./links";
import { usePathname } from "next/navigation";

type Props = {
  dispatch: React.DispatchWithoutAction;
  hashLocation: string;
  setHashLocation: React.Dispatch<React.SetStateAction<string>>;
};
export function LandingPageLinks({
  dispatch,
  hashLocation,
  setHashLocation,
}: Props) {
  const pathname = usePathname();
  return (
    <nav>
      <ul className="flex max-lg:flex-col lg:items-center items-start gap-8">
        {links.map(({ href, label }) => {
          return (
            <li
              onClick={() => {
                setHashLocation(href);
                dispatch();
              }}
              key={`${href}${label}`}
            >
              <Link
                href={href}
                className={cn(
                  "text-black text-base font-normal leading-normal hover:text-primary-100",
                  {
                    "text-primary-100 font-semibold":
                      hashLocation === href || pathname === href,
                  },
                )}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
