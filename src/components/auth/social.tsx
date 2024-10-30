"use client";

import { Google } from "@/assets";
import Image from "next/image";
import SubmitButton from "@/components/form/components/submit-button";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};
export const Social = ({ className }: Props) => {
  return (
    <SubmitButton
      label="Sign in with Google"
      className={cn(
        `w-full space-x-4 border bg-white text-black font-semibold border-gray-400 hover:bg-slate-50 transition-colors duration-300 ease-in-out`,
        className,
      )}
    >
      <Image className="mr-4" src={Google} alt="google" />
    </SubmitButton>
  );
};
