import { Overview } from "@/components/dashboard/home/overview/overview";
import { Suspense } from "react";

const OverviewPage = () => {
  return (
    <Suspense>
      <Overview />
    </Suspense>
  );
};

export default OverviewPage;
