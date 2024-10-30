"use client";

import { useMemo, useState } from "react";

import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { Spinner } from "@/components/spinner";
import { DataTable } from "@/components/table/ui/data-table";
import { DataTableSearchInput } from "@/components/table/ui/data-table-search-input";
import { formatDate } from "@/lib/utils";
import { useGroupStockUsage } from "@/queries/stocks";
import { CSVLink } from "react-csv";
import CustomButton from "../../custom-button";
import { NoStockUsageFound } from "./no-stock-usage-found";
import { stockUsagePackedListColumns } from "./stock-usage-packed-list-column";
import { ViewAndAddStockUsageModal } from "./view-and-add-stock-usage";
import exportIcon from "/public/icons/import.svg";
import plus from "/public/images/plus.svg";

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

  console.log(stockUsage);

  const csvData = useMemo(() => {
    const stockData = stockUsage?.data.records;
    if (stockData) {
      return stockData.map((stock) => ({
        ID: stock.guid,
        Branch: stock.branch.name,
        Date: formatDate(stock.createdAt),
      }));
    }
    return [];
  }, [stockUsage?.data.records]);

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
            <CSVLink data={csvData} filename={"stockUsage"}>
              <CustomButton src={exportIcon} alt="Export Icon" label="Export" />
            </CSVLink>
            <div className="flex max-lg:flex-col lg:items-center gap-2">
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
                if (
                  !isPlaceholderData &&
                  stockUsage?.data?.meta?.numberOfPages
                ) {
                  setPageNumber((old) => old + 1);
                }
              }}
              disabled={
                isPlaceholderData ||
                stockUsage?.data?.meta?.numberOfPages === pageNumber
              }
            />
          </div>
          <span>
            page {pageNumber} of {stockUsage?.data?.meta?.numberOfPages}
          </span>
        </div>
      </div>
    </div>
  );
}
