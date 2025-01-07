import type { AllProduct, GetEntireProduct, SingleProduct } from "@/types";
import {
  UndefinedInitialDataOptions,
  UseMutationOptions,
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addProduct,
  deleteProduct,
  getEntireProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "./actions";

import { AuthResponse } from "@/types/auth";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import dashboardOverviewKeys from "../dashboard-overview/dashboard-overview-keys";
import productKeys from "./product-keys";

export function useEntireProducts(
  options?: Omit<
    UndefinedInitialDataOptions<
      GetEntireProduct,
      Error,
      GetEntireProduct,
      string[]
    >,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [productKeys.read, "entire"].filter((key) => key !== undefined);
  return useQuery({
    queryKey: hash,
    queryFn: getEntireProduct,
    ...options,
  });
}

export function useProducts(
  pageNumber: number = 1,
  search: string = "",
  startDate?: Date,
  endDate?: Date,
  options?: Omit<
    UndefinedInitialDataOptions<AllProduct, Error, AllProduct, string[]>,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [
    productKeys.read,
    pageNumber.toString(),
    search,
    startDate?.toISOString(),
    endDate?.toISOString(),
  ].filter((key) => key !== undefined);
  const queryProducts = useQuery({
    queryKey: hash,
    queryFn: () => getProducts(pageNumber, search, startDate, endDate),
    placeholderData: keepPreviousData,
    ...options,
  });

  return queryProducts;
}

export function useProduct(
  id: string,
  options?: Omit<
    UndefinedInitialDataOptions<SingleProduct, Error, SingleProduct, string[]>,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [productKeys.readOne, id.toString()].filter(
    (key) => key !== undefined,
  );
  const queryProduct = useQuery({
    queryKey: hash,
    queryFn: () => getProduct(id),
    ...options,
  });

  return queryProduct;
}

export function useAddProduct(
  ref: React.MutableRefObject<HTMLFormElement | null>,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();
  const createProduct = useMutation({
    mutationFn: addProduct,

    mutationKey: [productKeys.create],
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        if (ref.current) {
          ref.current.reset();
        }

        queryClient.invalidateQueries({
          queryKey: [productKeys.read],
        });
        queryClient.invalidateQueries({
          queryKey: [dashboardOverviewKeys.read],
        });
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return createProduct;
}

export function useEditProduct(
  ref: React.MutableRefObject<HTMLFormElement | null>,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const editProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess(data) {
      if (data.success) {
        if (ref.current) {
          ref.current.reset();
        }
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: [productKeys.read],
        });
        queryClient.invalidateQueries({
          queryKey: [dashboardOverviewKeys.read],
        });
        queryClient.invalidateQueries({
          queryKey: [productKeys.readOne],
        });
        router.push("/dashboard/products/list-products");
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return editProductMutation;
}

export function useDeleteProduct(
  id: string,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const deleteProductMutation = useMutation({
    mutationFn: () => deleteProduct(id),
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: [productKeys.read],
        });
        queryClient.invalidateQueries({
          queryKey: [dashboardOverviewKeys.read],
        });
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return deleteProductMutation;
}
