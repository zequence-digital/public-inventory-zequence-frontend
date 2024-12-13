"use client";

import { useMemo, useState } from "react";

import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { stockRequestColumns } from "@/components/table/data/stocks/stock-request-column";
import { DataTable } from "@/components/table/ui/data-table";
import { DataTableSearchInput } from "@/components/table/ui/data-table-search-input";
import { ExportToCsv } from "@/components/table/ui/export-to-csv";
import { PaginationComponent } from "@/components/ui/pagination";
import { formatDate } from "@/lib/utils";
import { useStockRequest } from "@/queries/stocks";
import { StockRequestForm } from "./stock-request-form";

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
            <ExportToCsv
              fileName="stock-requests"
              csvData={csvData}
              items={stocks?.data?.records ?? []}
            />
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
        <PaginationComponent
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
