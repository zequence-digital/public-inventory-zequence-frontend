"use client";

import type { AllSalesData } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/ui/data-table-column-header";
import { DeleteSales } from "@/components/delete-table-item/delete-sales";
import Link from "next/link";
import SvgEdit from "@/components/svg/svg-edit";
import { cn } from "@/lib/utils";

type Sales = AllSalesData["data"]["records"][number];

export const salesColumns: ColumnDef<Sales>[] = [
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
    accessorKey: "product",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
    cell: ({ row }) => {
      const product = row.getValue("product") as Sales["product"];
      return <div>{product?.name}</div>;
    },
  },
  {
    accessorKey: "branch",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
    cell: ({ row }) => {
      const branch = row.getValue("branch") as Sales["branch"];
      return <div className=" whitespace-nowrap">{branch?.name}</div>;
    },
  },
  {
    accessorKey: "quantityRequested",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => {
      const quantity = row.getValue(
        "quantityRequested",
      ) as Sales["quantityRequested"];
      return <div>{quantity.toLocaleString()}</div>;
    },
  },

  {
    accessorKey: "product",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Rate" />;
    },
    cell: ({ row }) => {
      const rate = row.getValue("product") as Sales["product"];
      return (
        <div className=" whitespace-nowrap">
          NGN {rate?.price?.toLocaleString()}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const totalAmount = row.getValue("amount") as Sales["amount"];
      return (
        <div className=" whitespace-nowrap">
          NGN {totalAmount.toLocaleString()}
        </div>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const sales = row?.original;

      return (
        <div className="flex gap-4 items-center">
          <DeleteSales id={sales.guid} />
          <Link href={`/dashboard/sales/add-sales/${sales.guid}/edit-sales`}>
            <SvgEdit className=" stroke-muted-400 hover:stroke-secondary-100 cursor-pointer size-4" />
          </Link>
        </div>
      );
    },
  },
];
