"use client";

import { useMemo, useState } from "react";

import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { stockRequestColumns } from "@/components/table/data/stocks/stock-request-column";
import { DataTable } from "@/components/table/ui/data-table";
import { DataTableSearchInput } from "@/components/table/ui/data-table-search-input";
import { formatDate } from "@/lib/utils";
import { useStockRequest } from "@/queries/stocks";
import { CSVLink } from "react-csv";
import CustomButton from "../../custom-button";
import { StockRequestForm } from "./stock-request-form";
import exportIcon from "/public/icons/import.svg";

export function StockRequest() {
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: stocks,
    isError,
    error,
    isPending,
    isPlaceholderData,
    isFetching,
  } = useStockRequest(pageNumber, search);

  const csvData = useMemo(() => {
    if (stocks?.data?.records) {
      return stocks.data.records.map((stock) => ({
        id: stock.guid,
        from: stock.fromBranch.name,
        to: stock.toBranch.name,
        quantity: stock.quantity,
        status: stock.status,
        date: formatDate(stock.createdAt),
      }));
    }
    return [];
  }, [stocks]);

  if (isError) {
    return <ApiErrorMessage message={error?.message} />;
  }
  return (
    <div>
      <StockRequestForm />
      <div className="py-4 w-full space-y-2">
        <div className=" mb-4 flex w-full items-center justify-between gap-1">
          {/* Filters */}
          <div className="flex items-end justify-end w-full gap-2">
            <CSVLink data={csvData} filename={"stock-requests"}>
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
          message={`No stocks request found`}
          isPending={isPending}
          columns={stockRequestColumns}
          data={stocks?.data?.records ?? []}
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
                if (!isPlaceholderData && stocks?.data?.meta?.numberOfPages) {
                  setPageNumber((old) => old + 1);
                }
              }}
              disabled={
                isPlaceholderData ||
                stocks?.data?.meta?.numberOfPages === pageNumber
              }
            />
          </div>
          <span>
            page {pageNumber} of {stocks?.data?.meta?.numberOfPages}
          </span>
        </div>
      </div>
    </div>
  );
}
