"use client";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface HeaderProps {
  label: string;
  message?: string;
  logo?: string;
  className?: string;
}

export const Header = ({ label, message, logo, className }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1
        className={cn(
          "md:text-3xl text-2xl font-semibold text-center",
          className,
        )}
      >
        <div className="relative h-8 w-12 flex justify-center mx-auto mb-6">
          <Image
            src={logo ? logo : ""}
            alt="logo"
            fill
            priority
            sizes="(max-width: 640px) 100px, 200px"
          />
        </div>
        <p className="text-muted-100 font-semibold">{message}</p>
      </h1>
      <p className="text-muted-foreground text-sm -mt-2 text-center">{label}</p>
    </div>
  );
};
