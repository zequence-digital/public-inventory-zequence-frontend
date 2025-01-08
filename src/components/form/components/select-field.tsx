"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

export const UserRole = ["CEO", "EMPLOYEE"];
export const UserType = ["BUSINESS", "INDIVIDUAL"];

export interface SelectFieldProps {
  name?: string;
  id?: string;
  placeholder?: string;
  defaultValue?: string;
  isPending?: boolean;
  className?: string;
  onValueChange?(value: string): void;
  selectList?: string[] | number[];
}

const SelectField: React.FC<SelectFieldProps> = ({
  placeholder,
  defaultValue,
  isPending,
  name,
  className,
  id,
  onValueChange,
  selectList,
}) => {
  return (
    <Select
      name={name}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
    >
      <SelectTrigger
        className={cn(
          `bg-white border border-muted-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent`,
          className,
          {
            " animate-pulse cursor-not-allowed bg-slate-400": isPending,
          },
        )}
      >
        <SelectValue placeholder={defaultValue ? defaultValue : placeholder} />
      </SelectTrigger>
      <SelectContent>
        {selectList?.map((item, index) => (
          <SelectItem
            id={id}
            key={index}
            value={typeof item === "number" ? item.toString() : item}
          >
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectField;
