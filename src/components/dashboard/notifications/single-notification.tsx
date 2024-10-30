import Image from "next/image";
import productIcon from "/public/icons/products.svg";

type Props = {
  message: string;
  description: string;
  type?: string;
  date: string;
};

export function SingleNotification({
  message,
  description,
  type,
  date,
}: Props) {
  return (
    <div className="w-full flex items-start justify-between gap-6">
      <div className="flex items-start gap-4">
        <div className="relative">
          <div className="w-1.5 h-1.5 bg-blue-700 rounded-full absolute -right-1" />
          <Image src={productIcon} alt="Product icon" />
        </div>
        <div className="max-w-[284px] w-full">
          <div className="text-slate-700 text-base font-semibold">
            {description}
          </div>
          <div>{message}</div>
        </div>
      </div>
      <div className="text-slate-500 text-xs font-medium">{date}</div>
    </div>
  );
}
