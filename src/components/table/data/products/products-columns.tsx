"use client";

import { InStock, OutOfStock, RunningOut } from "@/assets";

import type { AllProduct } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../../ui/data-table-column-header";
import { DateFormat } from "@/components/ui/date-format";
import { DeleteProduct } from "@/components/delete-table-item/delete-product";
import Image from "next/image";
import Link from "next/link";
import SvgEdit from "@/components/svg/svg-edit";
import { cn } from "@/lib/utils";

type Product = AllProduct["data"]["records"][number];
export const productsColumns: ColumnDef<Product>[] = [
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
      <DataTableColumnHeader column={column} title="Product Name" />
    ),
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Category" />;
    },
    cell: ({ row }) => {
      const category = row.getValue("category") as Product["category"];

      return <div className="flex flex-col gap-1">{category.name}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => {
      const quantity = row.getValue("quantity") as Product["quantity"];

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
  },
  {
    accessorKey: "notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Note" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Product["createdAt"];

      return <DateFormat date={createdAt} />;
    },
  },

  {
    id: "id",
    header: "",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex gap-4 items-center">
          <DeleteProduct id={product.guid} />
          <Link
            href={`/dashboard/products/list-products/${product.guid}/edit-product`}
          >
            <SvgEdit className=" stroke-muted-400 hover:stroke-secondary-100 cursor-pointer size-4" />
          </Link>
        </div>
      );
    },
  },
];
