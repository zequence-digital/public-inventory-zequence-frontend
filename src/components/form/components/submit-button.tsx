"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SubmitButtonProps = {
  label?: string;
  loadingLabel?: React.ReactNode | string;
  isPending?: boolean;
  children?: React.ReactNode;
  className?: string;
  labelClassName?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const SubmitButton: React.FC<SubmitButtonProps> = ({
  label,
  children,
  isPending,
  loadingLabel,
  className,
  labelClassName,
  ...rest
}) => {
  return (
    <Button
      {...rest}
      type="submit"
      size="lg"
      className={cn(
        `
        w-full
        px-4
        py-2
        border
        border-gray-300
        rounded-lg
        focus:outline-none
        focus:border-primary-100
        focus:ring-1
        focus:ring-primary-100
        focus:ring-opacity-50
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:bg-gray-100
        disabled:border-gray-300
      `,
        className,
        {
          "cursor-not-allowed": isPending,
        },
      )}
    >
      {children}
      {isPending ? (
        loadingLabel
      ) : (
        <span className={cn(``, labelClassName)}>{label}</span>
      )}
    </Button>
  );
};

export default SubmitButton;
