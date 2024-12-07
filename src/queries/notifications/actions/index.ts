import type {
  GetAllNotifications,
  MarkNotificationAsReadOrUnread,
} from "@/types";

import { apiClient } from "@/services/api";

// /notifications

export const getAllNotifications = async (
  readStatus: "READ" | "UNREAD" | "ALL" = "ALL",
): Promise<GetAllNotifications> => {
  const response = await apiClient.get({
    url: `/notifications?readStatus=${readStatus}`,
    auth: true,
  });

  return response as GetAllNotifications;
};

export const markNotificationAsReadOrUnread = async (
  data: MarkNotificationAsReadOrUnread,
) => {
  const response = await apiClient.post({
    url: `/notifications`,
    body: data,
    auth: true,
  });

  return response;
};
