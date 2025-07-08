import { getUserInfo } from "@/actions/auth";
import { updateResumeUrl } from "@/lib/queries";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  pdfUploader: f({
    pdf: {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await getUserInfo();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await updateResumeUrl(file.ufsUrl, metadata.userId);
      return { uploadedBy: metadata.userId, uploaded: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
