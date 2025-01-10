import { Overview } from "@/components/dashboard/home/overview/overview";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Overview",
  description: "Overview",
};

const OverviewPage = () => {
  return (
    <Suspense>
      <Overview />
    </Suspense>
  );
};

export default OverviewPage;
