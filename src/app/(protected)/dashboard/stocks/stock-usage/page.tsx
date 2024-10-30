import { AllStockUsage } from "@/components/dashboard/stocks/stock-usage/all-stock-usage-table";
import { Suspense } from "react";

export default function StockUsagePage() {
  return (
    <Suspense>
      <AllStockUsage />
    </Suspense>
  );
}
