"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

type InputFieldProps = {
  label?: string;
  hasCustomIcon?: boolean;
  sr?: string;
  alt?: string;
  width?: number;
  height?: number;
  name: string;
  isPending?: boolean;
  type: string;
  id: string;
  placeholder: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function InputField({
  label,
  hasCustomIcon,
  src,
  alt,
  width,
  height,
  name,
  isPending,
  className,
  type,
  id,
  placeholder,
  ...props
}: InputFieldProps) {
  return (
    <div className={cn("flex flex-col gap-2")}>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "text-sm font-medium text-muted-200 flex items-center gap-1",
          )}
        >
          {label}

          {hasCustomIcon && (
            <Image
              width={width}
              height={height}
              src={src ?? ""}
              alt={alt ?? ""}
            />
          )}
        </label>
      )}
      <input
        className={cn(
          `w-full h-[52px] px-4  text-sm bg-white border border-muted-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`,
          className,
          { " bg-muted-600 animate-pulse": isPending },
        )}
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
