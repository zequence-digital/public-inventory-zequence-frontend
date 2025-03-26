import type { FileUploadResponse } from "@/types/auth";
import { baseUrl } from "@/utils";
import axios from "axios";

// /generic/file-upload

async function fileUpload(file: File): Promise<FileUploadResponse> {
  const formData = new FormData();
  formData.append("file", file);
  return await axios.post(`${baseUrl}/generic/file-upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export { fileUpload };
