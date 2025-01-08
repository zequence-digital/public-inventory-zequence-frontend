import type {
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
} from "@/types";
import {
  UndefinedInitialDataOptions,
  UseMutationOptions,
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  addStock,
  addStockRequest,
  addStockTransfer,
  addStockUsage,
  approveOrDeclineRequestOrTransfer,
  deleteGroupStockUsage,
  deleteStock,
  deleteStockUsage,
  getEntireStock,
  getGroupStockUsage,
  getSingleGroupStockUsage,
  getSingleStockRequest,
  getSingleStockTransfer,
  getSingleStockUsage,
  getStock,
  getStockRequest,
  getStockTransfer,
  getStockUsage,
  getStocks,
  submitGroupStockUsage,
  updateStock,
  updateStockRequest,
  updateStockTransfer,
  updateStockUsage,
} from "./actions";

import { AuthResponse } from "@/types/auth";
import { AxiosError } from "axios";
import dashboardOverviewKeys from "../dashboard-overview/dashboard-overview-keys";
import notificationKeys from "../notifications/notification-keys";
import stockKeys from "./stock-keys";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export function useEntireStock(
  options?: Omit<
    UndefinedInitialDataOptions<
      GetEntireStock,
      Error,
      GetEntireStock,
      string[]
    >,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [stockKeys.read, "entire"].filter((key) => key !== undefined);
  const queryStock = useQuery({
    queryKey: hash,
    queryFn: getEntireStock,
    ...options,
  });

  return queryStock;
}

export function useStocks(
  pageNumber: number = 1,
  search: string = "",
  branchId: number | undefined,
  startDate?: Date,
  endDate?: Date,
  options?: Omit<
    UndefinedInitialDataOptions<AllStock, Error, AllStock, string[]>,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [
    stockKeys.read,
    pageNumber.toString(),
    search,
    branchId?.toString(),
    startDate?.toISOString(),
    endDate?.toISOString(),
  ].filter((key) => key !== undefined);
  const queryStocks = useQuery({
    queryKey: hash,
    queryFn: () => getStocks(pageNumber, search, branchId, startDate, endDate),
    enabled: !!branchId,
    ...options,
  });

  return queryStocks;
}

export function useStock(
  id: string,
  options?: Omit<
    UndefinedInitialDataOptions<SingleStock, Error, SingleStock, string[]>,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [stockKeys.readOne, id];
  const queryStock = useQuery({
    queryKey: hash,
    queryFn: () => getStock(id),
    ...options,
  });

  return queryStock;
}

export function useAddStock(
  ref: React.MutableRefObject<HTMLFormElement | null>,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();
  const createStock = useMutation({
    mutationFn: addStock,

    mutationKey: [stockKeys.create],
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        if (ref.current) {
          ref.current.reset();
        }

        queryClient.invalidateQueries({
          queryKey: [stockKeys.read],
        });
        queryClient.invalidateQueries({
          queryKey: [dashboardOverviewKeys.read],
        });
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return createStock;
}

export function useEditStock(
  ref: React.MutableRefObject<HTMLFormElement | null>,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const editStock = useMutation({
    mutationFn: updateStock,

    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        if (ref.current) {
          ref.current.reset();
        }
        queryClient.invalidateQueries({
          queryKey: [stockKeys.read],
        });
        queryClient.invalidateQueries({
          queryKey: [dashboardOverviewKeys.read],
        });
        router.push("/dashboard/stocks/list-stock");
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return editStock;
}

export function useDeleteStock(
  id: string,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();

  const deleteStockMutation = useMutation({
    mutationFn: () => deleteStock(id),
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: [stockKeys.read],
        });
        queryClient.invalidateQueries({
          queryKey: [dashboardOverviewKeys.read],
        });
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return deleteStockMutation;
}

// STOCK TRANSFER

export function useStockTransfer(
  pageNumber: number = 1,
  search: string = "",
  options?: Omit<
    UndefinedInitialDataOptions<
      GetStockTransfer,
      Error,
      GetStockTransfer,
      string[]
    >,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [
    stockKeys.read,
    "stock-transfer",
    pageNumber.toString(),
    search,
  ];
  const queryStockTransfer = useQuery({
    queryKey: hash,
    queryFn: () => getStockTransfer(pageNumber, search),
    ...options,
  });

  return queryStockTransfer;
}

export function useSingleStockTransfer(
  id: string,
  options?: Omit<
    UndefinedInitialDataOptions<
      SingleStockTransfer,
      Error,
      SingleStockTransfer,
      string[]
    >,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [stockKeys.readOne, id, "single-stock-transfer"];
  const queryStockTransfer = useQuery({
    queryKey: hash,
    queryFn: () => getSingleStockTransfer(id),
    ...options,
  });

  return queryStockTransfer;
}

export function useAddStockTransfer(
  ref: React.MutableRefObject<HTMLFormElement | null>,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();
  const addTransferStock = useMutation({
    mutationFn: addStockTransfer,

    mutationKey: [stockKeys.create, "stock-transfer"],
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        if (ref.current) {
          ref.current.reset();
        }
        queryClient.invalidateQueries({
          queryKey: [stockKeys.read, "stock-transfer"],
        });
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return addTransferStock;
}

export function useEditStockTransfer(
  ref: React.MutableRefObject<HTMLFormElement | null>,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const editStockTransfer = useMutation({
    mutationFn: updateStockTransfer,

    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        if (ref.current) {
          ref.current.reset();
        }
        queryClient.invalidateQueries({
          queryKey: [stockKeys.read, "stock-transfer"],
        });
        router.push("/dashboard/stocks/add-stock-transfer");
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return editStockTransfer;
}

// STOCK REQUEST

export function useStockRequest(
  pageNumber: number = 1,
  search: string = "",
  options?: Omit<
    UndefinedInitialDataOptions<
      GetStockRequest,
      Error,
      GetStockRequest,
      string[]
    >,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [
    stockKeys.read,
    "stock-request",
    pageNumber.toString(),
    search,
  ].filter((key) => key !== undefined);
  const queryStockRequest = useQuery({
    queryKey: hash,
    queryFn: () => getStockRequest(pageNumber, search),
    placeholderData: keepPreviousData,
    ...options,
  });

  return queryStockRequest;
}

export function useSingleStockRequest(
  id: string,
  options?: Omit<
    UndefinedInitialDataOptions<
      SingleStockRequest,
      Error,
      SingleStockRequest,
      string[]
    >,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [stockKeys.readOne, id, "single-stock-request"];
  const queryStockRequest = useQuery({
    queryKey: hash,
    queryFn: () => getSingleStockRequest(id),
    ...options,
  });

  return queryStockRequest;
}

export function useAddStockRequest(
  ref: React.MutableRefObject<HTMLFormElement | null>,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();
  const addRequestStock = useMutation({
    mutationFn: addStockRequest,

    mutationKey: [stockKeys.create, "stock-request"],
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        if (ref.current) {
          ref.current.reset();
        }
        queryClient.invalidateQueries({
          queryKey: [stockKeys.read, "stock-request"],
        });
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return addRequestStock;
}

export function useEditStockRequest(
  ref: React.MutableRefObject<HTMLFormElement | null>,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const editStockRequest = useMutation({
    mutationFn: updateStockRequest,

    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        if (ref.current) {
          ref.current.reset();
        }
        queryClient.invalidateQueries({
          queryKey: [stockKeys.read, "stock-request"],
        });
        router.push("/dashboard/stocks/stock-request");
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return editStockRequest;
}

// STOCK USAGE

export function useStockUsage(
  pageNumber: number = 1,
  search: string = "",
  options?: Omit<
    UndefinedInitialDataOptions<
      GetAllStockUsage,
      Error,
      GetAllStockUsage,
      string[]
    >,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [
    stockKeys.read,
    "stock-usage",
    pageNumber.toString(),
    search,
  ].filter((key) => key !== undefined);
  const queryStockUsage = useQuery({
    queryKey: hash,
    queryFn: () => getStockUsage(pageNumber, search),
    placeholderData: keepPreviousData,
    ...options,
  });

  return queryStockUsage;
}

export function useSingleStockUsage(
  id: string,
  options?: Omit<
    UndefinedInitialDataOptions<
      SingleStockUsage,
      Error,
      SingleStockUsage,
      string[]
    >,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [stockKeys.readOne, id, "single-stock-usage"];
  const queryStockUsage = useQuery({
    queryKey: hash,
    queryFn: () => getSingleStockUsage(id),
    ...options,
  });

  return queryStockUsage;
}

export function useAddStockUsage(
  ref: React.MutableRefObject<HTMLFormElement | null>,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();
  const addTransferStock = useMutation({
    mutationFn: addStockUsage,

    mutationKey: [stockKeys.create],
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        if (ref.current) {
          ref.current.reset();
        }
        queryClient.invalidateQueries({
          queryKey: [stockKeys.read],
        });
        queryClient.invalidateQueries({
          queryKey: [dashboardOverviewKeys.read],
        });
        queryClient.invalidateQueries({
          queryKey: [notificationKeys.read],
        });
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return addTransferStock;
}

export function useEditStockUsage(
  ref: React.MutableRefObject<HTMLFormElement | null>,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const editStockUsage = useMutation({
    mutationFn: updateStockUsage,

    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        if (ref.current) {
          ref.current.reset();
        }
        queryClient.invalidateQueries({
          queryKey: [stockKeys.read],
        });
        router.push("/dashboard/stocks/stock-usage");
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return editStockUsage;
}

export function useDeleteStockUsage(
  id: string,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();

  const deleteStockMutation = useMutation({
    mutationFn: () => deleteStockUsage(id),
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: [stockKeys.read],
        });
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return deleteStockMutation;
}

// GROUP STOCK USAGE

export function useSubmitStockGroupUsage(
  setOpen: (open: boolean) => void,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();

  const groupSubmit = useMutation({
    mutationFn: submitGroupStockUsage,
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        setOpen(false);
        queryClient.invalidateQueries({
          queryKey: [stockKeys.read],
        });
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return groupSubmit;
}

// Delete Group Stock Usage

export function useDeleteGroupStockUsage(
  id: string,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();

  const deleteGroupStockMutation = useMutation({
    mutationFn: () => deleteGroupStockUsage(id),
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: [stockKeys.read],
        });
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return deleteGroupStockMutation;
}

export function useGroupStockUsage(
  pageNumber: number = 1,
  search: string = "",
  options?: Omit<
    UndefinedInitialDataOptions<
      GetAllGroupStockUsage,
      Error,
      GetAllGroupStockUsage,
      string[]
    >,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [stockKeys.read, "group"];
  const querySales = useQuery({
    queryKey: hash,
    queryFn: () => getGroupStockUsage(pageNumber, search),
    placeholderData: keepPreviousData,
    ...options,
  });

  return querySales;
}

export function useSingleGroupStockUsage(
  id: string,
  options?: Omit<
    UndefinedInitialDataOptions<
      SingleGroupStockUsage,
      Error,
      SingleGroupStockUsage,
      string[]
    >,
    "queryKey" | "queryFn"
  >,
) {
  const hash = [stockKeys.readOne, id];
  const querySales = useQuery({
    queryKey: hash,
    queryFn: () => getSingleGroupStockUsage(id),
    ...options,
  });

  return querySales;
}

export function useApproveOrDeclineRequestOrTransfer(
  type: "stock-request" | "stock-transfer",
  data: ApproveOrDeclineRequestOrTransfer,
  options?: UseMutationOptions<AuthResponse, AxiosError, any, unknown>,
) {
  const queryClient = useQueryClient();

  const approveOrDecline = useMutation({
    mutationFn: () => approveOrDeclineRequestOrTransfer(type, data),
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries({
          queryKey: [stockKeys.read, "stock-request"],
        });
        queryClient.invalidateQueries({
          queryKey: [stockKeys.read, "stock-transfer"],
        });
      }

      if (!data.success) {
        toast.error(data.message);
      }
    },
    ...options,
  });

  return approveOrDecline;
}
