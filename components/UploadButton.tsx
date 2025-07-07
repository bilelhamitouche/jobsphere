"use client";

import { UploadButton } from "@/lib/utils";
import { toast } from "sonner";

export default function UploaderButton() {
  return (
    <UploadButton
      endpoint="pdfUploader"
      onClientUploadComplete={(_res) => {
        toast.success("Resume uploaded successfully");
      }}
      onUploadError={(error: Error) => {
        toast.error(error.message);
      }}
    />
  );
}
