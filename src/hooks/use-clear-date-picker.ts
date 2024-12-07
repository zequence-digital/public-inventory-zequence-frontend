import { DateRange } from "react-day-picker";
import categoryKeys from "@/queries/categories/category-keys";
import productKeys from "@/queries/products/product-keys";
import stockKeys from "@/queries/stocks/stock-keys";
import { useQueryClient } from "@tanstack/react-query";

const queryKeys = [productKeys.read, stockKeys.read, categoryKeys.read];

export function useClearDatePicker({
  setDate,
  setStartDate,
  setEndDate,
}: {
  setDate: (date: DateRange | undefined) => void;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
}) {
  const queryClient = useQueryClient();
  return () => {
    setDate(undefined);
    setStartDate(undefined);
    setEndDate(undefined);
    queryKeys.forEach((key) => {
      queryClient.invalidateQueries({
        queryKey: [key],
      });
    });
  };
}
