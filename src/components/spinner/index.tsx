import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export function Spinner({ className }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row space-x-4">
        <div
          className={cn(
            "size-8 rounded-full animate-spin border-4 border-dashed border-primary-100 border-t-transparent",
            className,
          )}
        ></div>
      </div>
    </div>
  );
}
