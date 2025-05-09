"use client";

import { DateFilter } from "@/components/filters/date-filter";
import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { productsColumns } from "@/components/table/data/products/products-columns";
import { DataTable } from "@/components/table/ui/data-table";
import { DataTableSearchInput } from "@/components/table/ui/data-table-search-input";
import { ExportToCsv } from "@/components/table/ui/export-to-csv";
import { PaginationComponent } from "@/components/ui/pagination";
import { usePagePagination } from "@/hooks/use-page-pagination";
import { formatDate } from "@/lib/utils";
import { useProducts } from "@/queries/products";
import { useMemo, useState } from "react";

import { ProductListOverview } from "./product-list-overview";

export function ProductList() {
  const [search, setSearch] = useState("");
  const { pageNumber, setPageNumber } = usePagePagination();
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const {
    data: products,
    isPending,
    isPlaceholderData,
    isFetching,
    isError,
    error,
  } = useProducts(pageNumber, search, startDate, endDate);

  const csvData = useMemo(() => {
    if (products?.data?.records) {
      return products.data.records.map((product) => ({
        id: product.guid,
        name: product.name,
        status: product.status,
        notes: product.notes,
        category: product.category.name,
        quantity: product.quantity,
        branch: product.branch,
        startDate: formatDate(product.createdAt),
      }));
    }
    return [];
  }, [products]);

  if (isError) {
    return <ApiErrorMessage message={error.message} />;
  }

  return (
    <div>
      <ProductListOverview isPending={isPending} products={products} />
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
              fileName="products"
              items={products?.data?.records ?? []}
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
          message={"No products found"}
          isPending={isPending}
          columns={productsColumns}
          data={products?.data?.records ?? []}
        />
        <PaginationComponent
          isFetching={isFetching}
          totalPages={products?.data?.meta?.numberOfPages ?? 0}
          isPlaceholderData={isPlaceholderData}
          items={products?.data?.records ?? []}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </div>
    </div>
  );
}
