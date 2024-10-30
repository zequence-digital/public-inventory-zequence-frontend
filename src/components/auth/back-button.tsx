"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  href: string;
  label: string;
  actionLabel?: string;
}

export const BackButton = ({ href, label, actionLabel }: BackButtonProps) => {
  return (
    <div
      className={cn(`
      flex justify-center items-center mx-auto w-full gap-1
    `)}
    >
      <Button variant="link" className="font-normal hover:no-underline p-0">
        {label}
      </Button>
      <Button
        variant="link"
        className="font-semibold text-primary-100 p-0 hover:text-primary-100/90 transition-colors duration-300 ease-in-out"
        asChild
      >
        <Link href={href}>{actionLabel}</Link>
      </Button>
    </div>
  );
};
