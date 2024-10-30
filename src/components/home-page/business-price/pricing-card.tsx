import { cn } from "@/lib/utils";
import { LandingPageButton } from "../buttons/landing-page-button";

type Props = {
  title: string;
  description: string;
  price: number;
  billedYearly: number;
  btnLabel: string;
  btnBorder?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function PricingCard({
  title,
  description,
  price,
  billedYearly,
  btnLabel,
  btnBorder,
  className,
  ...rest
}: Props) {
  return (
    <div
      {...rest}
      className={cn(
        ` w-full h-[363px] justify-start items-start gap-8 inline-flex`,
        className,
      )}
    >
      <div className="grow shrink basis-0 p-8 rounded-3xl border border-muted-900 flex-col justify-start items-start gap-8 inline-flex">
        <div className="self-stretch h-14 flex-col justify-start items-start gap-1 flex">
          <div className="self-stretch text-black text-xl font-bold leading-7">
            {title}
          </div>
          <div className="self-stretch text-black text-base font-normal leading-normal">
            {description}
          </div>
        </div>
        <div className="self-stretch h-[0px] border border-muted-900"></div>
        <div className="self-stretch h-[179px] flex-col justify-start items-start gap-8 flex">
          <div className="h-[99px] flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch">
              <span className="text-black text-[56px] font-bold leading-[67.20px]">
                ${price}
              </span>
              <span className="text-black text-[32px] font-bold leading-[41.60px]">
                /month
              </span>
            </div>
            <div className="self-stretch text-black text-base font-normal leading-normal">
              ${billedYearly.toLocaleString()} billed yearly
            </div>
          </div>
          <LandingPageButton
            label={btnLabel}
            hasNoBg={btnBorder}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
