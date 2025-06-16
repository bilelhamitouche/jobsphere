"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { jobExperienceLevel, jobType, updateJobListingSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { updateJobListingAction } from "@/actions/jobs";
import { useRouter } from "next/navigation";

interface EditJobFormProps {
  id: string;
  description: string | null;
  position: string | null;
  location: string | null;
  type: z.infer<typeof jobType>;
  experienceLevel: z.infer<typeof jobExperienceLevel>;
}

export default function EditJobForm({ job }: { job: EditJobFormProps }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const typeOptions = jobType.options;
  const experienceLevelOptions = jobExperienceLevel.options;
  const form = useForm<z.infer<typeof updateJobListingSchema>>({
    resolver: zodResolver(updateJobListingSchema),
    defaultValues: {
      description: job.description ?? "",
      position: job.position ?? "",
      location: job.location ?? "",
      experience_level: job.experienceLevel,
      type: job.type,
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Update Job Details</CardTitle>
        <CardDescription>
          Fill in the form to update the job info
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="grid grid-cols-1 gap-4 space-y-2 md:grid-cols-2"
            onSubmit={form.handleSubmit(
              async (data: z.infer<typeof updateJobListingSchema>) => {
                setIsSubmitting(true);
                const formData = new FormData();
                formData.append("position", data.position as string);
                formData.append("description", data.description as string);
                formData.append("location", data.location as string);
                formData.append(
                  "experience_level",
                  data.experience_level as string,
                );
                formData.append("type", data.type as string);
                formData.append("id", job.id);
                try {
                  const result = await updateJobListingAction(formData);
                  if (!result?.errors && !result?.message) {
                    toast.success("Job updated sucessfully");
                    router.push("/recruiter/jobs");
                  }
                } catch (err) {
                  toast.error(err as string);
                } finally {
                  setIsSubmitting(false);
                }
              },
            )}
          >
            <FormField
              name="position"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="location"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="type"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={job.type}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select the type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {typeOptions.map((option, index) => (
                        <SelectItem key={index} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="experience_level"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={job.experienceLevel}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select the experience level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {experienceLevelOptions.map((option, index) => (
                        <SelectItem key={index} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field}></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="md:col-span-2" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="flex gap-2 items-center">
                  <Loader2 className="animate-spin" />
                  <span>Please wait</span>
                </div>
              ) : (
                <span>Save</span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
