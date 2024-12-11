import type {
  AddProduct,
  AllProduct,
  GetEntireProduct,
  SingleProduct,
  UpdateProduct,
} from "@/types";

import { apiClient } from "@/services/api";

// /product/all

export const getEntireProduct = async (): Promise<GetEntireProduct> => {
  const response = await apiClient.get({
    url: "/product/all",
    auth: true,
  });

  return response as GetEntireProduct;
};

// products/add-product

export const addProduct = async (product: AddProduct) => {
  const response = await apiClient.post({
    url: "/product",
    body: product,
    auth: true,
  });

  return response;
};

// products/get-products?page=0&size=10

export const getProducts = async (
  pageNumber: number = 1,
  search: string = "",
  startDate?: Date | undefined,
  endDate?: Date | undefined,
): Promise<AllProduct> => {
  const response = await apiClient.get({
    url: `/product?pageNumber=${pageNumber}${search ? `&search=${search}` : ""}${
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

  return response as AllProduct;
};

// products/get-product/1

export const getProduct = async (id: string): Promise<SingleProduct> => {
  const response = await apiClient.get({
    url: `/product/${id}`,
    auth: true,
  });

  return response;
};

// /products/delete-product/2

export const deleteProduct = async (id: string) => {
  const response = await apiClient.delete({
    url: `/product/${id}`,
  });

  return response;
};

export const updateProduct = async (product: UpdateProduct) => {
  const response = await apiClient.put({
    url: `/product`,
    body: product,
  });

  return response;
};
