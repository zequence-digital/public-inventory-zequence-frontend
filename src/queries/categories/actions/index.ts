import type {
  AddCategory,
  AllCategory,
  SingleCategory,
  UpdateCategory,
} from "@/types";

import { apiClient } from "@/services/api";

// /category

// 2024-09-12

export async function getCategories(
  pageSize?: number,
  pageNumber: number = 1,
  search: string = "",
  startDate?: Date | undefined,
): Promise<AllCategory> {
  const response = await apiClient.get({
    url: `/category?pageNumber=${pageNumber}${search ? `&search=${search}` : ""}${
      pageSize ? `&pageSize=${pageSize}` : ""
    }${
      startDate === undefined
        ? ""
        : `&startDate=${startDate.toISOString().split("T")[0]}`
    }`,
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
