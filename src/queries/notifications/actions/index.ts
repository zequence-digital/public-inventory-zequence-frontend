import type { GetAllNotifications } from "@/types";
import { apiClient } from "@/services/api";

// /notifications

export const getAllNotifications = async (): Promise<GetAllNotifications> => {
  const response = await apiClient.get({
    url: "/notifications",
    auth: true,
  });

  return response as GetAllNotifications;
};
