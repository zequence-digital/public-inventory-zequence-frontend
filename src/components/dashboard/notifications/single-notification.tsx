import { cn, formatDateDifference } from "@/lib/utils";

import { useMarkNotificationAsReadOrUnread } from "@/queries/notifications";
import type { GetAllNotifications } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";
import productIcon from "/public/icons/products.svg";

type Props = {
  notification: GetAllNotifications["data"][number];
};

export function SingleNotification({ notification }: Props) {
  const { mutate: markAsReadOrUnread, isPending } =
    useMarkNotificationAsReadOrUnread();

  const handleReadStatus = useCallback(() => {
    if (notification?.readStatus === "UNREAD") {
      markAsReadOrUnread({
        guid: notification?.guid,
        readStatus: "READ",
      });
    }

    // if (notification?.readStatus === "READ") {
    //   markAsReadOrUnread({
    //     guid: notification?.guid,
    //     readStatus: "UNREAD",
    //   });
    // }
  }, [notification, markAsReadOrUnread]);

  return (
    <Link
      href={`/dashboard/notifications/${notification?.guid}/notification`}
      onClick={handleReadStatus}
      className={cn(
        `w-full cursor-pointer flex items-start justify-between gap-6 transform transition-transform duration-300`,
        {
          "cursor-not-allowed": isPending,
        },
      )}
    >
      <div className="flex items-start gap-4">
        <div className="relative">
          {notification?.readStatus === "READ" ? null : (
            <div className="w-1.5 h-1.5 bg-blue-700 rounded-full absolute -right-1" />
          )}
          <Image src={productIcon} alt="Product icon" />
        </div>
        <div className="max-w-[284px] w-full">
          <div className="text-slate-700 text-base font-semibold">
            {notification?.description}
          </div>
          <div>{notification?.message}</div>
        </div>
      </div>
      <div className="text-slate-500 text-xs font-medium">
        {formatDateDifference(notification?.createdAt)}
      </div>
    </Link>
  );
}
