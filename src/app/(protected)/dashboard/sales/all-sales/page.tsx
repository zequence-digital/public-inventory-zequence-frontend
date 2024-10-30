import { AllSales } from "@/components/dashboard/sales/all-sales/all-sales";
import { Suspense } from "react";

const AllSalesPage = () => {
  return (
    <Suspense>
      <AllSales />
    </Suspense>
  );
};

export default AllSalesPage;
