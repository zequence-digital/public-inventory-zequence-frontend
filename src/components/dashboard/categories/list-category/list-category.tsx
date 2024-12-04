"use client";

import { cn, formatDate } from "@/lib/utils";
import { useMemo, useState } from "react";

import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { DataTable } from "@/components/table/ui/data-table";
import { DataTableSearchInput } from "@/components/table/ui/data-table-search-input";
import { DateFilter } from "@/components/filters/date-filter";
import { ExportToCsv } from "@/components/table/ui/export-to-csv";
import { PaginationComponent } from "@/components/ui/pagination";
import { categoriesColumns } from "./data/categories-column";
import { useCategories } from "@/queries/categories";

export function CategoryList() {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [pageNumber, setPageNumber] = useState(1);

  const {
    data: categories,
    isPending,
    isError,
    isPlaceholderData,
    isFetching,
    error,
  } = useCategories(10, pageNumber, search, startDate, endDate);

  const csvData = useMemo(() => {
    if (categories?.data?.records) {
      return categories.data.records.map((category) => ({
        id: category.guid,
        name: category.name,
        description: category.description,
        status: category.status,
        category: category.categoryType,
        date: formatDate(category.createdAt),
      }));
    }
    return [];
  }, [categories]);

  if (isError) {
    return <ApiErrorMessage message={error.message} />;
  }

  return (
    <div>
      <div className="text-slate-700 text-lg font-semibold my-4 leading-7">
        Category listings
      </div>
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
              fileName="categories"
              items={categories?.data?.records ?? []}
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
          isPending={isPending}
          message="No categories found"
          className={cn(` rounded-b-none`, {})}
          columns={categoriesColumns}
          data={categories?.data?.records ?? []}
        />
        <PaginationComponent
          totalPages={categories?.data?.meta?.numberOfPages ?? 0}
          isPlaceholderData={isPlaceholderData}
          items={categories?.data?.records ?? []}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      </div>
    </div>
  );
}
