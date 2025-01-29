"use client";

import { DateFilter } from "@/components/filters/date-filter";
import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { stocksColumns } from "@/components/table/data/stocks/stocks-columns";
import { DataTable } from "@/components/table/ui/data-table";
import { DataTableSearchInput } from "@/components/table/ui/data-table-search-input";
import { ExportToCsv } from "@/components/table/ui/export-to-csv";
import { PaginationComponent } from "@/components/ui/pagination";
import { useCurrentBranch } from "@/hooks/use-current-branch";
import { usePagePagination } from "@/hooks/use-page-pagination";
import { formatDate } from "@/lib/utils";
import { useStocks } from "@/queries/stocks";
import { useEffect, useMemo, useState } from "react";

import { StockListOverview } from "./stock-list-overview";

export function StockList() {
  const { pageNumber, setPageNumber } = usePagePagination();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
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
  } = useStocks(pageNumber, search, branchId?.id, startDate, endDate);

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
          <DateFilter
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            startDate={startDate}
            endDate={endDate}
          />
          <div className="flex items-end justify-end w-full gap-2">
            <ExportToCsv
              fileName="stocks"
              items={stocks?.data?.records ?? []}
              csvData={csvData}
            />
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
        <PaginationComponent
          isFetching={isFetching}
          totalPages={stocks?.data?.meta?.numberOfPages ?? 0}
          isPlaceholderData={isPlaceholderData}
          items={stocks?.data?.records ?? []}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </div>
    </div>
  );
}
