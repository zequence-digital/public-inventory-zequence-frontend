import { ActiveInvitedUser, AllInvitedUsers, InviteUser } from "@/types";
import {
  UndefinedInitialDataOptions,
  UseMutationOptions,
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  assignInvitedUserRole,
  getActiveInvitedUser,
  getAllInvitedUsers,
} from "./actions";

import { AuthResponse } from "@/types/auth";
import { AxiosError } from "axios";
import { apiClient } from "@/services/api";
import invitedUsersKey from "./invited-user-keys";
import { toast } from "react-toastify";
import { useInviteUserModalAction } from "@/store/use-invite-user-modal";

export function useInviteUser(
  ref: React.MutableRefObject<HTMLFormElement | null>,
  options?: UseMutationOptions<AuthResponse, AxiosError, InviteUser, unknown>,
) {
  const { onOpenChange } = useInviteUserModalAction();
  const queryClient = useQueryClient();
  const inviteUser = useMutation({
    mutationFn: async (data: InviteUser) => {
      const response = await apiClient.post({
        url: `/user/auth/invitation`,
        body: data,
        auth: true,
      });
      return response;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        if (ref.current) {
          ref.current.reset();
        }
        onOpenChange(false);
        queryClient.invalidateQueries({
          queryKey: [invitedUsersKey.read],
        });
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },

    ...options,
  });

  return inviteUser;
}

export function useInvitedUsers(
  pageNumber: number = 1,
  search: string = "",
  options?: Omit<
    UndefinedInitialDataOptions<
      AllInvitedUsers,
      Error,
      AllInvitedUsers,
      string[]
    >,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [invitedUsersKey.read, pageNumber.toString(), search].filter(
    (key) => key !== undefined,
  );
  const queryInvitedUsers = useQuery({
    queryKey: hash,
    queryFn: () => getAllInvitedUsers(pageNumber, search),
    placeholderData: keepPreviousData,
    ...options,
  });

  return queryInvitedUsers;
}

export function useAssignInvitedUserRole(
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();
  const assignRole = useMutation({
    mutationFn: assignInvitedUserRole,
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: [invitedUsersKey.read],
        });
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return assignRole;
}

export function useActiveInvitedUser(
  pageNumber: number = 1,
  options?: Omit<
    UndefinedInitialDataOptions<
      ActiveInvitedUser,
      Error,
      ActiveInvitedUser,
      string[]
    >,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [
    invitedUsersKey.read,
    pageNumber.toString(),
    "active-invited-user",
  ].filter((key) => key !== undefined);
  const queryActiveInvitedUser = useQuery({
    queryKey: hash,
    queryFn: () => getActiveInvitedUser(pageNumber),
    placeholderData: keepPreviousData,
    ...options,
  });

  return queryActiveInvitedUser;
}
