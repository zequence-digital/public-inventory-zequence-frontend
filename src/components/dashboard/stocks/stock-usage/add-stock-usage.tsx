"use client";

import { AddStockUsageForm } from "./form/add-stock-usage-form";
import { StockUsageList } from "./stock-usage-list";

type Props = {
  setOpen: (open: boolean) => void;
};

export function AddStockUsage({ setOpen }: Props) {
  return (
    <>
      <AddStockUsageForm />
      <StockUsageList setOpen={setOpen} />
    </>
  );
}
