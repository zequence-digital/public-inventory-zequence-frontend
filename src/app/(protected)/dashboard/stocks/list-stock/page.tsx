import { StockList } from "@/components/dashboard/stocks/stock-list";
import { Suspense } from "react";

const ListStockPage = () => {
  return (
    <Suspense>
      <StockList />
    </Suspense>
  );
};

export default ListStockPage;
