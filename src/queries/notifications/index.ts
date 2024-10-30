import {
  UndefinedInitialDataOptions,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";

import type { GetAllNotifications } from "@/types";
import { getAllNotifications } from "./actions";
import notificationKeys from "./notification-keys";

export function useNotifications(
  options?: Omit<
    UndefinedInitialDataOptions<
      GetAllNotifications,
      Error,
      GetAllNotifications,
      string[]
    >,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [notificationKeys.read].filter((key) => key !== undefined);
  const notifications = useQuery({
    queryKey: hash,
    queryFn: getAllNotifications,
    placeholderData: keepPreviousData,
    ...options,
  });

  return notifications;
}
