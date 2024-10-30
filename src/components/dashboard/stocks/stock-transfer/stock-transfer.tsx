"use client";

import { useMemo, useState } from "react";

import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { stockTransferColumns } from "@/components/table/data/stocks/stock-transfer-column";
import { DataTable } from "@/components/table/ui/data-table";
import { DataTableSearchInput } from "@/components/table/ui/data-table-search-input";
import { formatDate } from "@/lib/utils";
import { useStockTransfer } from "@/queries/stocks";
import { CSVLink } from "react-csv";
import CustomButton from "../../custom-button";
import { AddStockTransferForm } from "./add-stock-transfer-form";
import exportIcon from "/public/icons/import.svg";

export function StockTransfer() {
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: stocks,
    isError,
    error,
    isPlaceholderData,
    isFetching,
    isPending,
  } = useStockTransfer(pageNumber, search);

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
      <AddStockTransferForm />
      <div className="py-4 w-full space-y-2">
        <div className=" mb-4 flex w-full items-center justify-between gap-1">
          {/* Filters */}
          <div className="flex items-end justify-end w-full gap-2">
            <CSVLink data={csvData} filename={"stock-transfers"}>
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
          searchBy={`category`}
          message={`No stocks transfer found`}
          isPending={isPending}
          searchTerm={`category`}
          columns={stockTransferColumns}
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
