"use client";

import { recruiterSignUpAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { signUpSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

function SignUpForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  return (
    <Card className="min-w-sm">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>
          Sign Up to create a new recruiter account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            method="post"
            onSubmit={form.handleSubmit(
              async (data: z.infer<typeof signUpSchema>) => {
                const formData = new FormData();
                formData.append("name", data.name);
                formData.append("email", data.email);
                formData.append("password", data.password);
                setIsPending(true);
                try {
                  const result = await recruiterSignUpAction(formData);
                  if (result?.message) toast.error(result?.message);
                  if (!result?.message && !result?.errors) {
                    toast.success("Signed Up Successfully");
                    router.push("/recruiter-signin");
                  }
                } catch (err) {
                  if (err instanceof Error) {
                    toast.error(err.message);
                  }
                } finally {
                  setIsPending(false);
                }
              },
            )}
            className="space-y-6"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
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
                    <Input placeholder="" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <div className="flex gap-2 items-center">
                  <Loader2 className="animate-spin" />
                  <span>Please wait</span>
                </div>
              ) : (
                <span>Sign Up</span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <p className="text-sm">
          <span>Already have an account?</span>
          <Button variant="link" size="sm" asChild>
            <Link href="/recruiter-signin">Sign In</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}

export default SignUpForm;
