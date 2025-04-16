"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/lib/zod";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { signInAction } from "@/actions/auth";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

function SignInForm() {
  const router = useRouter();
  const [isPending, setIsPending] = useState<boolean>(false);
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <Card className="min-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign In</CardTitle>
        <CardDescription>Enter your email to Sign In</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            method="post"
            className="space-y-4"
            onSubmit={form.handleSubmit(
              async (data: z.infer<typeof signInSchema>) => {
                setIsPending(true);
                const formData = new FormData();
                formData.append("email", data.email);
                formData.append("password", data.password);
                try {
                  const result = await signInAction(formData);
                  result?.message && toast.error(result.message);
                  !result?.message &&
                    !result?.errors &&
                    toast.success("Signed In Successfully");
                  router.push("/jobs");
                } catch (err) {
                } finally {
                  setIsPending(false);
                }
              },
            )}
          >
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
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
            <Button type="submit" disabled={isPending} className="w-full">
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center w-full text-sm">
        <p>
          <span>Don&apos;t have an account?</span>
          <Button variant="link" size="sm" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
}

export default SignInForm;
