"use client";

import { Active, Archived, Inactive } from "@/assets";
import { cn, formatDate } from "@/lib/utils";

import type { AllCategory } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/table/ui/data-table-column-header";
import { DeleteCategory } from "@/components/delete-table-item/delete-category";
import Image from "next/image";
import Link from "next/link";
import SvgEdit from "@/components/svg/svg-edit";

type Category = AllCategory["data"]["records"][number];
export const categoriesColumns: ColumnDef<Category>[] = [
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
      <DataTableColumnHeader column={column} title="Category Name" />
    ),
  },
  {
    accessorKey: "categoryType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category Type" />
    ),
  },
  {
    accessorKey: "guid",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Category ID" />;
    },
    cell: ({ row }) => {
      const id = row.getValue("guid") as Category["guid"];

      return (
        <div className="flex flex-col gap-1">{`${id.slice(0, 8)}...`}</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as Category["createdAt"];

      return <div>{formatDate(createdAt?.toString())}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Modified" />
    ),
    cell: ({ row }) => {
      const updatedBy = row.getValue("updatedAt") as Category["updatedAt"];

      return <div>{formatDate(updatedBy?.toString())}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Status" />;
    },
    cell: ({ row }) => {
      const status = row.getValue("status") as Category["status"];

      return (
        <div className="flex items-center gap-2">
          {status === "ACTIVE" && (
            <Image src={Active} alt="Active" width={62} height={20} />
          )}
          {status === "INACTIVE" && (
            <Image src={Inactive} alt="Inactive" width={87} height={20} />
          )}
          {status === "ARCHIVED" && (
            <Image src={Archived} alt="Archived" width={85} height={20} />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
  },

  {
    id: "id",
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex gap-4 items-center">
          <DeleteCategory id={category.guid} />
          <Link
            href={`/dashboard/categories/list-categories/${category.guid}/edit-category`}
          >
            <SvgEdit className=" stroke-muted-400 hover:stroke-secondary-100 cursor-pointer size-4" />
          </Link>
        </div>
      );
    },
  },
];
