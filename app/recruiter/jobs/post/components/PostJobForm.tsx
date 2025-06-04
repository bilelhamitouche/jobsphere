"use client";
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
import { z } from "zod";
import { jobListingSchema, jobType, jobExperienceLevel } from "@/lib/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createJobAction } from "@/actions/jobs";
import { Loader2 } from "lucide-react";

export default function PostJobForm({ recruiterId }: { recruiterId: string }) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const typeOptions = jobType.options;
  const experienceLevelOptions = jobExperienceLevel.options;
  const form = useForm<z.infer<typeof jobListingSchema>>({
    resolver: zodResolver(jobListingSchema),
    defaultValues: {
      position: "",
      type: "full",
      description: "",
      experience_level: "none",
      location: "",
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Job Details</CardTitle>
        <CardDescription>Fill in the form to post a job</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="grid grid-cols-1 gap-4 space-y-2 md:grid-cols-2"
            onSubmit={form.handleSubmit(
              async (data: z.infer<typeof jobListingSchema>) => {
                setIsSubmitting(true);
                const formData = new FormData();
                formData.append("position", data.position);
                formData.append("description", data.description as string);
                formData.append("location", data.location as string);
                formData.append("experience_level", data.experience_level);
                formData.append("type", data.type);
                formData.append("recruiter_id", recruiterId);
                try {
                  await createJobAction(formData);
                } catch (err) {
                  console.log(err);
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
                  <Select onValueChange={field.onChange} defaultValue="full">
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
                  <Select onValueChange={field.onChange} defaultValue="none">
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
