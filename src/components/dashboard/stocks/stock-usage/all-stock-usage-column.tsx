"use client";

import { DeleteStockUsage } from "@/components/delete-table-item/delete-stock-usage";
import SvgEdit from "@/components/svg/svg-edit";
import { DataTableColumnHeader } from "@/components/table/ui/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { DateFormat } from "@/components/ui/date-format";
import { cn } from "@/lib/utils";
import type { GetAllStockUsage } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

type StockUsage = GetAllStockUsage["data"]["records"][number];

export const allStockUsageColumns: ColumnDef<StockUsage>[] = [
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
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock Name" />
    ),
    cell: ({ row }) => {
      const stock = row.getValue("stock") as StockUsage["stock"];
      return <div>{stock?.name}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => {
      const quantity = row.getValue("quantity") as StockUsage["quantity"];
      return <div>{quantity.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const stock = row.getValue("stock") as StockUsage["stock"];
      return <div>{stock?.category?.name}</div>;
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
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const sales = row?.original;

      return (
        <div className="flex gap-4 items-center">
          <DeleteStockUsage sales={sales} />
          <Link
            href={`/dashboard/stocks/stock-usage/${sales.guid}/edit-stock-usage`}
          >
            <SvgEdit className=" stroke-muted-400 hover:stroke-secondary-100 cursor-pointer size-4" />
          </Link>
        </div>
      );
    },
  },
];
