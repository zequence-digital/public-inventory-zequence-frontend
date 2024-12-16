"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const links = [
  { href: "#features", label: "Features" },
  { href: "#resources", label: "Resources" },
  { href: "#business-pricing", label: "Pricing" },
];

export function LandingPageLinks() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="flex max-lg:flex-col lg:items-center items-start gap-8">
        {links.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <Link
              href={href}
              className={cn(
                "text-black text-base font-normal leading-normal hover:text-primary-100",
                {
                  "text-primary-100 font-semibold": pathname === href,
                },
              )}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
