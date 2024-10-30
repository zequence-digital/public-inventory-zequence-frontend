"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DragAndDrop, FileUpload, UserAvatar } from "@/assets";
import { Label } from "@/components/ui/label";

import Image from "next/image";
import { Input } from "@/components/ui/input";

type FileUploadWrapperProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImage: File | undefined;
};
const FileUploadWrapper = ({
  onChange,
  selectedImage,
}: FileUploadWrapperProps) => {
  return (
    <div className="space-y-1">
      <Label htmlFor="logoImage" className="flex items-center gap-2">
        <div>
          <Avatar className="size-20 shrink-0">
            <AvatarImage
              className="shrink-0"
              src={selectedImage ? URL.createObjectURL(selectedImage) : ""}
            />
            <AvatarFallback>
              <Image src={UserAvatar} alt="User Avatar" />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex">
          <Image src={DragAndDrop} alt="Drag and drop" />
          <Image src={FileUpload} alt="File upload" />
        </div>
        <Input
          className=" hidden"
          type="file"
          id="logoImage"
          onChange={onChange}
          accept="image/*"
        />
      </Label>
    </div>
  );
};

export default FileUploadWrapper;
