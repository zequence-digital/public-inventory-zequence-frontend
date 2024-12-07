"use client";

import { ViewStockRequest } from "@/components/dashboard/stocks/stock-request/view-stock-request";
import SvgEdit from "@/components/svg/svg-edit";
import { Checkbox } from "@/components/ui/checkbox";
import { DateFormat } from "@/components/ui/date-format";
import { cn } from "@/lib/utils";
import type { GetStockRequest } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import { DataTableColumnHeader } from "../../ui/data-table-column-header";
import completed from "/public/images/completed.svg";
import pending from "/public/images/pending.svg";

type Stock = GetStockRequest["data"]["records"][number];

export const stockRequestColumns: ColumnDef<Stock>[] = [
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
    accessorKey: "stockData",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stocks Requested" />
    ),
    cell: ({ row }) => {
      const data = row.getValue("stockData") as Stock["stockData"];
      return <div>{data?.name}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => {
      const quantity = row.getValue("quantity") as Stock["quantity"];
      return <div>{quantity.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Stock["createdAt"];
      return <DateFormat date={date} />;
    },
  },
  {
    accessorKey: "fromBranch",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="From" />
    ),
    cell: ({ row }) => {
      const branchFrom = row.getValue("fromBranch") as Stock["fromBranch"];

      return <div>{branchFrom?.name}</div>;
    },
  },
  {
    accessorKey: "toBranch",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="To" />
    ),
    cell: ({ row }) => {
      const branchFrom = row.getValue("toBranch") as Stock["toBranch"];

      return <div>{branchFrom?.name}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as Stock["status"];

      return (
        <div className="flex items-center gap-2">
          {status === "PENDING" && (
            <Image src={pending} alt="PENDING" width={75} height={24} />
          )}
          {status === "COMPLETED" && (
            <Image src={completed} alt="COMPLETED" width={87} height={24} />
          )}
        </div>
      );
    },
  },

  {
    id: "actions",
    // header: "Actions",
    cell: ({ row }) => {
      const stock = row.original;

      return (
        <div className="flex gap-4 items-center">
          <ViewStockRequest stock={stock} />
          <Link
            href={`/dashboard/stocks/stock-request/${stock.guid}/edit-stock`}
          >
            <SvgEdit className=" stroke-muted-400 hover:stroke-secondary-100 cursor-pointer size-4" />
          </Link>
        </div>
      );
    },
  },
];
