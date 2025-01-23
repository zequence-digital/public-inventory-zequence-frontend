import { cn } from "@/lib/utils";
import Image from "next/image";

type CustomButtonProps = {
  src?: string;
  isPending?: boolean;
  label: string;
  pendingLabel?: string | React.ReactNode;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const CustomButton = ({
  src,
  label,
  isPending,
  alt = "",
  pendingLabel = "Loading...",
  width = 20,
  height = 20,
  className,
  imageClassName,
  ...rest
}: CustomButtonProps) => {
  return (
    <button
      {...rest}
      className={cn(`rounded-lg justify-start items-start flex`, className)}
    >
      <div className="py-2.5  rounded-lg shadow  justify-center items-center gap-2 flex">
        <div className="px-4 text-sm font-semibold leading-tight flex items-center gap-2">
          {src && (
            <Image
              className={cn(`-ml-2`, imageClassName)}
              width={20}
              height={20}
              src={src}
              alt={alt}
            />
          )}
          <span>{isPending ? pendingLabel : label}</span>
        </div>
      </div>
    </button>
  );
};

export default CustomButton;
