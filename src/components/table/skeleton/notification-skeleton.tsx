import { Skeleton } from "@/components/ui/skeleton";

export function NotificationSkeleton() {
  return (
    <div className="flex items-start space-x-4 max-w-[573px] w-full px-4">
      <Skeleton className="size-7 rounded-full" />
      <div className="space-y-2 w-full">
        <div className="flex items-center gap-3 w-full justify-between">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[40px]" />
        </div>
        <Skeleton className="h-20 w-[300px]" />
      </div>
    </div>
  );
}
