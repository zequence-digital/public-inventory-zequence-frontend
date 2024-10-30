import { StockRequest } from "@/components/dashboard/stocks/stock-request/stock-request";
import { Suspense } from "react";

const StockRequestPage = () => {
  return (
    <Suspense>
      <StockRequest />
    </Suspense>
  );
};

export default StockRequestPage;
