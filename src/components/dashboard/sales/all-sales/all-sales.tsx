"use client";

import { DateFilter } from "@/components/filters/date-filter";
import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { DataTable } from "@/components/table/ui/data-table";
import { DataTableSearchInput } from "@/components/table/ui/data-table-search-input";
import { ExportToCsv } from "@/components/table/ui/export-to-csv";
import { PaginationComponent } from "@/components/ui/pagination";
import { usePagePagination } from "@/hooks/use-page-pagination";
import { formatDate } from "@/lib/utils";
import { useGroupSales } from "@/queries/sales";
import { useMemo, useState } from "react";

import { allSalesColumns } from "./table-data/all-sales-column";

export function AllSales() {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const { pageNumber, setPageNumber } = usePagePagination();
  const {
    data: sales,
    isError,
    error,
    isPlaceholderData,
    isFetching,
    isPending,
  } = useGroupSales(pageNumber, search);

  const csvData = useMemo(() => {
    const invoiceData = sales?.data?.records
      ?.map((sale) => sale?.invoiceLogData)
      .flatMap((invoice) => invoice);
    if (invoiceData) {
      return invoiceData.map((invoice) => ({
        ID: invoice?.productData?.guid,
        Category: invoice?.productData?.category?.name,
        Branch: invoice?.productData?.branch,
        "Customer Type": invoice?.customerType,
        Item: invoice?.productData.name,
        Rate: invoice?.rate?.toLocaleString(),
        "Quantity Requested": invoice?.quantityRequested,
        Price: invoice?.amount?.toLocaleString(),
        Date: formatDate(invoice?.productData?.createdAt),
      }));
    }
    return [];
  }, [sales?.data?.records]);

  if (isError) {
    return <ApiErrorMessage message={error?.message} />;
  }
  return (
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
            fileName="sales"
            csvData={csvData}
            items={sales?.data?.records ?? []}
          />
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
      <PaginationComponent
        isFetching={isFetching}
        totalPages={sales?.data?.meta?.numberOfPages ?? 0}
        isPlaceholderData={isPlaceholderData}
        items={sales?.data?.records ?? []}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
      />
    </div>
  );
}
