"use client";

import { cn, formatDate } from "@/lib/utils";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/ui/data-table-column-header";
import type { GroupSales } from "@/types";
import { SalesInvoiceModal } from "../print-sales-modal";

type Sales = GroupSales["data"]["records"][number];

export const allSalesColumns: ColumnDef<Sales>[] = [
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
    accessorKey: "salesRefNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ref. Number" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Sales["createdAt"];
      return <div>{formatDate(date)}</div>;
    },
  },
  {
    accessorKey: "invoiceLogData",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Item" />
    ),
    cell: ({ row }) => {
      const data = row.getValue("invoiceLogData") as Sales["invoiceLogData"];

      return <div>{data?.length}</div>;
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Amount" />
    ),
    cell: ({ row }) => {
      const data = row.getValue("totalAmount") as Sales["totalAmount"];

      return <div>NGN {data.toLocaleString()}</div>;
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const sales = row.original;

      return <SalesInvoiceModal id={sales.guid} />;
    },
  },
];
