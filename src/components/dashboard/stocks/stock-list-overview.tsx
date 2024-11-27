"use client";

import type { AllStock } from "@/types";
import { SingleDetailCard } from "@/components/table/ui/single-detail-card";

type Props = {
  stocks: AllStock | undefined;
  isPending: boolean;
};

export function StockListOverview({ stocks, isPending }: Props) {
  const inStock = stocks?.data?.records?.filter(
    (product) => product?.status === "IN_STOCK",
  ).length;
  const runningOut = stocks?.data?.records?.filter(
    (product) => product?.status === "RUNNING_OUT",
  ).length;

  const outOfStock = stocks?.data?.records?.filter(
    (product) => product?.status === "OUT_OF_STOCK",
  ).length;
  return (
    <div className="py-2">
      <div className="flex max-xl:flex-col gap-6">
        <SingleDetailCard
          isPending={isPending}
          title="In Stock"
          value={inStock ?? 0}
          status="IN_STOCK"
        />
        <SingleDetailCard
          isPending={isPending}
          title="Running Out"
          value={runningOut ?? 0}
          status="RUNNING_OUT"
        />
        <SingleDetailCard
          isPending={isPending}
          title="Out of Stock"
          value={outOfStock ?? 0}
          status="OUT_OF_STOCK"
        />
      </div>
    </div>
  );
}
