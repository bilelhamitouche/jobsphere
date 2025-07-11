"use client";

import { revalidate } from "@/actions/revalidate";
import { UploadButton } from "@/lib/utils";
import { toast } from "sonner";

export default function UploaderButton() {
  return (
    <UploadButton
      className="ut-button:text-primary-foreground ut-button:bg-primary"
      endpoint="pdfUploader"
      onClientUploadComplete={() => {
        toast.success("Resume uploaded successfully");
        revalidate();
      }}
      onUploadError={(error: Error) => {
        toast.error(error.message);
      }}
    />
  );
}
