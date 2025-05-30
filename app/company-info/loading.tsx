import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full h-full">
      <Loader2 className="ease-linear animate-spin text-primary" size="48" />
    </div>
  );
}
