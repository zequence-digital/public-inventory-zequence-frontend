"use client";

import { Table, flexRender } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { cn } from "@/lib/utils";

interface TableHeadingProps<TData>
  extends React.HTMLAttributes<HTMLTableElement> {
  table: Table<TData>;
  className?: string;
}
export function TableHeading<TData>({
  table,
  className,
}: TableHeadingProps<TData>) {
  return (
    <TableHeader className={cn(`bg-gray-200`, className)}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}
