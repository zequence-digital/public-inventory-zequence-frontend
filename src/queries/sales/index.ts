import type {
  AllSalesData,
  GroupSales,
  SingleGroupSales,
  SingleSale,
} from "@/types";
import {
  UndefinedInitialDataOptions,
  UseMutationOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addSales,
  deleteSales,
  getGroupSales,
  getSale,
  getSales,
  getSingleGroupSales,
  submitSales,
  updateSales,
  updateSingleSalePack,
} from "./actions";

import { AuthResponse } from "@/types/auth";
import { AxiosError } from "axios";
import salesKeys from "./sales-keys";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function useSales(
  options?: Omit<
    UndefinedInitialDataOptions<AllSalesData, Error, AllSalesData, string[]>,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [salesKeys.read];
  const queryStocks = useQuery({
    queryKey: hash,
    queryFn: getSales,
    ...options,
  });

  return queryStocks;
}

export function useSale(
  id: string,
  options?: Omit<
    UndefinedInitialDataOptions<SingleSale, Error, SingleSale, string[]>,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [salesKeys.readOne];
  const queryStock = useQuery({
    queryKey: hash,
    queryFn: () => getSale(id),
    ...options,
  });

  return queryStock;
}

export function useAddSales(
  ref: React.MutableRefObject<HTMLFormElement | null>,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();
  const createStock = useMutation({
    mutationFn: addSales,

    mutationKey: [salesKeys.create],
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        if (ref.current) {
          ref.current.reset();
        }

        queryClient.invalidateQueries({
          queryKey: [salesKeys.read],
        });
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return createStock;
}

export function useEditSales(
  ref: React.MutableRefObject<HTMLFormElement | null>,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const editStock = useMutation({
    mutationFn: updateSales,

    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        if (ref.current) {
          ref.current.reset();
        }
        queryClient.invalidateQueries({
          queryKey: [salesKeys.read],
        });
        router.push("/dashboard/sales/add-sales");
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return editStock;
}

export function useEditSingleSalePack(
  ref: React.MutableRefObject<HTMLFormElement | null>,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const editStock = useMutation({
    mutationFn: updateSingleSalePack,

    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        if (ref.current) {
          ref.current.reset();
        }
        queryClient.invalidateQueries({
          queryKey: [salesKeys.read],
        });
        router.push("/dashboard/sales/add-sales");
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return editStock;
}

export function useDeleteSales(
  id: string,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();

  const deleteStockMutation = useMutation({
    mutationFn: () => deleteSales(id),
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: [salesKeys.read],
        });
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return deleteStockMutation;
}

// GROUP SALES

export function useSalesGroupSubmit(
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();

  const groupSubmit = useMutation({
    mutationFn: submitSales,
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: [salesKeys.read],
        });
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return groupSubmit;
}

export function useGroupSales(
  options?: Omit<
    UndefinedInitialDataOptions<GroupSales, Error, GroupSales, string[]>,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [salesKeys.read, "group"];
  const querySales = useQuery({
    queryKey: hash,
    queryFn: getGroupSales,
    ...options,
  });

  return querySales;
}

export function useSingleGroupSales(
  id: string,
  options?: Omit<
    UndefinedInitialDataOptions<
      SingleGroupSales,
      Error,
      SingleGroupSales,
      string[]
    >,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [salesKeys.readOne, id];
  const querySales = useQuery({
    queryKey: hash,
    queryFn: () => getSingleGroupSales(id),
    ...options,
  });

  return querySales;
}
