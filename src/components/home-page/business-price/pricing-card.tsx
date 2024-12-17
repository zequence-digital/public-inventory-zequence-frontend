import { LandingPageButton } from "../buttons/landing-page-button";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  linkTarget?: string;
  link?: string;
  title: string;
  badged?: boolean;
  priced?: boolean;
  badgedText?: string;
  description: string;
  price: number;
  billedYearly?: number;
  element?: string | React.ReactNode;
  btnLabel: string;
  btnBorder?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function PricingCard({
  link,

  linkTarget,
  badgedText,
  element,
  title,
  badged,
  priced,
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
        ` w-full relative h-[363px] justify-start items-start gap-8 inline-flex`,
        className,
      )}
    >
      {badged && (
        <div className="h-10 font-geist absolute -top-5 left-1/2 px-4 py-2 bg-secondary-600 rounded-2xl justify-center items-center gap-2 inline-flex">
          <div className="text-black text-base font-normal leading-normal">
            {badgedText}
          </div>
        </div>
      )}
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
          {priced ? (
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
                {billedYearly?.toLocaleString()} billed yearly
              </div>
            </div>
          ) : (
            element
          )}
          <Link
            target={linkTarget ? linkTarget : "_self"}
            className="w-full mt-auto"
            href={link ? link : ""}
          >
            <LandingPageButton
              label={btnLabel}
              hasNoBg={btnBorder}
              className="w-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
