"use client";

import { useMemo, useState } from "react";

import { ApiErrorMessage } from "@/components/messages/api-error-message";
import { CSVLink } from "react-csv";
import CustomButton from "../custom-button";
import { DataTable } from "@/components/table/ui/data-table";
import { DataTableSearchInput } from "@/components/table/ui/data-table-search-input";
import { PaginationComponent } from "@/components/ui/pagination";
import { ProductListOverview } from "./product-list-overview";
import exportIcon from "/public/icons/import.svg";
import { formatDate } from "@/lib/utils";
import { productsColumns } from "@/components/table/data/products/products-columns";
import { useProducts } from "@/queries/products";

export function ProductList() {
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const {
    data: products,
    isPending,
    isPlaceholderData,
    isFetching,
    isError,
    error,
  } = useProducts(pageNumber, search);

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
        date: formatDate(product.createdAt),
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
          <div className="flex items-end justify-end w-full gap-2">
            <CSVLink data={csvData} filename={"products"}>
              <CustomButton src={exportIcon} alt="Export Icon" label="Export" />
            </CSVLink>
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
