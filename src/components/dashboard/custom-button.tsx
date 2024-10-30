import Image from "next/image";
import { cn } from "@/lib/utils";

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
      <div className="px-4 py-2.5  rounded-lg shadow  justify-center items-center gap-2 flex">
        <div className=" text-sm font-semibold leading-tight flex items-center gap-2">
          {src && (
            <Image
              className={cn(``, imageClassName)}
              width={20}
              height={20}
              src={src}
              alt={alt}
            />
          )}
          {isPending ? pendingLabel : label}
        </div>
      </div>
    </button>
  );
};

export default CustomButton;
