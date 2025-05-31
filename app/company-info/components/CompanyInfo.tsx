"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { companyIndustry, companyInfoSchema } from "@/lib/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { createCompanyAction } from "@/actions/company";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { toast } from "sonner";

export default function CompanyInfo({ recruiterId }: { recruiterId: string }) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const selectOptions = companyIndustry.options;
  const form = useForm<z.infer<typeof companyInfoSchema>>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      name: "",
      email: "",
      about: "",
      foundation_year: "2000",
      headquarters: "",
      website: "",
      industry: undefined,
      logo_url: "",
    },
  });
  return (
    <div className="flex flex-col gap-4 justify-center items-start p-4 w-full h-full md:p-8">
      <Button variant="link" className="font-semibold text-gray-800" asChild>
        <Link href="/">
          <ArrowLeft size="10" />
          <span>Back to home</span>
        </Link>
      </Button>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Company Info</CardTitle>
          <CardDescription>Enter your company info</CardDescription>
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
                    const result = await createCompanyAction(formData);
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
    </div>
  );
}
