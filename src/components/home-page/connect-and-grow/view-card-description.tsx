import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  heading: string;
  description: string;
  src: string;
  alt: string;
  isPositionedLeft?: boolean;
  hasTopBadge?: boolean;
  className?: string;
};
export function ViewCardDescription({
  className,
  heading,
  src,
  alt,
  description,
  isPositionedLeft,
  hasTopBadge,
}: Props) {
  return (
    <div
      className={cn(
        `min-h-[700px] relative overflow-hidden border border-secondary-800 w-full bg-gradient-to-br from-secondary-700 to-secondary-800 rounded-3xl p-8 flex-col justify-start items-start gap-6 inline-flex `,
        className,
      )}
    >
      <div className="self-stretch h-[148px] flex-col justify-start items-start gap-6 flex">
        <div className="self-stretch h-[148px] flex-col justify-start items-start gap-4 flex">
          <div className="relative self-stretch text-black lg:text-[24px] text-xl font-semibold">
            {heading}
            {hasTopBadge && (
              <span className="absolute -top-4 right-32">
                <picture>
                  <img
                    width={28}
                    height={28}
                    src="/images/crystal.svg"
                    alt="A crystal Image"
                  />
                </picture>
              </span>
            )}
          </div>
          <div className="self-stretch text-neutral-900 text-md font-normal">
            {description}
          </div>
        </div>
      </div>
      <Image
        className={cn(`absolute bottom-0 right-0 shrink-0`, {
          "left-0": isPositionedLeft,
        })}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        width={400}
        height={400}
        src={src}
        alt={alt}
      />
    </div>
  );
}
