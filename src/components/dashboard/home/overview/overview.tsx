"use client";

import {} from "react-csv";

import { cn, formatDate } from "@/lib/utils";
import {
  useDashboardItems,
  useDashboardOverview,
} from "@/queries/dashboard-overview";
import { useMemo, useState } from "react";

import { ProductOverview } from "@/components/dashboard/home/product-overview";
import { StockOverview } from "@/components/dashboard/home/stock-overview";
import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { allItemsColumn } from "@/components/table/data/all-items-columns";
import { DataTable } from "@/components/table/ui/data-table";
import { DataTableSearchInput } from "@/components/table/ui/data-table-search-input";
import { ExportToCsv } from "@/components/table/ui/export-to-csv";
import { PaginationComponent } from "@/components/ui/pagination";
import { useDashboardItemsStore } from "@/store/use-dashboard-items";

export function Overview() {
  const { item } = useDashboardItemsStore();
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: overview,
    isError: isErrorOverview,
    isPending: pendingOverview,
    error: errorOverview,
  } = useDashboardOverview();

  const {
    data: items,
    isError: isErrorItems,
    isPending: pendingItems,
    isPlaceholderData,
    isFetching,
    error: errorItems,
  } = useDashboardItems(item, pageNumber, search);

  const csvData = useMemo(() => {
    if (items?.data?.records) {
      return items.data.records.map((item) => {
        return {
          id: item.guid,
          name: item.name,
          category: item.category.categoryType,
          quantity: item.quantity,
          branch: item.branch,
          note: item.note,
          status: item.status,
          date: formatDate(item.createdAt),
        };
      });
    }
    return [];
  }, [items]);

  if (isErrorOverview || isErrorItems) {
    return (
      <ApiErrorMessage
        message={
          errorOverview?.message || errorItems?.message || "An error occurred"
        }
      />
    );
  }

  return (
    <div className="mx-auto py-10 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ProductOverview isPending={pendingOverview} products={overview} />
        <StockOverview isPending={pendingOverview} stocks={overview} />
      </div>
      <div className="py-4 w-full space-y-2">
        <div className=" mb-4 flex w-full items-center justify-between gap-1">
          {/* Filters */}
          <div className="flex items-end justify-end w-full gap-2">
            <ExportToCsv
              fileName="overview"
              items={items?.data?.records ?? []}
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
          isPending={pendingItems}
          className={cn(` rounded-b-none`, {})}
          columns={allItemsColumn}
          data={items?.data?.records ?? []}
        />
        <PaginationComponent
          totalPages={items?.data?.meta?.numberOfPages ?? 0}
          isPlaceholderData={isPlaceholderData}
          items={items?.data?.records ?? []}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </div>
    </div>
  );
}
