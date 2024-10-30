import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2 py-2 border shadow-md rounded-b-lg">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <span className="sr-only">Go to previous page</span>
          Previous
        </Button>

        {/* {[
					table.getState().pagination.pageIndex - 1,
					table.getState().pagination.pageIndex,
					table.getState().pagination.pageIndex + 1,
				].map((value, index) => {
					if (value < 0) {
						return null;
					}
					if (value >= table.getPageCount()) {
						return null;
					}

					return (
						<Button
							key={index}
							variant='outline'
							className={cn(`h-8 w-8 p-0`, {
								'bg-emerald-500 text-white':
									table.getState().pagination.pageIndex === value,
							})}
							onClick={() => table.setPageIndex(value)}>
							{value + 1}
						</Button>
					);
				})} */}

        <Button
          variant="outline"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="sr-only">Go to next page</span>
          Next
        </Button>
      </div>
      <div className="flex-1 text-sm text-muted-foreground">
        {/* {table.getFilteredSelectedRowModel().rows.length} of{' '}
				{table.getFilteredRowModel().rows.length} row(s) selected. */}
        {/* showing 1 - 10 of total items */}
        {/* Showing{' '}
				{table.getState().pagination.pageSize *
					table.getState().pagination.pageIndex +
					1}{' '}
				-{' '}
				{Math.min(
					table.getState().pagination.pageSize *
						(table.getState().pagination.pageIndex + 1),
					table.getState().pagination.pageSize * table.getPageCount()
				)}{' '}
				from {table.getFilteredRowModel().rows.length} items */}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium text-muted-500">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
      </div>
    </div>
  );
}
