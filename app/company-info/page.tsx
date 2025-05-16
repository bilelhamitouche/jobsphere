"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { companyInfoSchema } from "@/lib/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getCompanyInfo } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function CompanyInfo() {
  const { data: session, isPending: isSessionPending } = authClient.useSession()
  const router = useRouter()
  useEffect(() => {
    if(isSessionPending) return;
    if(!session) router.push("/recruiter-signin")
  }, [session, isSessionPending, router]) 
  const { data: companyInfo, isPending } = useQuery({
    queryKey: ["companyInfo"],
    queryFn: getCompanyInfo,
    enabled: !!session,
  })
  console.log(companyInfo)
  useEffect(() => {
    if(!isPending && !isSessionPending && companyInfo.length !== 0) router.push("/recruiter")
  }, [companyInfo, isPending, isSessionPending, router])
  const form = useForm<z.infer<typeof companyInfoSchema>>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      name: "",
      email: "",
      about: "",
      foundation_year: 2000,
      website: "",
      industry: "",
    }
  })
  if (isPending) return <div className="h-full w-full justify-center items-center flex">
    <Loader2 className="animate-spin"></Loader2>
  </div>
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Card className="w-3xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Company Info</CardTitle>
          <CardDescription>Enter your company info</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full space-y-2">
              <FormField name="name" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="email" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="foundation_year" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Foundation Year</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="website" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Website (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="industry" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="logo_url" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo Image (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="about" control={form.control} render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>About (optional)</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="col-span-2"></Textarea>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <Button type="submit" className="col-span-2">Save</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
