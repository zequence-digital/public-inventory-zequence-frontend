import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function EmailMessageNotice({ className }: Props) {
  return (
    <div className={cn(`relative`, className)}>
      <picture>
        <img
          className="w-full"
          src="/images/email-notice.svg"
          alt="Email notice Icon"
        />
      </picture>
    </div>
  );
}
