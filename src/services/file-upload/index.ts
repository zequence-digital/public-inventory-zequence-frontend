import type { FileUploadResponse } from "@/types/auth";
import {
  UseMutationOptions,
  useMutation,
  useMutationState,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

import { fileUpload } from "./actions";
import fileUploadKeys from "./file-upload-keys";

export function useFileUpload(
  file: File,
  options?: UseMutationOptions<any, AxiosError, any, unknown>,
) {
  const hash = [fileUploadKeys.create];
  const uploadFile = useMutation({
    mutationKey: hash,
    mutationFn: () => fileUpload(file),
    onSuccess(data) {
      if (data.data.success) {
        toast.success(data.data.message);
      }

      if (!data.data.success) {
        toast.error(data.data.message);
      }
    },
    ...options,
  });

  return uploadFile;
}

export function useFileUploadState() {
  const data = useMutationState<FileUploadResponse>({
    filters: {
      mutationKey: [fileUploadKeys.create],
      status: "success",
    },
    select: (mutation) => mutation.state.data as FileUploadResponse,
  });

  return data;
}
