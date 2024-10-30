"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { useDashboardItemsStore } from "@/store/use-dashboard-items";
import { CaretSortIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import check from "/public/images/check.svg";

export function DashboardItemsDropdown() {
  const { item, setItem } = useDashboardItemsStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1">
        <span className=" whitespace-nowrap">
          {item === "ALL"
            ? "All Items"
            : item === "PRODUCT"
              ? "Product"
              : "Stock"}
        </span>
        <CaretSortIcon className=" inline-block font-semibold text-black" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className={cn(``, {
            "bg-gray-100": item === "ALL",
          })}
          onClick={() => setItem("ALL")}
        >
          <span className="flex items-center w-full justify-between gap-1">
            All Items
            {item === "ALL" && (
              <Image src={check} alt="check" width={20} height={20} />
            )}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setItem("PRODUCT")}>
          <span className="flex items-center w-full justify-between gap-1">
            Products
            {item === "PRODUCT" && (
              <Image src={check} alt="check" width={20} height={20} />
            )}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setItem("STOCK")}>
          <span className="flex items-center w-full justify-between gap-1">
            Stocks
            {item === "STOCK" && (
              <Image src={check} alt="check" width={20} height={20} />
            )}
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
