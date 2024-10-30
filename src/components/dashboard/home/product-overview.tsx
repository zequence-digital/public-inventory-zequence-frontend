"use client";

import { OverviewCard } from "@/components/table/ui/overview-card";
import type { DashboardOverview } from "@/types";

type Props = {
  products: DashboardOverview | undefined;
  isPending: boolean;
};

export function ProductOverview({ products, isPending }: Props) {
  return (
    <OverviewCard
      isPending={isPending}
      inStock={products?.data?.productSummary?.totalInStock ?? 0}
      outOfStock={products?.data?.productSummary?.totalOutOfStock ?? 0}
      runningOut={products?.data?.productSummary?.totalRunningOut ?? 0}
      title="Total Products"
      totalItems={products?.data?.productSummary?.totalItemCount ?? 0}
    />
  );
}
