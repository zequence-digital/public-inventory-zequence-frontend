// "use client";

// import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";
// import { useState } from "react";

// interface Props<T> {
//   data: T[];
// }

// export function SearchAndSelect({ data }: Props<T>) {
//   const [open, setOpen] = useState(false);
//   const [value, setValue] = useState("");

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="w-full justify-between"
//         >
//           {value
//             ? data.find((item) => item.value === value)?.label
//             : "Select framework..."}
//           <ChevronDownIcon className="opacity-50" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-full p-0">
//         <Command>
//           <CommandInput placeholder="Search framework..." className="h-9" />
//           <CommandList>
//             <CommandEmpty>No framework found.</CommandEmpty>
//             <CommandGroup>
//               {frameworks.map((framework) => (
//                 <CommandItem
//                   key={framework.value}
//                   value={framework.value}
//                   onSelect={(currentValue) => {
//                     setValue(currentValue === value ? "" : currentValue);
//                     setOpen(false);
//                   }}
//                 >
//                   {framework.label}
//                   <CheckIcon
//                     className={cn(
//                       "ml-auto",
//                       value === framework.value ? "opacity-100" : "opacity-0",
//                     )}
//                   />
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }
