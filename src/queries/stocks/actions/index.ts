import { apiClient } from "@/services/api";
import type {
  AddStock,
  AddStockTransfer,
  AddStockUsage,
  AllStock,
  ApproveOrDeclineRequestOrTransfer,
  GetAllGroupStockUsage,
  GetAllStockUsage,
  GetEntireStock,
  GetStockRequest,
  GetStockTransfer,
  SingleGroupStockUsage,
  SingleStock,
  SingleStockRequest,
  SingleStockTransfer,
  SingleStockUsage,
  UpdateStock,
  UpdateStockTransfer,
  UpdateStockUsage,
} from "@/types";

// /stock/all
export const getEntireStock = async (): Promise<GetEntireStock> => {
  const response = await apiClient.get({
    url: "/stock/all",
    auth: true,
  });

  return response as GetEntireStock;
};

// products/add-product

export const addStock = async (stock: AddStock) => {
  const response = await apiClient.post({
    url: "/stock",
    body: stock,
    auth: true,
  });

  return response;
};

// products/get-products?page=0&size=10

// export const getStocks = async (
//   pageNumber: number = 1,
//   search: string = "",
//   branchId: number | undefined,
//   startDate?: Date | undefined,
//   endDate?: Date | undefined,
// ): Promise<AllStock> => {
//   const response = await apiClient.get({
//     url: `/stock?branchId=${branchId}&pageNumber=${pageNumber}${search ? `&search=${search}` : ""}${
//       startDate === undefined
//         ? ""
//         : `&startDate=${startDate.toISOString().split("T")[0]}`
//     }${
//       endDate === undefined
//         ? ""
//         : `&endDate=${endDate.toISOString().split("T")[0]}`
//     }`,
//     auth: true,
//   });

//   return response as AllStock;
// };

export const getStocks = async (
  pageNumber: number = 1,
  search: string = "",
  branchId: number | undefined,
  startDate?: Date | undefined,
  endDate?: Date | undefined,
  fetchAll: boolean = false,
): Promise<AllStock> => {
  // If fetchAll is true, modify the URL to fetch all stocks
  const url = fetchAll
    ? `/stock?branchId=${branchId}&pageNumber=1&pageSize=1000${search ? `&search=${search}` : ""}${
        startDate === undefined
          ? ""
          : `&startDate=${startDate.toISOString().split("T")[0]}`
      }${
        endDate === undefined
          ? ""
          : `&endDate=${endDate.toISOString().split("T")[0]}`
      }`
    : `/stock?branchId=${branchId}&pageNumber=${pageNumber}${search ? `&search=${search}` : ""}${
        startDate === undefined
          ? ""
          : `&startDate=${startDate.toISOString().split("T")[0]}`
      }${
        endDate === undefined
          ? ""
          : `&endDate=${endDate.toISOString().split("T")[0]}`
      }`;

  const response = await apiClient.get({
    url: url,
    auth: true,
  });

  return response as AllStock;
};

// products/get-product/1

export const getStock = async (id: string): Promise<SingleStock> => {
  const response = await apiClient.get({
    url: `/stock/${id}`,
    auth: true,
  });

  return response as SingleStock;
};

// /products/delete-product/2

export const deleteStock = async (id: string) => {
  const response = await apiClient.delete({
    url: `/stock/${id}`,
  });

  return response;
};

export const updateStock = async (product: UpdateStock) => {
  const response = await apiClient.put({
    url: `/stock`,
    body: product,
  });

  return response;
};

// STOCK TRANSFER

// /stock/stock-transfer

export const getStockTransfer = async (
  pageNumber: number = 1,
  search: string = "",
): Promise<GetStockTransfer> => {
  const response = await apiClient.get({
    url: `/stock/stock-transfer?pageNumber=${pageNumber}${search ? `&search=${search}` : ""}`,
    auth: true,
  });

  return response as GetStockTransfer;
};

// /stock/stock-transfer/{id}

export const getSingleStockTransfer = async (
  id: string,
): Promise<SingleStockTransfer> => {
  const response = await apiClient.get({
    url: `/stock/stock-transfer/${id}`,
    auth: true,
  });

  return response as SingleStockTransfer;
};

// /stock/stock-transfer

export const addStockTransfer = async (stock: AddStockTransfer) => {
  const response = await apiClient.post({
    url: "/stock/stock-transfer",
    body: stock,
    auth: true,
  });

  return response;
};

// /stock/stock-transfer

export const updateStockTransfer = async (stock: UpdateStockTransfer) => {
  const response = await apiClient.put({
    url: "/stock/stock-transfer",
    body: stock,
  });

  return response;
};

// STOCK REQUEST

// /stock/stock-request

export const getStockRequest = async (
  pageNumber: number = 1,
  search: string = "",
): Promise<GetStockRequest> => {
  const response = await apiClient.get({
    url: `/stock/stock-request?pageNumber=${pageNumber}${search ? `&search=${search}` : ""}`,
    auth: true,
  });

  return response as GetStockRequest;
};

// /stock/stock-request/{id}

export const getSingleStockRequest = async (
  id: string,
): Promise<SingleStockRequest> => {
  const response = await apiClient.get({
    url: `/stock/stock-request/${id}`,
    auth: true,
  });

  return response as SingleStockRequest;
};

// /stock/stock-request

export const addStockRequest = async (stock: AddStockTransfer) => {
  const response = await apiClient.post({
    url: "/stock/stock-request",
    body: stock,
    auth: true,
  });

  return response;
};

// /stock/stock-request

export const updateStockRequest = async (stock: UpdateStockTransfer) => {
  const response = await apiClient.put({
    url: "/stock/stock-request",
    body: stock,
  });

  return response;
};

// STOCK USAGE

// /stock/stock-usage

export const getStockUsage = async (
  pageNumber: number = 1,
  search: string = "",
): Promise<GetAllStockUsage> => {
  const response = await apiClient.get({
    url: `/stock/stock-usage?pageNumber=${pageNumber}${search ? `&search=${search}` : ""}`,
    auth: true,
  });

  return response as GetAllStockUsage;
};

// /stock/stock-usage/{guid}

export const getSingleStockUsage = async (
  guid: string,
): Promise<SingleStockUsage> => {
  const response = await apiClient.get({
    url: `/stock/stock-usage/${guid}`,
    auth: true,
  });

  return response as SingleStockUsage;
};

// /stock/stock-usage

export const addStockUsage = async (stock: AddStockUsage) => {
  const response = await apiClient.post({
    url: "/stock/stock-usage",
    body: stock,
    auth: true,
  });

  return response;
};

export const deleteStockUsage = async (id: string) => {
  const response = await apiClient.delete({
    url: `/stock/stock-usage/${id}`,
  });

  return response;
};

export const updateStockUsage = async (stock: UpdateStockUsage) => {
  const response = await apiClient.put({
    url: "/stock/stock-usage",
    body: stock,
  });

  return response;
};

// GROUP STOCK USAGE

export const submitGroupStockUsage = async (stockUsageGuids: string[]) => {
  const response = await apiClient.post({
    url: `/stock/stock-usage/pack`,
    body: { stockUsageGuids },
    auth: true,
  });

  return response;
};

export const deleteGroupStockUsage = async (guid: string) => {
  const response = await apiClient.delete({
    url: `/stock/stock-usage/pack/${guid}`,
  });

  return response;
};

export const getGroupStockUsage = async (
  pageNumber: number = 1,
  search: string = "",
): Promise<GetAllGroupStockUsage> => {
  const response = await apiClient.get({
    url: `/stock/stock-usage/pack?pageNumber=${pageNumber}${search ? `&search=${search}` : ""}`,
    auth: true,
  });

  return response as GetAllGroupStockUsage;
};

export const getSingleGroupStockUsage = async (
  id: string,
): Promise<SingleGroupStockUsage> => {
  const response = await apiClient.get({
    url: `/stock/stock-usage/pack/${id}`,
    auth: true,
  });

  return response as SingleGroupStockUsage;
};

// APPROVE STOCK REQUEST  // REJECT STOCK REQUEST// APPROVE STOCK TRANSFER// REJECT STOCK TRANSFER//
// /stock/stock-transfer/approve-decline
// /stock/stock-request/approve-decline
export const approveOrDeclineRequestOrTransfer = async (
  type: "stock-request" | "stock-transfer",
  data: ApproveOrDeclineRequestOrTransfer,
) => {
  const response = await apiClient.post({
    url: `/stock/${type}/approve-decline`,
    body: data,
    auth: true,
  });

  return response;
};
