"use client";

import { useMemo, useState } from "react";

import { AddStockTransferForm } from "./add-stock-transfer-form";
import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { DataTable } from "@/components/table/ui/data-table";
import { DataTableSearchInput } from "@/components/table/ui/data-table-search-input";
import { ExportToCsv } from "@/components/table/ui/export-to-csv";
import { PaginationComponent } from "@/components/ui/pagination";
import { formatDate } from "@/lib/utils";
import { stockTransferColumns } from "@/components/table/data/stocks/stock-transfer-column";
import { useStockTransfer } from "@/queries/stocks";

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
    <>
      <AddStockTransferForm />
      <div className="py-4 w-full space-y-2">
        <div className=" mb-4 flex w-full items-center justify-between gap-1">
          {/* Filters */}
          <div className="flex items-end justify-end w-full gap-2">
            <ExportToCsv
              fileName="stock-transfers"
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
          message={`No stocks transfer found`}
          isPending={isPending}
          columns={stockTransferColumns}
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
    </>
  );
}
