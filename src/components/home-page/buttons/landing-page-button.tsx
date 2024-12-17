import { cn } from "@/lib/utils";

export type Props = {
  label: string;
  className?: string;
  labelClassName?: string;
  hasNoBg?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export function LandingPageButton({
  label,
  className,
  labelClassName,
  hasNoBg,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      className={cn(
        `px-6 py-3 bg-primary-100 rounded-3xl border border-primary-100 justify-center items-center gap-2 flex`,
        className,
        {
          "bg-transparent border-black": hasNoBg,
        },
      )}
    >
      <p
        className={cn(
          `text-white text-base font-medium leading-normal`,
          labelClassName,
          {
            "text-black": hasNoBg,
          },
        )}
      >
        {label}
      </p>
    </button>
  );
}
