"use client";

import { useMemo, useState } from "react";

import { ApiErrorMessage } from "@/components/messages/api-error-message";
import CustomButton from "../../custom-button";
import { DataTable } from "@/components/table/ui/data-table";
import { DataTableSearchInput } from "@/components/table/ui/data-table-search-input";
import { ExportToCsv } from "@/components/table/ui/export-to-csv";
import { NoStockUsageFound } from "./no-stock-usage-found";
import { PaginationComponent } from "@/components/ui/pagination";
import { Spinner } from "@/components/spinner";
import { ViewAndAddStockUsageModal } from "./view-and-add-stock-usage";
import { formatDate } from "@/lib/utils";
import plus from "/public/images/plus.svg";
import { stockUsagePackedListColumns } from "./stock-usage-packed-list-column";
import { useGroupStockUsage } from "@/queries/stocks";

export function AllStockUsage() {
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [open, setOpen] = useState(false);
  const {
    data: stockUsage,
    isError,
    error,
    isPlaceholderData,
    isFetching,
    isPending,
  } = useGroupStockUsage(pageNumber, search);

  const csvData = useMemo(() => {
    const tableData = stockUsage?.data?.records.flatMap((stock) =>
      stock.stockUsages.map((usage) => ({
        ...usage,
      })),
    );
    if (!tableData) return [];
    return tableData.map((data) => ({
      "Stock Name": data.stock?.name,
      Category: data.stock?.category?.name,
      "Created At": formatDate(data.createdAt),
      "Quantity Used": data.quantity,
    }));
  }, [stockUsage?.data?.records]);

  if (isError) {
    return <ApiErrorMessage message={error?.message} />;
  }
  return (
    <div>
      <ViewAndAddStockUsageModal open={open} onOpenChange={setOpen} />
      <div className="py-4 w-full space-y-2">
        <div className=" mb-4 flex w-full items-center justify-between gap-1">
          {/* Filters */}
          <div className="flex lg:items-center gap-2 justify-between w-full">
            <ExportToCsv
              fileName="stock-usage"
              csvData={csvData}
              items={stockUsage?.data?.records ?? []}
            />

            <div className="flex max-lg:flex-col items-end ml-auto lg:items-center gap-2">
              <DataTableSearchInput
                searchText={search}
                setSearchText={setSearch}
                placeholder="Search for item"
              />
              <CustomButton
                onClick={() => setOpen(true)}
                src={plus}
                label="Update usage"
                className="bg-primary-100 text-white border-primary-100 hover:bg-primary-100/90 flex items-center justify-center"
                pendingLabel={<Spinner className=" border-white" />}
              />
            </div>
          </div>
        </div>
        <DataTable
          message={<NoStockUsageFound />}
          isPending={isPending}
          columns={stockUsagePackedListColumns ?? []}
          data={stockUsage?.data?.records ?? []}
        />
        <PaginationComponent
          totalPages={stockUsage?.data?.meta?.numberOfPages ?? 0}
          isPlaceholderData={isPlaceholderData}
          items={stockUsage?.data?.records ?? []}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </div>
    </div>
  );
}
