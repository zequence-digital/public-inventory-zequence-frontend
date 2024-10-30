"use client";

import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type BackButtonProps = {
  title: string;
  onClick?: () => void;
  className?: string;
};

export function BackButton({ onClick, title, className }: BackButtonProps) {
  const router = useRouter();
  return (
    <button
      onClick={onClick || (() => router.back())}
      className={cn(
        `flex items-center text-black py-2 ml-6 border-b border-b-muted-300`,
        className,
      )}
    >
      <ChevronLeftIcon className=" size-5" />
      <span className=" font-medium text-sm">{title}</span>
    </button>
  );
}
