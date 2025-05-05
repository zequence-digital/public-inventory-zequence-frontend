"use client";

import { DateFilter } from "@/components/filters/date-filter";
import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { DataTable } from "@/components/table/ui/data-table";
import { DataTableSearchInput } from "@/components/table/ui/data-table-search-input";
import { ExportToCsv } from "@/components/table/ui/export-to-csv";
import { PaginationComponent } from "@/components/ui/pagination";
import { usePagePagination } from "@/hooks/use-page-pagination";
import { formatDate } from "@/lib/utils";
import { useAllGroupSalesViaQuery, useGroupSales } from "@/queries/sales";
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

  const { data: allSales } = useAllGroupSalesViaQuery();

  const csvData = useMemo(() => {
    // const invoiceData =
    //   sales?.data?.records?.flatMap((sale) => {
    //     return Array.isArray(sale?.invoiceLogData) ? sale.invoiceLogData : [];
    //   }) ?? [];

    // return invoiceData.map((invoice) => ({
    //   ID: invoice?.productData?.guid ?? "N/A",
    //   Category: invoice?.productData?.category?.name ?? "N/A",
    //   Branch: invoice?.productData?.branch ?? "N/A",
    //   "Customer Type": invoice?.customerType ?? "N/A",
    //   Item: invoice?.productData?.name ?? "N/A",
    //   Rate: invoice?.rate ? invoice.rate.toLocaleString() : "0",
    //   "Quantity Requested": invoice?.quantityRequested ?? 0,
    //   Price: invoice?.amount ? invoice.amount.toLocaleString() : "0",
    //   Date: invoice?.productData?.createdAt
    //     ? formatDate(invoice.productData.createdAt)
    //     : "N/A",
    // }));

    // const allInvoices =
    //   sales?.data?.records?.flatMap((sale) => {
    //     return (sale?.invoiceLogData ?? []).map((invoice) => ({
    //       "Ref. Number": sale?.salesRefNumber ?? "N/A",
    //       "Date Created": sale?.createdAt ? formatDate(sale.createdAt) : "N/A",
    //       Category: invoice?.productData?.category?.name ?? "N/A",
    //       Branch: invoice?.productData?.branch ?? "N/A",
    //       Item: invoice?.productData?.name ?? "N/A",
    //       "Customer Type": invoice?.customerType ?? "N/A",
    //       Rate:
    //         invoice?.rate != null ? `₦${invoice.rate.toLocaleString()}` : "₦0",
    //       "Quantity Requested": invoice?.quantityRequested ?? 0,
    //       Price:
    //         invoice?.amount != null
    //           ? `₦${invoice.amount.toLocaleString()}`
    //           : "₦0",
    //     }));
    //   }) ?? [];

    // return allInvoices;

    const invoiceData =
      allSales?.flatMap((sale) => sale?.invoiceLogData ?? []) ?? [];

    return invoiceData.map((invoice) => ({
      "Ref. Number": invoice?.productData?.referenceNumber ?? "N/A",
      "Date Created": invoice?.productData?.createdAt
        ? formatDate(invoice.productData.createdAt)
        : "N/A",
      Category: invoice?.productData?.category?.name ?? "N/A",
      Branch: invoice?.productData?.branch ?? "N/A",
      Item: invoice?.productData?.name ?? "N/A",
      "Customer Type": invoice?.customerType ?? "N/A",
      Rate: invoice?.rate != null ? `₦${invoice.rate.toLocaleString()}` : "₦0",
      "Quantity Requested": invoice?.quantityRequested ?? 0,
      Price:
        invoice?.amount != null ? `₦${invoice.amount.toLocaleString()}` : "₦0",
    }));
  }, [allSales]);

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
