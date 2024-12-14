"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { cn } from "@/lib/utils"
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { format } from "date-fns"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Calendar as CalendarIcon } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { makeAppointment } from "@/lib/actions/patient.actions"
import { SmartDatetimeInput } from "@/components/extension/smart-date-time-input"

const formSchema = z.object({
  Service: z.string(),
  Date: z.coerce.date(),
  reason: z.string().optional(),
  notes: z.string().optional()
});

export default function MyForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Date: new Date(),
      reason: "",
      notes: ""
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const appointmentValues = {
      Service: values.Service,
      Date: values.Date,
      reason: values.reason || '',
      note: values.notes || '',
    };
    makeAppointment(appointmentValues)
    .then((response) => {
     toast.success("Appointment made successfully!");
     console.log("Session:", );
   })
   .catch((error) => {
     toast.error(error.message || "Appointment creation failed");
     console.error("Appointment error:", error);
   })
  }

  return (
    <div className="min-h-screen remove-scrollbar bg-gradient-to-br from-[#253369] to-[#061133] flex">
      <section className="m-auto bg-gradient-to-br from-[#D9D9D9] to-[#737373] drop-shadow-xl rounded-3xl p-5 w-[70%]">
        <p className="text-4xl font-bold">Appointment</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
            
            <FormField
              control={form.control}
              name="Service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-bold">Service</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded bg-gradient-to-r from-[#253369] to-[#061133] text-white">
                        <SelectValue placeholder="Click to select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-300 rounded cursor-pointer">
                      <SelectItem value="Routine Laboratory Tests">Routine Laboratory Tests</SelectItem>
                      <SelectItem value="Drug Testing">Drug Testing</SelectItem>
                      <SelectItem value="X-RAY">X-RAY</SelectItem>
                      <SelectItem value="ECG">ECG</SelectItem>
                      <SelectItem value="Swab Testing">Swab Testing</SelectItem>
                      <SelectItem value="Annual Physical Examination">Annual Physical Examination</SelectItem>
                      <SelectItem value="Pre-Employment Medical">Pre-Employment Medical</SelectItem>
                      <SelectItem value="Consultation">Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Select service you need</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12">
                <FormField
                  control={form.control}
                  name="Date"
                  render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-bold">Date and Time</FormLabel>
                    <FormControl>
                      <SmartDatetimeInput
                        value={field.value}
                        onValueChange={field.onChange}
                        placeholder="e.g. Tomorrow morning 9am"
                        className="resize-none rounded bg-gradient-to-r from-[#253369] to-[#061133] text-white"
                        
                      />
                    </FormControl>
                    <FormDescription>Click on calendar icon to set</FormDescription>
                    <FormMessage />
                  </FormItem>
                  )}
                />
              </div>

            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">Reason for Appointment</FormLabel>
                      <FormControl>
                        <Textarea
                          className="resize-none rounded bg-gradient-to-r from-[#253369] to-[#061133] text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Enter reason for appointment (optional)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          className="resize-none rounded bg-gradient-to-r from-[#253369] to-[#061133] text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Enter notes (optional)</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button type="submit" className="bg-white- text-white rounded-3xl " onClick={() => router.push("/user-dash")}>Cancel</Button>
              <Button type="button" className="bg-[#E2C044] text-white drop-shadow-lg rounded-3xl">Book</Button>
            </div>
          </form>
        </Form>
      </section>
    </div>
  );
}
