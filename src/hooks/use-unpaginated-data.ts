import { useEntireCategories } from "@/queries/categories";
import { useEntireProducts } from "@/queries/products";
import { useEntireStock } from "@/queries/stocks";
import { useMemo } from "react";

export const useUnpaginatedData = () => {
  const {
    data: entireCategory,
    isPending: pendingEntireCategory,
    isError: isErrorEntireCategory,
    error: errorEntireCategory,
  } = useEntireCategories();
  const {
    data: entireProduct,
    isPending: pendingEntireProduct,
    isError: isErrorEntireProduct,
    error: errorEntireProduct,
  } = useEntireProducts();
  const {
    data: entireStock,
    isPending: pendingEntireStock,
    isError: isErrorEntireStock,
    error: errorEntireStock,
  } = useEntireStock();
  const activeProducts = useMemo(() => {
    return entireProduct?.filter(
      (product) => product.status !== "OUT_OF_STOCK",
    );
  }, [entireProduct]);

  return {
    activeProducts,
    entireCategory,
    pendingEntireCategory,
    isErrorEntireCategory,
    errorEntireCategory,
    entireProduct,
    pendingEntireProduct,
    isErrorEntireProduct,
    errorEntireProduct,
    entireStock,
    pendingEntireStock,
    isErrorEntireStock,
    errorEntireStock,
  };
};
