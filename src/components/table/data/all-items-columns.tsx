"use client";

import { InStock, OutOfStock, RunningOut } from "@/assets";
import { cn, formatDate } from "@/lib/utils";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import type { DashboardItems } from "@/types";
import { DashboardItemsDropdown } from "@/components/dashboard/home/item-dropdown";
import { DataTableColumnHeader } from "../ui/data-table-column-header";
import Image from "next/image";

type AllItems = DashboardItems["data"]["records"][number];
export const allItemsColumn: ColumnDef<AllItems>[] = [
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
    accessorKey: "item",
    header: ({ column, table }) => {
      return (
        <div className="flex item-center gap-1">
          <DashboardItemsDropdown />
          <DataTableColumnHeader column={column} title="" />
        </div>
      );
    },

    cell: ({ row }) => {
      const item = row.getValue("item") as AllItems["item"];

      return <div className="flex flex-col gap-1">{item}</div>;
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Category" />;
    },
    cell: ({ row }) => {
      const category = row.getValue("category") as AllItems["category"];

      return <div className="flex flex-col gap-1">{category.name}</div>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Item Name" />;
    },
    cell: ({ row }) => {
      const name = row.getValue("name") as AllItems["name"];

      return <div className="flex flex-col gap-1">{name}</div>;
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => {
      const quantity = row.getValue("quantity") as AllItems["quantity"];

      return <div>{quantity.toLocaleString()}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as AllItems["status"];

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
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Note" />
    ),
    cell: ({ row }) => {
      const description = row.getValue("category") as AllItems["category"];

      return (
        <div className="flex flex-col gap-1">{description.description}</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as AllItems["createdAt"];

      return <div>{formatDate(createdAt.toString())}</div>;
    },
  },

  // {
  //   id: "id",
  //   header: "",
  //   cell: ({ row }) => {
  //     const id = row.original.category.guid;

  //     return (
  //       <div className="flex gap-4 items-center">
  //         <DeleteDashboardItem id={id} />
  //         <Link href={`/dashboard/overview/${id}/edit-item`}>
  //           <SvgEdit className=" stroke-muted-400 hover:stroke-destructive cursor-pointer size-4" />
  //         </Link>
  //       </div>
  //     );
  //   },
  // },
];
