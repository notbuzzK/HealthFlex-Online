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
import { adminLogin, updatePasskey } from "@/lib/actions/admin.actions"
import { useRouter } from "next/navigation"
import { userLogout } from "@/lib/actions/patient.actions"

const formSchema = z.object({
  passkey: z.string()
});

export default function AdminTools() {
    const router = useRouter();   
    
    const FormSchema = z.object({
      pin: z.string().min(8, {
        message: "Your one-time password must be 6 characters.",
      }),
    })
  
    const form = useForm < z.infer < typeof formSchema >> ({
      resolver: zodResolver(formSchema),
  
    })
  
    const handleLogout = async () => {
      await userLogout(router); 
    };
  
    async function onSubmit(values: z.infer < typeof formSchema > ) {
     
      // await account.deleteSession('current');
      console.log(values);
      try {
        updatePasskey(values).then((response) => {
          toast.success("Passkey update Successfully!");
        }).catch((error) => {
          toast.error(error.message || "Passkey update failed.");
          console.error("Update error:", error);
        });
      } catch (error) {
        console.error("Update", error);
        toast.error("Passkey update failed.");
      }
    }
  return (
    <div className="flex flex-col gap-4">
      <Dialog>
      <DialogTrigger className='text-green-500'>Admin Tools</DialogTrigger>
      <DialogContent className='bg-gradient-to-br from-[#D9D9D9] to-[#737373] !rounded-xl max-w-96'>
        <DialogHeader>
          <DialogTitle>Enter new passkey</DialogTitle>
          
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
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full">
                <Button type="submit" className="bg-[#E2C044] rounded-xl w-full">Submit new passkey</Button>
              </div>
              <div className="flex justify-between pt-5">
                <p>Logout</p>
                <Button type="button" className="bg-[#FF4F4E] rounded-xl" onClick={handleLogout}>Logout</Button>

              </div>
            </form>
          </Form>

        </DialogHeader>
      </DialogContent>
    </Dialog>
    </div>
  )
}