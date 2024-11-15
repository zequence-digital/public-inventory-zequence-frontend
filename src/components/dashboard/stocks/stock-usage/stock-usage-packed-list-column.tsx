"use client";

import { cn, formatDate } from "@/lib/utils";

import { DeleteGroupStockUsage } from "@/components/delete-table-item/delete-group-stock-usage";
import { DataTableColumnHeader } from "@/components/table/ui/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import type { GetAllGroupStockUsage } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ViewAndPrintStockUsageModal } from "./view-and-print-stock-usage";

type StockUsage = GetAllGroupStockUsage["data"]["records"][number];

export const stockUsagePackedListColumns: ColumnDef<StockUsage>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className={cn(`ml-2 border border-muted-400`, {
          "data-[state=checked]:bg-transparent data-[state=checked]:text-muted-400":
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate"),
        })}
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className={cn(` border border-muted-400`, {
          "data-[state=checked]:bg-transparent data-[state=checked]:text-muted-400":
            row.getIsSelected(),
        })}
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "stockUsages",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock Names" />
    ),
    cell: ({ row }) => {
      const stocks = row.getValue("stockUsages") as StockUsage["stockUsages"];
      return (
        <div>
          {stocks?.map((stock) => (
            <div key={stock.guid}>{stock.stock?.name}</div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as StockUsage["createdAt"];
      return <div>{formatDate(date)}</div>;
    },
  },
  {
    accessorKey: "stockUsages",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const stocks = row.getValue("stockUsages") as StockUsage["stockUsages"];
      return (
        <div>
          {stocks?.map((stock) => (
            <div key={stock.guid}>{stock.stock?.category?.name}</div>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "stockUsages",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => {
      const quantity = row.getValue("stockUsages") as StockUsage["stockUsages"];
      return (
        <div>
          {quantity?.map((stock) => (
            <div key={stock.guid}>{stock.quantity}</div>
          ))}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const sales = row.original;

      return (
        <div className="flex items-center gap-4">
          <ViewAndPrintStockUsageModal id={sales.guid} />
          <DeleteGroupStockUsage id={sales.guid} />
        </div>
      );
    },
  },
];
