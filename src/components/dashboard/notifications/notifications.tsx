"use client";

import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { NotificationSkeleton } from "@/components/table/skeleton/notification-skeleton";
import { useNotificationStatus } from "@/hooks/use-notifications";
import { useNotifications } from "@/queries/notifications";
import { EmptyNotificationMessage } from "./empty-notification-message";
import { NotificationDropdown } from "./notification-dropdown";
import { SingleNotification } from "./single-notification";

export function Notifications() {
  const { readStatus, setReadStatus } = useNotificationStatus();
  const {
    data: notifications,
    isError,
    isPending,
    error,
  } = useNotifications(readStatus);
  return (
    <div>
      <div className="max-w-[573px] w-full  border-r border-muted-150">
        <div className="w-full flex items-center justify-between gap-2 mb-12">
          <div className="text-slate-700 text-2xl font-semibold">
            Notifications
          </div>
          <NotificationDropdown
            readStatus={readStatus}
            setReadStatus={setReadStatus}
          />
        </div>
        {isError && <ApiErrorMessage message={error.message} />}
        {isPending && (
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="w-full">
                <NotificationSkeleton />
              </div>
            ))}
          </div>
        )}
        {notifications?.data?.length === 0 && <EmptyNotificationMessage />}
        <div className="space-y-6 pr-6 pb-10 h-screen overflow-y-scroll">
          {notifications?.data?.map((notification) => {
            return (
              <div key={notification.guid}>
                <SingleNotification notification={notification} />
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="mt-6 max-w-[530px] w-full flex items-center gap-6 border-t border-muted-150 pt-6">
        <CustomButton
          className="text-slate-700 bg-slate-50"
          label="Mark all as read"
        />
        <CustomButton
          className="text-slate-700 bg-slate-50"
          label="Mark all as unread"
        />
      </div> */}
    </div>
  );
}
