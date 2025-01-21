"use client";

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
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/lib/actions/patient.actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function PasswordReset() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await resetPassword(values.email);
  }

  return (
      <Dialog>
        <DialogTrigger>Forgot your password? <span className="text-[#E2C044]">Click here</span></DialogTrigger>
        <DialogContent className="bg-blue-950 !rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-white">Password Reset</DialogTitle>
            <DialogDescription className="text-white">Enter your email address to reset your password.</DialogDescription>
            <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl w-3/4 mx-auto py-10"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Email Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email" {...field}
                    className="w-full p-2 border rounded bg-gradient-to-r from-white to-gray-400 text-black" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full p-2 rounded bg-[#E2C044] border border-gray-400">Submit</Button>
        </form>
      </Form>
          </DialogHeader>
        </DialogContent>
      </Dialog>

  );
}
