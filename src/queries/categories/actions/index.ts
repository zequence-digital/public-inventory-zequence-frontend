import type {
  AddCategory,
  AllCategory,
  EntireCategory,
  SingleCategory,
  UpdateCategory,
} from "@/types";

import { apiClient } from "@/services/api";

// /category

export async function getCategories(
  pageSize?: number,
  pageNumber: number = 1,
  search: string = "",
  startDate?: Date | undefined,
  endDate?: Date | undefined,
): Promise<AllCategory> {
  const response = await apiClient.get({
    url: `/category?pageNumber=${pageNumber}${search ? `&search=${search}` : ""}${
      pageSize ? `&pageSize=${pageSize}` : ""
    }${
      startDate === undefined
        ? ""
        : `&startDate=${startDate.toISOString().split("T")[0]}`
    }${
      endDate === undefined
        ? ""
        : `&endDate=${endDate.toISOString().split("T")[0]}`
    }`,
    auth: true,
  });

  return response as AllCategory;
}

// /category/all

export async function getEntireCategories(): Promise<EntireCategory> {
  const response = await apiClient.get({
    url: "/category/all",
    auth: true,
  });

  return response as EntireCategory;
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
