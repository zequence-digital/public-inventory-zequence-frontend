import type { DashboardItems, DashboardOverview } from "@/types";

import { apiClient } from "@/services/api";

// /dashboard/overview

export const getDashboardOverview = async (): Promise<DashboardOverview> => {
  const response = await apiClient.get({
    url: "/dashboard/overview",
    auth: true,
  });

  return response as DashboardOverview;
};

// /dashboard/items

// item;
// string(query);

// pageNumber
// search;

export const getDashboardItems = async (
  item: "ALL" | "PRODUCT" | "STOCK",
  pageNumber: number = 1,
  search: string = "",
): Promise<DashboardItems> => {
  const response = await apiClient.get({
    url: `/dashboard/items?item=${item}&pageNumber=${pageNumber}${search ? `&search=${search}` : ""}`,
    auth: true,
  });

  return response as DashboardItems;
};
