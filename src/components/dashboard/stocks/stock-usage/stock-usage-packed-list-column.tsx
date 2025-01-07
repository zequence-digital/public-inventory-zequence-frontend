"use client";

import { DeleteGroupStockUsage } from "@/components/delete-table-item/delete-group-stock-usage";
import { DataTableColumnHeader } from "@/components/table/ui/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { DateFormat } from "@/components/ui/date-format";
import { cn } from "@/lib/utils";
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
      <DataTableColumnHeader column={column} title="Stock" />
    ),
    cell: ({ row }) => {
      const stocks = row.getValue("stockUsages") as StockUsage["stockUsages"];
      const firstStockItem = stocks[0];
      const otherItems = stocks.slice(1);
      return (
        <div>
          <div>{firstStockItem.stock?.name}</div>
          {otherItems.length > 0 && (
            <div className="text-muted-400">+{otherItems.length} more</div>
          )}
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
      return <DateFormat date={date} />;
    },
  },
  {
    accessorKey: "stockUsages",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const stocks = row.getValue("stockUsages") as StockUsage["stockUsages"];
      const firstStockItem = stocks[0];
      const otherItems = stocks.slice(1);
      return (
        <div>
          <div>{firstStockItem.stock?.category?.name}</div>
          {otherItems.length > 0 && (
            <div className="text-muted-400">+{otherItems.length} more</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "stockUsages",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Item" />
    ),
    cell: ({ row }) => {
      const items = row.getValue("stockUsages") as StockUsage["stockUsages"];
      const totalItems = items?.length;
      return (
        <div>
          <div>{totalItems}</div>
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
