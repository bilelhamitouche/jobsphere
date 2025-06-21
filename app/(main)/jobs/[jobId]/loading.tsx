import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-full">
      <Loader2 className="animate-spin" size="40" />
    </div>
  );
}
