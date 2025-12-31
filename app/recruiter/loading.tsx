import { Loader } from "lucide-react";

export default function RecruiterLoading() {
  return (
    <div className="flex gap-2 justify-center items-center w-full h-full text-gray-500">
      <Loader className="animate-spin" size="50" />
      <span className="text-lg">Loading</span>
    </div>
  );
}
