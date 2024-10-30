"use client";

import { OverviewCard } from "@/components/table/ui/overview-card";
import type { DashboardOverview } from "@/types";

type Props = {
  stocks: DashboardOverview | undefined;
  isPending: boolean;
};

export function StockOverview({ stocks, isPending }: Props) {
  return (
    <OverviewCard
      isPending={isPending}
      inStock={stocks?.data?.stockSummary?.totalInStock ?? 0}
      outOfStock={stocks?.data?.stockSummary?.totalOutOfStock ?? 0}
      runningOut={stocks?.data?.stockSummary?.totalRunningOut ?? 0}
      title="Total Stocks"
      totalItems={stocks?.data?.stockSummary?.totalItemCount ?? 0}
    />
  );
}
