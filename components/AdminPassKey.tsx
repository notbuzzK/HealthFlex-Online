"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { account } from "@/lib/appwrite.config"
import { adminLogin } from "@/lib/actions/admin.actions"
import { useRouter } from "next/navigation"
import { userLogout } from "@/lib/actions/patient.actions"


export default function AdminPassKey() {
  const router = useRouter();
  
  const formSchema = z.object({
    passkey: z.string()
  });

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),

  })

  const handleLogout = async () => {
    await userLogout(router); 
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const result = await adminLogin(values, router);
      if (result && !result.success) {
        console.warn("Admin login failed. Check credentials.");
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }
  
  

  return (
    <div>
      <Dialog>
      <DialogTrigger className='text-green-500'>Admin</DialogTrigger>
      <DialogContent className='bg-gradient-to-br from-[#D9D9D9] to-[#737373] !rounded-xl max-w-96'>
        <DialogHeader>
          <DialogTitle>Enter Admin passkey</DialogTitle>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto ">
        
              <FormField
                control={form.control}
                name="passkey"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={8} {...field}>
                        <InputOTPGroup className="bg-gradient-to-br from-[#253369] to-[#061133] !text-white !rounded-l-xl">
                          <InputOTPSlot index={0} className="!rounded-l-xl"/>
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup className="bg-gradient-to-br from-[#253369] to-[#061133] !text-white !rounded-r-xl">
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                          <InputOTPSlot index={6} />
                          <InputOTPSlot index={7} className="!rounded-r-xl"/>
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>You can update this inside admin dashboard</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end gap-4">
                <Button type="button" className="bg-[#E2C044] rounded-xl" onClick={handleLogout}>Logout</Button>
                <Button type="submit" className="bg-[#E2C044] rounded-xl">Submit</Button>
              </div>
            </form>
          </Form>

        </DialogHeader>
      </DialogContent>
    </Dialog>
    </div>
  )
}