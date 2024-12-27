import {
  UndefinedInitialDataOptions,
  UseMutationOptions,
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getAllNotifications, markNotificationAsReadOrUnread } from "./actions";

import { AuthResponse } from "@/types/auth";
import { AxiosError } from "axios";
import type { GetAllNotifications } from "@/types";
import notificationKeys from "./notification-keys";
import { toast } from "react-toastify";

export function useNotifications(
  readStatus: "READ" | "UNREAD" | "ALL" = "ALL",
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
  const hash = [notificationKeys.read, readStatus].filter(
    (key) => key !== undefined,
  );
  const notifications = useQuery({
    queryKey: hash,
    queryFn: () => getAllNotifications(readStatus),
    placeholderData: keepPreviousData,
    ...options,
  });

  return notifications;
}

export function useMarkNotificationAsReadOrUnread(
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();
  const readNotification = useMutation({
    mutationFn: markNotificationAsReadOrUnread,

    mutationKey: [notificationKeys.create],
    onSuccess(data) {
      if (data.success) {
        queryClient.invalidateQueries({
          queryKey: [notificationKeys.read],
        });
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return readNotification;
}
