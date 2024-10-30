import { CaretRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description: string;
  href: string;
  className?: string;
  element?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function BusinessProfileCard({
  title,
  description,
  href,
  element,
  className,
  ...rest
}: Props) {
  return (
    <div className={cn(`max-w-[416px]  w-full mx-auto`, className)}>
      <div
        {...rest}
        className="h-[200px]  p-6 bg-black flex-col justify-center items-start gap-4 inline-flex rounded-t-3xl "
      >
        <div className="self-stretch flex-col justify-start items-start gap-2 flex">
          <div className="self-stretch flex-col justify-start items-start gap-2 flex">
            <div className="self-stretch text-white text-[32px] font-medium leading-[41.60px]">
              {title}
            </div>
            <div className="self-stretch text-white text-base font-normal leading-normal">
              {description}
            </div>
          </div>
        </div>
        <div className="self-stretch justify-start items-center gap-6 inline-flex">
          <Link href={href} className="justify-center items-center gap-2 flex">
            <div className="text-white text-base font-normal leading-normal flex items-center gap-1">
              <span>Learn more</span>
              <span>
                <CaretRightIcon className=" inline-block" />
              </span>
            </div>
          </Link>
        </div>
      </div>
      <div className="self-stretch flex-col justify-start items-start gap-4 flex shrink-0 max-w-[416px] overflow-hidden w-full">
        {element}
      </div>
    </div>
  );
}
