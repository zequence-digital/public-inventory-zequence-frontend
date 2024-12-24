import { useCallback, useState } from "react";
import { useFileUpload, useFileUploadState } from "@/services/file-upload";

import { useDropzone } from "react-dropzone";

export function useImageUpload() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { mutate: uploadFile, isPending: pendingFileUpload } = useFileUpload(
    selectedImage as File,
  );
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setSelectedImage(acceptedFiles?.[0] || undefined);
      uploadFile(acceptedFiles?.[0] as File);
    },
    [uploadFile],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const data = useFileUploadState();

  const companyUploadUrl = data[0]?.data?.data;

  return {
    getRootProps,
    getInputProps,
    uploadFile,
    isDragActive,
    selectedImage,
    setSelectedImage,
    pendingFileUpload,
    companyUploadUrl,
  };
}
