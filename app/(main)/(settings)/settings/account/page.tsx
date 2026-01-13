"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { accountChangeSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { accountChangeAction } from "@/actions/account";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import DeleteAccountDialog from "./components/DeleteAccountDialog";

export default function Account() {
  const [isPending, setIsPending] = useState<boolean>(false);
  const form = useForm<z.infer<typeof accountChangeSchema>>({
    resolver: zodResolver(accountChangeSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Make changes to your account here. Click save when you&apos;re done.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              async (data: z.infer<typeof accountChangeSchema>) => {
                setIsPending(true);
                const formData = new FormData();
                formData.append("name", data.name);
                formData.append("email", data.email);
                try {
                  const result = await accountChangeAction(formData);
                  if (result?.message) toast.error(result.message);
                  if (!result?.errors && !result?.message)
                    toast.success("Account settings changed successfully");
                } catch (err) {
                  if (err instanceof Error) {
                    toast.error(err.message);
                  }
                } finally {
                  setIsPending(false);
                }
              },
            )}
            className="space-y-4"
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
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <div className="flex gap-2 items-center">
                  <Loader2 className="animate-spin" />
                  <span>Please wait</span>
                </div>
              ) : (
                <span>Save changes</span>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 items-start">
        <div className="space-y-2">
          <CardTitle>Delete account</CardTitle>
          <CardDescription>
            Delete your account and all it&apos;s resources
          </CardDescription>
        </div>
        <div className="p-4 space-y-4 w-full rounded-lg border-2 text-destructive bg-destructive/10 border-destructive/50 dark:border-destructive dark:bg-destructive/20">
          <div className="space-y-1">
            <h3 className="flex gap-1 items-center text-base font-semibold">
              <ExclamationCircleIcon className="size-6" />
              <span>Warning</span>
            </h3>
            <p className="text-sm">
              Please proceed with caution this cannot be undone.
            </p>
          </div>
          <DeleteAccountDialog />
        </div>
      </CardFooter>
    </Card>
  );
}
