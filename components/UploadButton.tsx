"use client";

import { UploadButton } from "@/lib/utils";

export default function UploaderButton() {
  return (
    <UploadButton
      endpoint="pdfUploader"
      onClientUploadComplete={(res) => {
        console.log("Files: ", res);
      }}
      onUploadError={(error: Error) => {
        console.log("Error: ", error);
      }}
    />
  );
}
