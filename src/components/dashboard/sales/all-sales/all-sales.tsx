"use client";

import { useMemo, useState } from "react";

import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { DataTable } from "@/components/table/ui/data-table";
import { DataTableSearchInput } from "@/components/table/ui/data-table-search-input";
import { formatDate } from "@/lib/utils";
import { useGroupSales } from "@/queries/sales";
import { CSVLink } from "react-csv";
import CustomButton from "../../custom-button";
import { allSalesColumns } from "./table-data/all-sales-column";
import exportIcon from "/public/icons/import.svg";

export function AllSales() {
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: sales,
    isError,
    error,
    isPlaceholderData,
    isFetching,
    isPending,
  } = useGroupSales();

  const csvData = useMemo(() => {
    const invoiceData = sales?.data.records
      .map((sale) => sale.invoiceLogData)
      .flatMap((invoice) => invoice);
    if (invoiceData) {
      return invoiceData.map((invoice) => ({
        ID: invoice.productData.guid,
        Category: invoice.productData.category.name,
        Branch: invoice.productData.branch,
        "Customer Type": invoice.customerType,
        Item: invoice.productData.name,
        Rate: invoice.rate.toLocaleString(),
        "Quantity Requested": invoice.quantityRequested,
        Price: invoice.amount.toLocaleString(),
        Date: formatDate(invoice.productData.createdAt),
      }));
    }
    return [];
  }, [sales?.data.records]);

  if (isError) {
    return <ApiErrorMessage message={error?.message} />;
  }
  return (
    <div>
      <div className="py-4 w-full space-y-2">
        <div className=" mb-4 flex w-full items-center justify-between gap-1">
          {/* Filters */}
          <div className="flex items-end justify-end w-full gap-2">
            <CSVLink data={csvData} filename={"sales"}>
              <CustomButton src={exportIcon} alt="Export Icon" label="Export" />
            </CSVLink>
            <DataTableSearchInput
              searchText={search}
              setSearchText={setSearch}
              placeholder="Search for item"
            />
          </div>
        </div>
        <DataTable
          message={`No sales found`}
          isPending={isPending}
          columns={allSalesColumns}
          data={sales?.data?.records ?? []}
        />
        <div className=" w-full items-center flex justify-between">
          <div className="flex items-center gap-2">
            <CustomButton
              label="Previous page"
              onClick={() => {
                if (!isPlaceholderData && pageNumber > 1) {
                  setPageNumber((old) => old - 1);
                }
              }}
              disabled={isPlaceholderData || pageNumber === 1}
            />
            <CustomButton
              label="Next page"
              onClick={() => {
                if (!isPlaceholderData && sales?.data?.meta?.numberOfPages) {
                  setPageNumber((old) => old + 1);
                }
              }}
              disabled={
                isPlaceholderData ||
                sales?.data?.meta?.numberOfPages === pageNumber
              }
            />
          </div>
          <span>
            page {pageNumber} of {sales?.data?.meta?.numberOfPages}
          </span>
        </div>
      </div>
    </div>
  );
}
