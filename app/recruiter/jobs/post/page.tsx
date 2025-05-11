import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function PostJob() {
  const form = useForm({
    resolver: zodResolver(),
    defaultValues: {},
  });
  return (
    <div className="p-4 w-full h-full">
      <h2 className="text-2xl font-semibold">Post Job</h2>
      <Card>
        <CardHeader>
          <CardTitle>Post Job</CardTitle>
          <CardDescription>Fill out the form to post a new job</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </div>
  );
}
