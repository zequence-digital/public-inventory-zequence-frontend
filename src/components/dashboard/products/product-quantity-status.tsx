"use client";

import { cn } from "@/lib/utils";
import { useProducts } from "@/queries/products";

export function ProductStatus({ status }: { status: string }) {
  const { data: products, isPending, isError, error } = useProducts();

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" font-medium">
      {products?.data.records?.map((product) => {
        return (
          <div
            key={product.guid}
            className="h-10 justify-start items-center gap-3 inline-flex"
          >
            <div className="h-2 relative rounded-lg">
              <div className="w-[88px] h-2 left-0 top-0 absolute bg-success-50 rounded" />
              <div
                className={cn(` h-2 left-0 top-0 absolute rounded`, {
                  "w-[88px] bg-emerald-700 ":
                    // in stock
                    status === "IN_STOCK",
                  "w-[44px] bg-amber-700":
                    // running out
                    status === "RUNNING_OUT",
                  "w-[22px] bg-red-700":
                    // out of stock
                    status === "OUT_OF_STOCK",
                })}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
