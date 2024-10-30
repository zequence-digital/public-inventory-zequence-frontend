"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useDebounceCallback } from "usehooks-ts";

type Props = {
  searchText: string;
  placeholder: string;
  className?: string;
  setSearchText: (text: string) => void;
};

export const DataTableSearchInput = ({
  searchText,
  setSearchText,
  placeholder,
  className,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = useDebounceCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      setSearchText(term);
      params.set("search", term);
    } else {
      setSearchText("");
      params.delete("search");
    }
    router.replace(` ${pathname}?${params.toString()}`, { scroll: false });
  }, 300);

  return (
    <div className={cn(`relative`, className)}>
      <Input
        placeholder={placeholder}
        type="search"
        onChange={(e) => handleSearch(e.target.value)}
        className="max-w-sm pl-10  h-10   border border-gray-300 rounded-md text-gray-700 focus:ring-primary-500 focus:border-primary-500 focus:ring-1 focus:ring-offset-1 focus:ring-offset-primary-500 focus:ring-opacity-50 focus:outline-none sm:text-sm"
      />
      <MagnifyingGlassIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground size-5" />
    </div>
  );
};
