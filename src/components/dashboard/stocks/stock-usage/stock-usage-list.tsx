"use client";

import { useStockUsage, useSubmitStockGroupUsage } from "@/queries/stocks";

import { ApiErrorMessage } from "@/components/messages/api-error-message";
import CustomButton from "../../custom-button";
import { DataTable } from "@/components/table/ui/data-table";
import { Spinner } from "@/components/spinner";
import { allStockUsageColumns } from "./all-stock-usage-column";

type Props = {
  setOpen: (open: boolean) => void;
};

export function StockUsageList({ setOpen }: Props) {
  const { data: stockUsage, isError, error, isPending } = useStockUsage();
  const { mutate: submitGroupUsage, isPending: pendingSubmitSales } =
    useSubmitStockGroupUsage(setOpen);

  const allSalesGuid = stockUsage?.data?.records.map((sale) => sale.guid);

  if (isError) {
    return <ApiErrorMessage message={error?.message} />;
  }
  return (
    <div className="py-8 w-full">
      <DataTable
        message={`No stock usage found`}
        isPending={isPending}
        columns={allStockUsageColumns}
        data={stockUsage?.data?.records ?? []}
      />
      <div className="flex items-end justify-between w-full">
        <div className="flex gap-2 items-end">
          <CustomButton
            onClick={() => {
              if (allSalesGuid) {
                submitGroupUsage(allSalesGuid);
              }
            }}
            type="submit"
            className="bg-primary-100 text-white border-primary-100 hover:bg-primary-100/90 w-fit mt-8"
            label="Save"
            pendingLabel={<Spinner className=" border-white" />}
            isPending={pendingSubmitSales}
          />
          <CustomButton
            onClick={() => setOpen(false)}
            className="bg-slate-50"
            label="Cancel"
            pendingLabel={<Spinner className=" border-white" />}
          />
        </div>
      </div>
    </div>
  );
}
