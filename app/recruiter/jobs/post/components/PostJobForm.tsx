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
import {
  jobListingSchema,
  jobType,
  jobExperienceLevel,
  jobCategory,
} from "@/lib/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formatJobType } from "@/lib/utils";

export default function PostJobForm({ recruiterId }: { recruiterId: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const typeOptions = jobType.options;
  const categoryOptions = jobCategory.options;
  const experienceLevelOptions = jobExperienceLevel.options;
  const form = useForm<z.infer<typeof jobListingSchema>>({
    resolver: zodResolver(jobListingSchema),
    defaultValues: {
      position: "",
      type: "full",
      description: "",
      experience_level: "none",
      location: "",
      category: undefined,
      requirements: [],
      responsibilities: [],
    },
  });
  const {
    fields: requirementFields,
    append: requirementAppend,
    remove: requirementRemove,
  } = useFieldArray({
    name: "requirements" as never,
    control: form.control,
  });
  const {
    fields: responsibilityFields,
    append: responsibilityAppend,
    remove: responsibilityRemove,
  } = useFieldArray({
    name: "responsibilities" as never,
    control: form.control,
  });
  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-8"
        onSubmit={form.handleSubmit(
          async (data: z.infer<typeof jobListingSchema>) => {
            setIsSubmitting(true);
            const formData = new FormData();
            formData.append("position", data.position);
            formData.append("description", data.description);
            formData.append("location", data.location as string);
            formData.append("category", data.category as string);
            formData.append("experience_level", data.experience_level);
            formData.append("type", data.type);
            formData.append("recruiter_id", recruiterId);
            formData.append("requirements", JSON.stringify(data.requirements));
            formData.append(
              "responsibilities",
              JSON.stringify(data.responsibilities),
            );
            try {
              const result = await createJobAction(formData);
              if (!result?.errors && !result?.message) {
                toast.success("Job posted sucessfully");
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
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Job Details</CardTitle>
            <CardDescription>
              Fill in job details and information
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  <Select onValueChange={field.onChange} defaultValue="">
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select the type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {typeOptions.map((option, index) => (
                        <SelectItem
                          key={index}
                          value={option as string}
                          className="capitalize"
                        >
                          {formatJobType(option)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={""}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select the category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categoryOptions.map((option, index) => (
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
                  <Select onValueChange={field.onChange} defaultValue="">
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select the experience level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {experienceLevelOptions.map((option, index) => (
                        <SelectItem
                          key={index}
                          value={option}
                          className="capitalize"
                        >
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
                <FormItem className="col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field}></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Job Requirements
            </CardTitle>
            <CardDescription>Add at least 1 requirement</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {requirementFields.map((field, index) => (
              <FormField
                key={field.id}
                name={`requirements.${index}`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Requirement {index + 1}</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input {...field} placeholder="Enter requirement" />
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => requirementRemove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => requirementAppend("")}
            >
              Add Requirement
            </Button>
          </CardContent>
        </Card>
        <Card className="p-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Job Responsibilities
            </CardTitle>
            <CardDescription>Add at least 1 responsibility</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {responsibilityFields.map((field, index) => (
              <FormField
                key={field.id}
                name={`responsibilities.${index}`}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Responsibility {index + 1}</FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        <Input {...field} placeholder="Enter responsibility" />
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => responsibilityRemove(index)}
                        >
                          Remove
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => responsibilityAppend("")}
            >
              Add Responsibility
            </Button>
          </CardContent>
        </Card>
        <Button type="submit" className="md:col-span-2" disabled={isSubmitting}>
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
  );
}
