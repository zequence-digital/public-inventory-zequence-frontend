"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../ui/data-table-column-header";
import { DateFormat } from "@/components/ui/date-format";
import type { GetStockTransfer } from "@/types";
import Image from "next/image";
import Link from "next/link";
import SvgEdit from "@/components/svg/svg-edit";
import SvgView from "@/components/svg/svg-view";
import { cn } from "@/lib/utils";
import completed from "/public/images/completed.svg";
import pending from "/public/images/pending.svg";

type Stock = GetStockTransfer["data"]["records"][number];

export const stockTransferColumns: ColumnDef<Stock>[] = [
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
      <DataTableColumnHeader column={column} title="Stocks to Transfer" />
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
          <Link href={`/dashboard/stocks/add-stock-transfer/${stock.guid}`}>
            <SvgView className=" stroke-muted-400 hover:stroke-secondary-100 cursor-pointer size-5" />
          </Link>
          <Link
            href={`/dashboard/stocks/add-stock-transfer/${stock.guid}/edit-stock-transfer`}
          >
            <SvgEdit className=" stroke-muted-400 hover:stroke-secondary-100 cursor-pointer size-4" />
          </Link>
        </div>
      );
    },
  },
];
