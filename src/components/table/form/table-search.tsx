"use client";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

type TableSearchProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};
const TableSearchInput = ({
  value,
  onChange,
  placeholder,
}: TableSearchProps) => {
  return (
    <div className="relative">
      <Input
        placeholder={placeholder}
        type="search"
        value={value}
        onChange={onChange}
        className="max-w-sm pl-10  h-10   border border-gray-300 rounded-md text-gray-700 focus:ring-primary-500 focus:border-primary-500 focus:ring-1 focus:ring-offset-1 focus:ring-offset-primary-500 focus:ring-opacity-50 focus:outline-none sm:text-sm"
      />
      <MagnifyingGlassIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground size-5" />
    </div>
  );
};

export default TableSearchInput;
