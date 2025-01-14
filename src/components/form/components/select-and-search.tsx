"use client";

import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props<T> {
  data: T[];
  className?: string;
  searchKey?: keyof T;
  placeholder?: string;
  emptyMessage?: string;
  notFoundMessage?: string;
  value?: string;
  onSelect?: (value: T) => void;
  renderItem: (item: T) => string;
  keyExtractor: (item: T) => string;
}

export function SelectAndSearch<T>({
  data,
  className,
  searchKey,
  placeholder,
  emptyMessage,
  notFoundMessage,
  value,
  renderItem,
  keyExtractor,
  onSelect,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [retrievedData, setRetrievedData] = useState<T[]>([]);

  useEffect(() => {
    setRetrievedData(data);
  }, [data]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full h-[50px] border border-muted-300 rounded-md justify-between",
            !value && "text-muted-foreground",
          )}
        >
          {value
            ? String(
                retrievedData?.find((item) => keyExtractor(item) === value)?.[
                  searchKey as keyof T
                ],
              )
            : emptyMessage}
          <ChevronDownIcon className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <div className="w-full">
        <PopoverContent className={cn(`w-full p-0`, className)}>
          <Command className="w-full">
            <CommandInput placeholder={placeholder} className="h-9 w-full" />
            <CommandList>
              <CommandEmpty>{notFoundMessage}</CommandEmpty>
              <CommandGroup>
                {retrievedData?.map((item) => (
                  <CommandItem
                    key={keyExtractor(item)}
                    value={value}
                    onSelect={() => {
                      onSelect?.(item);
                      setOpen(false);
                    }}
                  >
                    {String(item?.[searchKey as keyof T])}
                    <CheckIcon
                      className={cn(
                        "ml-auto",
                        value === keyExtractor(item)
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </div>
    </Popover>
  );
}
