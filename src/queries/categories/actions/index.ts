import type {
  AddCategory,
  AllCategory,
  SingleCategory,
  UpdateCategory,
} from "@/types";

import { apiClient } from "@/services/api";

// /category

export async function getCategories(
  pageNumber: number = 1,
  search: string = "",
): Promise<AllCategory> {
  const response = await apiClient.get({
    url: `/category?pageNumber=${pageNumber}${search ? `&search=${search}` : ""}`,
    auth: true,
  });

  return response as AllCategory;
}

export const addCategory = async (category: AddCategory) => {
  const response = await apiClient.post({
    url: "/category",
    body: category,
    auth: true,
  });

  return response;
};

export const getCategory = async (id: string): Promise<SingleCategory> => {
  const response = await apiClient.get({
    url: `/category/${id}`,
    auth: true,
  });

  return response as SingleCategory;
};

export const deleteCategory = async (id: string) => {
  const response = await apiClient.delete({
    url: `/category/${id}`,
  });

  return response;
};

export const updateCategory = async (category: UpdateCategory) => {
  const response = await apiClient.put({
    url: `/category`,
    body: category,
  });

  return response;
};
