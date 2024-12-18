"use client";

import { useRouter } from "next/navigation"; // Import the useRouter hook
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { loginUser } from "@/lib/actions/patient.actions";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginForm() {
  const router = useRouter(); // Initialize useRouter inside the component

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginUser(values)
      .then((response) => {
        toast.success("Login successful! Welcome back!");
        router.push("/src/user-dash")
      })
      .catch((error) => {
        toast.error(error.message || "Login failed. Please check your credentials.");
        console.error("Login error:", error);
      });
  }

  const goToSignUp = () => {
    router.push("/src/sign-up");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-lg w-full mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="email"
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
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full p-2 rounded bg-[#E2C044] border border-gray-400">
          Submit
        </Button>
      </form>
      <p className="cursor-pointer text-sm" onClick={goToSignUp}>
        Don't have an account? <span className="text-[#E2C044]">Create one here.</span>
      </p>
    </Form>
  );
}
