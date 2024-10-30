"use client";

import { Search } from "@/assets";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";

const SearchBar = () => {
  return (
    <div className="py-3">
      <div className="flex items-center w-full rounded-md relative">
        <Image
          className={cn(
            `absolute top-[0.5rem] left-[0.5rem]  text-gray-400 focus:outline-none`,
          )}
          src={Search}
          alt="search"
          width={20}
          height={20}
        />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full pl-8 bg-white rounded-lg shadow border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-300"
        />
      </div>
    </div>
  );
};

export default SearchBar;
