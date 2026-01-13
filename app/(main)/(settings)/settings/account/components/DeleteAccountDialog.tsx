import { accountDeleteAction } from "@/actions/account";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { accountDeleteSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function DeleteAccountDialog() {
  const [isPending, setIsPending] = useState(false);
  const form = useForm<z.infer<typeof accountDeleteSchema>>({
    resolver: zodResolver(accountDeleteSchema),
    defaultValues: {
      password: "",
    },
  });
  const router = useRouter();
  async function onSubmit(data: z.infer<typeof accountDeleteSchema>) {
    setIsPending(true);
    const formData = new FormData();
    formData.append("password", data.password);
    try {
      const result = await accountDeleteAction(formData);
      if (result?.errors || result?.message) {
        toast.error("Failed to delete account");
      }
      if (!result?.message && !result?.errors) {
        form.reset();
        router.push("/");
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setIsPending(false);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete your account?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Once your account is deleted, all of its resources and data will
            also be permanently deleted. Please enter your password to confirm
            you would like to permanently delete your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button variant="destructive" type="submit" disabled={isPending}>
                Delete Account
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
