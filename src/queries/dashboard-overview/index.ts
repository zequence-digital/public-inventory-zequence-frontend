import type { DashboardItems, DashboardOverview } from "@/types";
import {
  UndefinedInitialDataOptions,
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";
import { getDashboardItems, getDashboardOverview } from "./actions";

import { AxiosError } from "axios";
import dashboardOverviewKeys from "./dashboard-overview-keys";

function useDashboardOverview(
  options?: Omit<
    UndefinedInitialDataOptions<
      DashboardOverview,
      AxiosError,
      DashboardOverview,
      string[]
    >,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [dashboardOverviewKeys.read, "overview"];
  const queryDashboardOverview = useQuery({
    queryKey: hash,
    queryFn: getDashboardOverview,
    ...options,
  });

  return queryDashboardOverview;
}

function useDashboardItems(
  item: "ALL" | "PRODUCT" | "STOCK" = "ALL",
  pageNumber: number = 1,
  search: string = "",
  options?: Omit<
    UndefinedInitialDataOptions<
      DashboardItems,
      AxiosError,
      DashboardItems,
      string[]
    >,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [
    dashboardOverviewKeys.read,
    item,
    pageNumber.toString(),
    search,
  ].filter((key) => key !== undefined);
  const queryDashboardItems = useQuery({
    queryKey: hash,
    queryFn: () => getDashboardItems(item, pageNumber, search),
    placeholderData: keepPreviousData,
    ...options,
  });

  return queryDashboardItems;
}

export { useDashboardItems, useDashboardOverview };
