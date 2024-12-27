"use client";

import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { NotificationSkeleton } from "@/components/table/skeleton/notification-skeleton";
import { formatDateDifference } from "@/lib/utils";
import { useMemo } from "react";
import { useNotifications } from "@/queries/notifications";

type Props = {
  notificationId: string;
};

export function NotificationById({ notificationId }: Props) {
  const { data: notifications, isError, isPending, error } = useNotifications();

  const notification = useMemo(() => {
    return notifications?.data.find(
      (notification) => notification.guid === notificationId,
    );
  }, [notifications, notificationId]);

  return (
    <div className=" w-full px-4">
      <div className="w-full flex items-center justify-between gap-2 mb-12">
        <div className="text-slate-700 text-2xl font-semibold flex items-center gap-2">
          Notification🔔
        </div>
      </div>
      {isError && <ApiErrorMessage message={error.message} />}
      {isPending && (
        <div className="space-y-4">
          {Array.from({ length: 1 }).map((_, index) => (
            <div key={index} className="w-full">
              <NotificationSkeleton />
            </div>
          ))}
        </div>
      )}
      {/* Notification Card */}
      <div className="w-full">
        <div className="w-full space-y-2">
          <div className="flex items-center justify-between gap-4">
            <div className="text-slate-700 text-base font-semibold">
              {notification?.description}
            </div>
            <div className="text-slate-500 text-xs font-medium">
              {formatDateDifference(notification?.createdAt as string)}
            </div>
          </div>
          <div>{notification?.message}</div>
        </div>
      </div>
    </div>
  );
}
