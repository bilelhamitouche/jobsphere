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
import { companyIndustry, companyInfoSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface EditCompanyInfoProps {
  id: string;
  name: string;
  about: string | null;
  email: string;
  headquarters: string | null;
  industry: z.infer<typeof companyIndustry>;
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
  const selectOptions = companyIndustry.options;
  const form = useForm<z.infer<typeof companyInfoSchema>>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      name: companyInfo.name,
      email: companyInfo.email,
      about: companyInfo.about ?? "",
      headquarters: companyInfo.headquarters ?? "",
      industry: undefined,
      foundation_year: String(companyInfo.foundationYear),
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
              async (data: z.infer<typeof companyInfoSchema>) => {
                setIsSubmitting(true);
                const formData = new FormData();
                formData.append("name", data.name);
                formData.append("email", data.email);
                formData.append("about", data.about as string);
                formData.append("foundation_year", data.foundation_year);
                formData.append("website", data.website as string);
                formData.append("headquarters", data.headquarters as string);
                formData.append("industry", data.industry);
                formData.append("logo_url", data.logo_url as string);
                formData.append("recruiter_id", recruiterId);
                try {
                  const result = await updateCompanyAction(formData);
                  if (result?.errors) toast.error("Invalid inputs");
                  if (!result?.errors) toast.success("Company Info created");
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
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Enter a industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectOptions.map((option, index) => (
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
                    <Input type="number" {...field} />
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
