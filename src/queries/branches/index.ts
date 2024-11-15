import type { GetAllOrganizationBranch, GetBranchById } from "@/types";
import {
  UndefinedInitialDataOptions,
  UseMutationOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import {
  createBranch,
  deleteBranch,
  getBranchById,
  getOrganizationBranches,
  updateBranch,
} from "./actions";

import { AuthResponse } from "@/types/auth";
import { AxiosError } from "axios";
import branchKeys from "./branch-keys";
import { toast } from "react-toastify";

export function useBranches(
  options?: Omit<
    UndefinedInitialDataOptions<
      GetAllOrganizationBranch,
      Error,
      GetAllOrganizationBranch,
      string[]
    >,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [branchKeys.read];
  const queryBranches = useQuery({
    queryKey: hash,
    queryFn: getOrganizationBranches,
    ...options,
  });

  return queryBranches;
}

export function useBranchById(
  id: string,
  options?: Omit<
    UndefinedInitialDataOptions<GetBranchById, Error, GetBranchById, string[]>,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [branchKeys.readOne, id];
  const queryBranch = useQuery({
    queryKey: hash,
    queryFn: () => getBranchById(id),
    ...options,
  });

  return queryBranch;
}

export function useCreateBranch(
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const createBranchMutation = useMutation({
    mutationFn: createBranch,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
      }
      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return createBranchMutation;
}

export function useUpdateBranch(
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const updateBranchMutation = useMutation({
    mutationFn: updateBranch,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
      }
      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return updateBranchMutation;
}

export function useDeleteBranch(
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const deleteBranchMutation = useMutation({
    mutationFn: deleteBranch,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
      }
      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return deleteBranchMutation;
}
