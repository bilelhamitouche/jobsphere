import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="p-6 space-y-4 w-full h-full">
      <h2 className="text-3xl font-bold">Edit Job</h2>
      <div className="flex justify-center items-center w-full h-full">
        <Loader className="animate-spin" size="40" />
      </div>
    </div>
  );
}
