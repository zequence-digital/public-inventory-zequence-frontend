import type {
  ActiveInvitedUser,
  AllInvitedUsers,
  AssignInvitedUserRole,
} from "@/types";

import { apiClient } from "@/services/api";

// /user/auth/invitation

export async function getAllInvitedUsers(
  pageNumber: number = 1,
  search: string = "",
): Promise<AllInvitedUsers> {
  const response = await apiClient.get({
    url: `/user/auth/invitation/pending?pageNumber=${pageNumber}${search ? `&search=${search}` : ""}`,
    auth: true,
  });

  return response as AllInvitedUsers;
}

// /user/invitee/role-assignment

export async function assignInvitedUserRole(
  data: AssignInvitedUserRole,
): Promise<any> {
  const response = await apiClient.post({
    url: `/user/invitee/role-assignment`,
    body: data,
    auth: true,
  });

  return response;
}

// /user/auth/invitation

export async function getActiveInvitedUser(
  pageNumber: number = 1,
): Promise<ActiveInvitedUser> {
  const response = await apiClient.get({
    url: `/user/auth/invitation?pageNumber=${pageNumber}`,
    auth: true,
  });

  return response as ActiveInvitedUser;
}
