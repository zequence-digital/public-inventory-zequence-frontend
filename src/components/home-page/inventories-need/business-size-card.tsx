import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  description: string;
  className?: string;
  width?: number;
  height?: number;
} & React.HTMLAttributes<HTMLDivElement>;
export function BusinessSizeCard({
  src,
  alt,
  description,
  className,
  width,
  height,
  ...rest
}: Props) {
  return (
    <div className="max-w-[416px]  w-full shrink-0 mx-auto">
      <div
        {...rest}
        className={cn(
          `h-[400px]  rounded-3xl p-6 flex-col justify-between items-start inline-flex`,
          className,
        )}
      >
        <div className="justify-start items-start gap-4 inline-flex">
          <div className="w-20 h-20 relative">
            <Image src={src} alt={alt} fill />
          </div>
        </div>
        <div className="self-stretch flex-col justify-start items-start gap-6 flex">
          <div className="self-stretch flex-col justify-start items-start gap-4 flex">
            <div className="self-stretch text-black text-2xl font-medium">
              {description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
