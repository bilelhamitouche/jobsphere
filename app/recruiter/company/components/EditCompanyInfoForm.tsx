"use client";
import { updateCompanyAction } from "@/actions/company";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  companyIndustry,
  companySize,
  updateCompanyInfoSchema,
} from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface EditCompanyInfoProps {
  id: string;
  name: string;
  about: string;
  size: z.infer<typeof companySize>;
  email: string;
  headquarters: string | null;
  industry: z.infer<typeof companyIndustry>;
  website: string | null;
  foundationYear: number;
  logoUrl: string | null;
}

export default function EditCompanyInfoForm({
  recruiterId,
  companyInfo,
}: {
  recruiterId: string;
  companyInfo: EditCompanyInfoProps;
}) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const industryOptions = companyIndustry.options;
  const sizeOptions = companySize.options;
  const form = useForm<z.infer<typeof updateCompanyInfoSchema>>({
    resolver: zodResolver(updateCompanyInfoSchema),
    defaultValues: {
      name: companyInfo.name,
      email: companyInfo.email,
      about: companyInfo.about,
      size: companyInfo.size,
      headquarters: companyInfo.headquarters ?? "",
      foundation_year: String(companyInfo.foundationYear),
      website: companyInfo.website ?? "",
      industry: companyInfo.industry,
      logo_url: companyInfo.logoUrl ?? "",
    },
  });
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Company Details</CardTitle>
        <CardDescription>
          Edit the form and submit to save changes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="grid gap-4 md:grid-cols-2"
            onSubmit={form.handleSubmit(
              async (data: z.infer<typeof updateCompanyInfoSchema>) => {
                setIsSubmitting(true);
                const formData = new FormData();
                formData.append("name", data.name as string);
                formData.append("email", data.email as string);
                formData.append("about", data.about as string);
                formData.append("size", data.size as string);
                formData.append("website", data.website as string);
                formData.append("headquarters", data.headquarters as string);
                formData.append(
                  "foundation_year",
                  data.foundation_year as string,
                );
                formData.append("industry", data.industry as string);
                formData.append("logo_url", data.logo_url as string);
                formData.append("recruiter_id", recruiterId);
                try {
                  const result = await updateCompanyAction(formData);
                  if (result?.errors) toast.error("Invalid inputs");
                  if (!result?.errors) {
                    toast.success("Company Info created");
                    router.push("/recruiter/company");
                  }
                } catch (err) {
                  toast.error("Error creating company");
                } finally {
                  setIsSubmitting(false);
                }
              },
            )}
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="headquarters"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Headquarters</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="industry"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={companyInfo.industry}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select the industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {industryOptions.map((option, index) => (
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
              name="foundation_year"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foundation Year</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="website"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="logo_url"
              control={form.control}
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Logo Url</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="size"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={companyInfo.size}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select the size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sizeOptions.map((option, index) => (
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
              name="about"
              control={form.control}
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="md:col-span-2"
            >
              {isSubmitting ? (
                <div className="flex gap-2 items-center">
                  <Loader2 className="animate-spin"></Loader2>
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
