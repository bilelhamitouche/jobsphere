"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { companyInfoSchema } from "@/lib/zod";
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
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { createCompanyAction } from "@/actions/company";

export default function CompanyInfo() {
  const form = useForm<z.infer<typeof companyInfoSchema>>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      name: "",
      email: "",
      about: "",
      foundation_year: "2000",
      headquarters: "",
      website: "",
      industry: "",
      logo_url: "",
    },
  });
  const { data: session, isPending: isSessionPending } =
    authClient.useSession();
  const router = useRouter();
  useEffect(() => {
    if (isSessionPending) return;
    if (session?.user.role !== "recruiter") router.push("/");
    if (!session) router.push("/recruiter-signin");
  }, [session, isSessionPending, router]);
  const { data: companyInfo, isPending } = useQuery({
    queryKey: ["companyInfo"],
    queryFn: getCompanyInfo,
  });
  useEffect(() => {
    if (!isPending && !isSessionPending && companyInfo.length !== 0)
      router.push("/recruiter");
  }, [companyInfo, isPending, isSessionPending, router]);
  if (isPending)
    return (
      <div className="flex flex-col gap-2 justify-center items-center w-full h-full">
        <Loader2 size="28" className="animate-spin text-primary"></Loader2>
        <span className="text-xl font-bold">Loading</span>
      </div>
    );
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Card className="w-3xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Company Info</CardTitle>
          <CardDescription>Enter your company info</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(
                async (data: z.infer<typeof companyInfoSchema>) => {
                  console.log("Hello world");
                  console.log(data);
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
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
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
                  <FormItem>
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
                  <FormItem>
                    <FormLabel>About</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Save</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
