import type { GetAllOrganizationBranch, GetBranchById } from "@/types";
import {
  UndefinedInitialDataOptions,
  UseMutationOptions,
  useMutation,
  useQuery,
  useQueryClient,
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
import { toast } from "react-toastify";
import branchKeys from "./branch-keys";

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
  id: number,
  options?: Omit<
    UndefinedInitialDataOptions<GetBranchById, Error, GetBranchById, string[]>,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [branchKeys.readOne, id.toString()];
  const queryBranch = useQuery({
    queryKey: hash,
    queryFn: () => getBranchById(id),
    ...options,
  });

  return queryBranch;
}

export function useCreateBranch(
  ref: React.MutableRefObject<HTMLFormElement | null>,
  onClose: (open: boolean) => void,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();
  const createBranchMutation = useMutation({
    mutationFn: createBranch,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        if (ref.current) {
          ref.current.reset();
        }
        onClose(false);
        queryClient.invalidateQueries({
          queryKey: [branchKeys.read],
        });
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
  ref: React.MutableRefObject<HTMLFormElement | null>,
  onClose: (open: boolean) => void,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();
  const updateBranchMutation = useMutation({
    mutationFn: updateBranch,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        if (ref.current) {
          ref.current.reset();
        }
        onClose(false);
        queryClient.invalidateQueries({
          queryKey: [branchKeys.read],
        });
        queryClient.invalidateQueries({
          queryKey: [branchKeys.readOne],
        });
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
  id: number,
  onClose: (open: boolean) => void,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();
  const deleteBranchMutation = useMutation({
    mutationFn: () => deleteBranch(id),
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        onClose(false);
        queryClient.invalidateQueries({
          queryKey: [branchKeys.read],
        });
      }
      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return deleteBranchMutation;
}
