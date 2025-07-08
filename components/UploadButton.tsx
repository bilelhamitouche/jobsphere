"use client";

import { revalidate } from "@/actions/revalidate";
import { UploadButton } from "@/lib/utils";
import { toast } from "sonner";

export default function UploaderButton() {
  return (
    <UploadButton
      endpoint="pdfUploader"
      onClientUploadComplete={(res) => {
        toast.success("Resume uploaded successfully");
        revalidate();
      }}
      onUploadError={(error: Error) => {
        toast.error(error.message);
      }}
    />
  );
}
