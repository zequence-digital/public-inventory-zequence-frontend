import { formatDate } from "@/lib/utils";

type Props = {
  date: string;
};

export function DateFormat({ date }: Props) {
  return (
    <div className="text-xs whitespace-nowrap">
      {formatDate(date?.toString())}
    </div>
  );
}
