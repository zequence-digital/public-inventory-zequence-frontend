"use client";

import { cn } from "@/lib/utils";
import CustomButton from "../dashboard/custom-button";

interface Props<T> {
  items: T;
  pageNumber: number;
  isFetching?: boolean;
  totalPages: number;
  setPageNumber: (pageNumber: number) => void;
  isPlaceholderData: boolean;
}

export function PaginationComponent<T>({
  items,
  pageNumber,
  isFetching,
  setPageNumber,
  totalPages,
  isPlaceholderData,
}: Props<T>) {
  return (
    <div>
      {Array.isArray(items) && items.length > 0 && (
        <div className=" w-full items-center flex justify-between">
          <div className="flex items-center gap-2">
            <CustomButton
              className={cn(`border border-gray-300`, {
                "text-gray-300 shadow-none":
                  isPlaceholderData || pageNumber === 1,
              })}
              label="Previous page"
              onClick={() => {
                if (!isPlaceholderData && pageNumber > 1) {
                  setPageNumber(pageNumber - 1);
                }
              }}
              disabled={isPlaceholderData || pageNumber === 1}
            />
            <CustomButton
              className={cn(`border border-gray-300`, {
                "text-gray-300 shadow-none":
                  isPlaceholderData || totalPages === pageNumber,
              })}
              isPending={isFetching}
              label="Next page"
              onClick={() => {
                if (!isPlaceholderData && totalPages) {
                  setPageNumber(pageNumber + 1);
                }
              }}
              disabled={isPlaceholderData || totalPages === pageNumber}
            />
          </div>
          <span>
            page {pageNumber} of {totalPages}
          </span>
        </div>
      )}
    </div>
  );
}
