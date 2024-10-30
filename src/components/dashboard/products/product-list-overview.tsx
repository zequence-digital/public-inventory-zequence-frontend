"use client";

import type { AllProduct } from "@/types";
import { SingleDetailCard } from "@/components/table/ui/single-detail-card";

type Props = {
  products: AllProduct | undefined;
  isPending: boolean;
};

export function ProductListOverview({ products, isPending }: Props) {
  const inStock = products?.data?.records?.filter(
    (product) => product?.status === "IN_STOCK",
  ).length;
  const runningOut = products?.data?.records?.filter(
    (product) => product?.status === "RUNNING_OUT",
  ).length;

  const outOfStock = products?.data?.records?.filter(
    (product) => product?.status === "OUT_OF_STOCK",
  ).length;

  return (
    <div className="py-2">
      <div className=" grid grid-auto-fit-lg gap-6">
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
