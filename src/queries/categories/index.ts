import type { AllCategory, SingleCategory } from "@/types";
import {
  UndefinedInitialDataOptions,
  UseMutationOptions,
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} from "./actions";

import { AuthResponse } from "@/types/auth";
import { AxiosError } from "axios";
import categoryKeys from "./category-keys";
import { getCategories } from "./actions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function useCategories(
  pageNumber: number = 1,
  search: string = "",
  options?: Omit<
    UndefinedInitialDataOptions<AllCategory, Error, AllCategory, string[]>,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [categoryKeys.read, pageNumber.toString(), search].filter(
    (key) => key !== undefined,
  );
  return useQuery({
    queryKey: hash,
    queryFn: () => getCategories(pageNumber, search),
    placeholderData: keepPreviousData,
    ...options,
  });
}

export function useCategory(
  id: string,
  options?: Omit<
    UndefinedInitialDataOptions<
      SingleCategory,
      Error,
      SingleCategory,
      string[]
    >,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [categoryKeys.readOne, id];
  return useQuery({
    queryKey: hash,
    queryFn: () => getCategory(id),
    ...options,
  });
}

export function useAddCategory(
  ref: React.MutableRefObject<HTMLFormElement | null>,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();
  const createCategory = useMutation({
    mutationFn: addCategory,

    mutationKey: [categoryKeys.create],
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        if (ref.current) {
          ref.current.reset();
        }

        queryClient.invalidateQueries({
          queryKey: [categoryKeys.read],
        });
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return createCategory;
}

export function useEditCategory(
  ref: React.MutableRefObject<HTMLFormElement | null>,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const editProductMutation = useMutation({
    mutationFn: updateCategory,
    onSuccess(data) {
      if (data.success) {
        if (ref.current) {
          ref.current.reset();
        }
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: [categoryKeys.read],
        });
        router.push("/dashboard/categories/list-categories");
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return editProductMutation;
}

export function useDeleteCategory(
  id: string,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const deleteProductMutation = useMutation({
    mutationFn: () => deleteCategory(id),
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: [categoryKeys.read],
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
