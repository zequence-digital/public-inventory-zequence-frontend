import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type Props = {
  onValueChange?: (value: string) => void;
  isPending?: boolean;
  defaultValue?: string;
  className?: string;
  values: { label: string; value: string | number }[];
};

export function RadioField({
  onValueChange,
  className,
  defaultValue,
  values,
  isPending,
}: Props) {
  if (isPending) {
    return <div>Loading...</div>;
  }

  return (
    <RadioGroup
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className={cn(`flex`, className)}
    >
      {values.map((value) => (
        <Label
          key={value.value}
          className="font-normal flex items-center space-x-2 space-y-0 cursor-pointer"
        >
          <RadioGroupItem
            value={
              typeof value.value === "number"
                ? value.value.toString()
                : value.value
            }
          />
          <span className="text-slate-900 text-sm font-medium leading-tight">
            {value.label}
          </span>
        </Label>
      ))}
    </RadioGroup>
  );
}
