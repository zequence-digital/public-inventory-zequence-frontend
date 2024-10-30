"use client";

import { useEffect, useMemo, useState } from "react";

import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { stocksColumns } from "@/components/table/data/stocks/stocks-columns";
import { DataTable } from "@/components/table/ui/data-table";
import { DataTableSearchInput } from "@/components/table/ui/data-table-search-input";
import { useCurrentBranch } from "@/hooks/use-current-branch";
import { formatDate } from "@/lib/utils";
import { useStocks } from "@/queries/stocks";
import { CSVLink } from "react-csv";
import CustomButton from "../custom-button";
import { StockListOverview } from "./stock-list-overview";
import exportIcon from "/public/icons/import.svg";

export function StockList() {
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const [branchId, setBranchId] = useState<
    { id: number; name: string } | undefined
  >(undefined);
  const { currentBranch } = useCurrentBranch();
  useEffect(() => {
    if (currentBranch) {
      setBranchId(currentBranch);
    }
  }, [currentBranch]);
  const {
    data: stocks,
    isError,
    error,
    isPlaceholderData,
    isFetching,
    isPending,
  } = useStocks(pageNumber, search, branchId?.id);

  const csvData = useMemo(() => {
    if (stocks?.data?.records) {
      return stocks.data.records.map((stock) => ({
        id: stock.guid,
        name: stock.name,
        status: stock.status,
        notes: stock.notes,
        category: stock.category.name,
        quantity: stock.quantity,
        branch: stock.branch.name,
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
      <StockListOverview isPending={isPending} stocks={stocks} />
      <div className="py-4 w-full space-y-2">
        <div className=" mb-4 flex w-full items-center justify-between gap-1">
          {/* Filters */}
          <div className="flex items-end justify-end w-full gap-2">
            <CSVLink data={csvData} filename={"stocks"}>
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
          message={`No stocks found`}
          isPending={isPending}
          columns={stocksColumns}
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
