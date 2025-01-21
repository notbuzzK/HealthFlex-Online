"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { confirmPasswordRecovery } from "@/lib/actions/patient.actions";

const formSchema = z.object({
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z
    .string()
    .min(8, "Password confirmation must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function PasswordRecoveryModal() {
  const searchParams = useSearchParams(); // Hook to access query params
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!userId || !secret) {
      toast.error("Invalid password recovery link.");
      return;
    }

    try {
      await confirmPasswordRecovery(userId, secret, values.password);
      toast.success("Password reset successfully! Please log in with your new password.");
    } catch (error) {
      console.error("Password recovery confirmation error:", error);
      toast.error("Failed to reset password. Please try again.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#253369] to-[#061133]">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6">Password Recovery</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Enter a new password" {...field} className="w-full p-2 border rounded bg-gradient-to-r from-white to-gray-400 text-black"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder="Confirm your password" {...field} className="w-full p-2 border rounded bg-gradient-to-r from-white to-gray-400 text-black"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full mt-4 p-2 rounded bg-[#E2C044] border border-gray-400">
              Reset Password
            </Button>
          </form>
        </Form>
        <div>
          <Button className="w-full mt-4 p-2 rounded border border-gray-400">
            <a href="/src/login">Back to Login</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
