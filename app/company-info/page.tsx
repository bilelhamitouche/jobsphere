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
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCompanyInfo } from "@/lib/utils";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createCompanyAction } from "@/actions/company";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function CompanyInfo() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();
  const router = useRouter();
  const { data: companyInfo, isPending } = useQuery({
    queryKey: ["companyInfo"],
    queryFn: getCompanyInfo,
  });
  useEffect(() => {
    if (isSessionPending) {
      return;
    }
    if (session && session?.user.role !== "recruiter") {
      router.push("/");
    }
    if ((!session && isSessionPending) || (!session && isSessionPending)) {
      router.push("/recruiter-signin");
    }
  }, [session, isSessionPending, router]);
  useEffect(() => {
    if (!isPending && !isSessionPending) {
      const companyInfoExists = companyInfo && companyInfo.length > 0;
      if (companyInfoExists) {
        router.push("/recruiter");
      }
    }
  }, [companyInfo, isPending, isSessionPending, router]);
  if (isPending || isSessionPending)
    return (
      <div className="flex flex-col gap-2 justify-center items-center w-full h-full">
        <Loader2 size="28" className="animate-spin text-primary"></Loader2>
        <span className="text-xl font-bold">Loading</span>
      </div>
    );
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
                  setIsLoading(true);
                  const formData = new FormData();
                  formData.append("name", data.name);
                  formData.append("email", data.email);
                  formData.append("about", data.about as string);
                  formData.append("foundation_year", data.foundation_year);
                  formData.append("website", data.website as string);
                  formData.append("headquarters", data.headquarters as string);
                  formData.append("industry", data.industry);
                  formData.append("logo_url", data.logo_url as string);
                  formData.append("recruiter_id", session?.user.id as string);
                  try {
                    const result = await createCompanyAction(formData);
                  } catch (err) {
                    console.log(err);
                  } finally {
                    setIsLoading(false);
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
                disabled={isLoading}
                className="md:col-span-2"
              >
                {isLoading ? (
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
