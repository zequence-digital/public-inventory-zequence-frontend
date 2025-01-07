"use client";

import { useSales, useSalesGroupSubmit } from "@/queries/sales";

import { ApiErrorMessage } from "@/components/messages/api-error-message";
import CustomButton from "../../custom-button";
import { DataTable } from "@/components/table/ui/data-table";
import { Spinner } from "@/components/spinner";
import { salesColumns } from "./sales-column";
import { useMemo } from "react";

export function SalesList() {
  const { data: sales, isError, error, isPending } = useSales();
  const { mutate: submitSales, isPending: pendingSubmitSales } =
    useSalesGroupSubmit();

  const allSalesGuid = sales?.data?.records.map((sale) => sale.guid);

  const totalAmount = useMemo(() => {
    return sales?.data?.records.reduce((acc, sale) => acc + sale?.amount, 0);
  }, [sales?.data?.records]);

  const totalItem = useMemo(() => {
    return sales?.data?.records?.length;
  }, [sales?.data?.records]);

  if (isError) {
    return <ApiErrorMessage message={error?.message} />;
  }
  return (
    <div className="py-8">
      <DataTable
        message={`No sales found`}
        isPending={isPending}
        columns={salesColumns}
        data={sales?.data?.records ?? []}
      />
      {sales?.data?.records && sales?.data?.records?.length > 0 && (
        <div className="flex items-end justify-between w-full">
          <div className="flex gap-2 items-end">
            <CustomButton
              onClick={() => {
                if (allSalesGuid) {
                  submitSales(allSalesGuid);
                }
              }}
              type="submit"
              className="bg-primary-100 text-white border-primary-100 hover:bg-primary-100/90 w-fit mt-8"
              label="Save and Approve Sales"
              pendingLabel={<Spinner className=" border-white" />}
              isPending={pendingSubmitSales}
            />
          </div>
          <div>
            <div>
              <span className="text-slate-700 text-sm font-medium leading-tight">
                Total amount:
              </span>
              <span className="text-slate-700 text-sm font-semibold leading-tight">
                NGN {totalAmount?.toLocaleString()}
              </span>
            </div>
            <div className="space-x-2">
              <span className="text-slate-700 text-sm font-medium leading-tight">
                Total Item:
              </span>
              <span className="text-slate-700 text-sm font-semibold leading-tight">
                {totalItem?.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
