"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { resetPassword, userLogout } from "@/lib/actions/patient.actions";
import { Button } from "@/components/ui/button";
import UpdateUserButton from "../forms/updateUser";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import UpdateUser from "../forms/updateUser";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import UploadDocReco from "../UploadDocReco";
import PasswordReset from "../PasswordRecoveryModal";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});


export default function UserTools() {
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: { email: "" },
    });
  
    async function onSubmit(values: z.infer<typeof formSchema>) {
      await resetPassword(values.email);
    }

  const router = useRouter();

  const handleLogout = async () => {
    await userLogout(router); // Pass the router instance
  };
  
  /*
  <div className="flex justify-between items-center">
        <p className="py-4">Upload Doctor's Recommendation</p>
        
        // <UploadDocReco />

      </div>
  */

  return (
    <div className="">
      
      
      <div className="flex justify-between items-center">
        <p className="">Update Information</p>
        
        <Dialog>
          <DialogTrigger className="rounded-xl bg-[#E2C044]  hover:bg-transparent duration-100 shadow-lg w-20 h-9">Open</DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-[#D9D9D9] to-[#737373] !rounded-2xl max-h-[600px] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Update Information</DialogTitle>
              <DialogDescription>
                leave blank if you don't want to update
              </DialogDescription>

              <div>
                <UpdateUser />
              </div>

            </DialogHeader>
          </DialogContent>
        </Dialog>

      </div>

      <div className="pt-3">
        <div className="flex justify-between items-center">
          <p>Reset Password</p>
          <Dialog>
            <DialogTrigger  className="rounded-xl bg-[#E2C044]  hover:bg-transparent duration-100 shadow-lg w-20 h-9">Open</DialogTrigger>
            <DialogContent className="bg-blue-950 !rounded-xl">
              <DialogHeader>
                <DialogTitle className="text-white">Password Recovery</DialogTitle>
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
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="py-4">Contact Healthflex</p>
        <Dialog>
          <DialogTrigger className="rounded-xl bg-[#E2C044]  hover:bg-transparent duration-100 shadow-lg w-20 h-9">Open</DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-[#D9D9D9] to-[#737373] !rounded-2xl max-h-[600px] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>HealthFlex contacts</DialogTitle>
              <div>
              <div className="flex justify-between">
                <p>Mobile: </p>
                <p>0976-020-2486</p>
              </div>
              <div className="flex justify-between">
                <p>Telephone: </p>
                <p>(046) 887-2186</p>
              </div>
              <div className="flex justify-between">
                <p>Email: </p>
                <p>healthflexlab@gmail.com</p>
              </div>
              <div className="flex justify-between">
                <p>Facebook: </p>
                <p>healthflexlab</p>
              </div>
            </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>

      </div>
      <div className="flex justify-between items-center">
        <p className="py-4">Logout</p>
        <Button className="bg-[#FF4F4E] rounded-xl" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  )
}