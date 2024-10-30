import { StockTransfer } from "@/components/dashboard/stocks/stock-transfer/stock-transfer";
import { Suspense } from "react";

const AddStockTransferPage = () => {
  return (
    <Suspense>
      <StockTransfer />
    </Suspense>
  );
};

export default AddStockTransferPage;
