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
import { useFieldArray, useForm } from "react-hook-form";
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
  requirements: { requirement: string }[];
  responsibilities: { responsibility: string }[];
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
      requirements: job.requirements.map(
        (requirement) => requirement.requirement,
      ),
      responsibilities: job.responsibilities.map(
        (responsibility) => responsibility.responsibility,
      ),
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
        className="flex flex-col gap-4 space-y-2"
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
            formData.append("requirements", JSON.stringify(data.requirements));
            formData.append(
              "responsibilities",
              JSON.stringify(data.responsibilities),
            );
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
        <Card className="p-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Job Details</CardTitle>
            <CardDescription>Fill in to edit job details</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
          </CardContent>
        </Card>
        <Card className="p-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Job Requirements
            </CardTitle>
            <CardDescription>Fill in to change requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Job responsibilities
            </CardTitle>
            <CardDescription>
              Fill in to edit job responsibilities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
  );
}
