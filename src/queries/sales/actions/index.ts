import type {
  AddSales,
  AllSalesData,
  GroupSales,
  SingleGroupSales,
  SingleSale,
  UpdateSale,
} from "@/types";

import { apiClient } from "@/services/api";

// products/add-product

type AddSalesFormData = Omit<AddSales, "item">;

export const addSales = async (sales: AddSalesFormData) => {
  const response = await apiClient.post({
    url: "/sale-invoice/step/sales-invoice",
    body: sales,
    auth: true,
  });

  return response;
};

// products/get-products?page=0&size=10

export const getSales = async (): Promise<AllSalesData> => {
  const response = await apiClient.get({
    url: `/sale-invoice/step/sales-invoice`,
    auth: true,
  });

  return response as AllSalesData;
};

// products/get-product/1

export const getSale = async (id: string): Promise<SingleSale> => {
  const response = await apiClient.get({
    url: `/sale-invoice/step/sales-invoice/${id}`,
    auth: true,
  });

  return response as SingleSale;
};

// /products/delete-product/2

export const deleteSales = async (id: string) => {
  const response = await apiClient.delete({
    url: `/sale-invoice/step/sales-invoice/${id}`,
  });

  return response;
};

export const updateSales = async (sales: Omit<UpdateSale, "item">) => {
  const response = await apiClient.put({
    url: `/sale-invoice/step/sales-invoice`,
    body: sales,
  });

  return response;
};

// GROUP SALES

// /sale-invoice/step/sales-invoice/group/submit

export const submitSales = async (salesInvoiceGuids: string[]) => {
  const response = await apiClient.post({
    url: `/sale-invoice/step/sales-invoice/group/submit`,
    body: { salesInvoiceGuids },
    auth: true,
  });

  return response;
};

// /sale-invoice/group

export const getGroupSales = async (): Promise<GroupSales> => {
  const response = await apiClient.get({
    url: `/sale-invoice/group`,
    auth: true,
  });

  return response as GroupSales;
};

// /sale-invoice/group/{id}

export const getSingleGroupSales = async (
  id: string,
): Promise<SingleGroupSales> => {
  const response = await apiClient.get({
    url: `/sale-invoice/group/${id}`,
    auth: true,
  });

  return response as SingleGroupSales;
};
