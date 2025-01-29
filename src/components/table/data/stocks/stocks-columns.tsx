"use client";

import { InStock, OutOfStock, RunningOut } from "@/assets";
import { DeleteStock } from "@/components/delete-table-item/delete-stock";
import SvgEdit from "@/components/svg/svg-edit";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { AllStock } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

import { DataTableColumnHeader } from "../../ui/data-table-column-header";

type Stock = AllStock["data"]["records"][number];

export const stocksColumns: ColumnDef<Stock>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stocks" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category = row.getValue("category") as Stock["category"];
      return <div>{category.name}</div>;
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
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      const status = row.getValue("status");
      return (
        <div className="flex items-center gap-2">
          {status === "IN_STOCK" && (
            <Image src={InStock} alt="In stock" width={62} height={20} />
          )}
          {status === "OUT_OF_STOCK" && (
            <Image src={OutOfStock} alt="Out of stock" width={87} height={20} />
          )}
          {status === "RUNNING_OUT" && (
            <Image src={RunningOut} alt="Running out" width={85} height={20} />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "branch",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
    cell: ({ row }) => {
      const branch = row.getValue("branch") as Stock["branch"];
      return <div>{branch.name}</div>;
    },
  },
  {
    accessorKey: "notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Note" />
    ),
    cell: ({ row }) => {
      const notes = row.getValue("notes") as Stock["notes"];

      return (
        <div className=" whitespace-nowrap">
          {notes === null ? "No notes" : notes}
        </div>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const stock = row.original;

      return (
        <div className="flex gap-4 items-center">
          <DeleteStock id={stock.guid} />
          <Link href={`/dashboard/stocks/list-stock/${stock.guid}/edit-stock`}>
            <SvgEdit className=" stroke-muted-400 hover:stroke-secondary-100 cursor-pointer size-4" />
          </Link>
        </div>
      );
    },
  },
];
