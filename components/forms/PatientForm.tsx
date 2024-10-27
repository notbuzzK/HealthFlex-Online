"use client"
 
import Link from 'next/link';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"


const formSchema = z.object({
  userName: z.string(),
  password: z.string()
});

export default function PatientForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-lg w-full mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-bold">Email</FormLabel>
              <FormControl>
                <Input
                  className="w-full p-2 border rounded bg-gradient-to-r from-white to-gray-400"
                  placeholder="Enter your email here"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-bold">Password</FormLabel>
              <FormControl>
                <PasswordInput 
                  className="w-full p-2 border rounded bg-gradient-to-r from-white to-gray-400"
                  placeholder="Enter your password" 
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter your password.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full p-2 rounded bg-[#E2C044] border border-gray-400">Submit</Button>
      </form>
      <Link href="/sign-up" className='cursor-pointer'>
        Don't have an account? Create one here.
      </Link>
    </Form>
  );
}
