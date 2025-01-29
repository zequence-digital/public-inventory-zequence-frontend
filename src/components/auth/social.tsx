"use client";

import { Google } from "@/assets";
import SubmitButton from "@/components/form/components/submit-button";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  className?: string;
  socialLabel?: string;
  socialActionFn?: () => void;
  isSocialPending?: boolean;
};
export const Social = ({
  socialLabel = "Sign in with Google",
  isSocialPending,
  socialActionFn,
  className,
}: Props) => {
  return (
    <SubmitButton
      onClick={socialActionFn}
      label={isSocialPending ? "Loading..." : socialLabel}
      className={cn(
        `w-full space-x-4 border bg-white text-black font-semibold border-gray-400 hover:bg-slate-50 transition-colors duration-300 ease-in-out`,
        className,
      )}
    >
      <Image className="mr-4" src={Google} alt="google" />
    </SubmitButton>
  );
};
