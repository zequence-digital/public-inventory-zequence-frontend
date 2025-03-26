import { apiClient } from "@/services/api";
import type {
  CreateOrganizationBranch,
  GetAllOrganizationBranch,
  GetBranchById,
  UpdateOrganizationBranch,
} from "@/types";

export const getOrganizationBranches =
  async (): Promise<GetAllOrganizationBranch> => {
    const response = await apiClient.get({
      url: "/generic/organization-branch",
      auth: true,
    });

    return response as GetAllOrganizationBranch;
  };

// Create a new branch
// /generic/organization-branch

export const createBranch = async (branch: CreateOrganizationBranch) => {
  const response = await apiClient.post({
    url: "/generic/organization-branch",
    body: branch,
    auth: true,
  });

  return response;
};

// /generic/organization-branch/1

export const getBranchById = async (id: number): Promise<GetBranchById> => {
  const response = await apiClient.get({
    url: `/generic/organization-branch/${id}`,
    auth: true,
  });

  return response as GetBranchById;
};

// Update branch

export const updateBranch = async (data: UpdateOrganizationBranch) => {
  const response = await apiClient.put({
    url: `/generic/organization-branch`,
    body: data,
  });

  return response;
};

// Delete branch

export const deleteBranch = async (id: number) => {
  const response = await apiClient.delete({
    url: `/generic/organization-branch/${id}`,
  });

  return response;
};
