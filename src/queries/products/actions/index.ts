import type {
  AddProduct,
  AllProduct,
  SingleProduct,
  UpdateProduct,
} from "@/types";

import { apiClient } from "@/services/api";

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
): Promise<AllProduct> => {
  const response = await apiClient.get({
    url: `/product?pageNumber=${pageNumber}${search ? `&search=${search}` : ""}`,
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
