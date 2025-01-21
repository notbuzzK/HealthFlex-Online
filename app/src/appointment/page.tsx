"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
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
import { checkUserAccess, makeAppointment } from "@/lib/actions/patient.actions"
import { SmartDatetimeInput } from "@/components/extension/smart-date-time-input"
import { account } from "@/lib/appwrite.config"
import moment from "moment"
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger
} from "@/components/extension/multi-select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const formSchema = z.object({
  lab: z.array(z.string()).nonempty("Please at least one item").optional(),
  packages: z.array(z.string()).nonempty("Please at least one item").optional(),
  consultation: z.array(z.string()).nonempty("Please at least one item").optional(),
  dateTime: z.coerce.date(),
  notes: z.string().optional()
});

export default function MyForm() {
  const router = useRouter();

  useEffect(() => {
    const verifyAccess = async () => {
      const hasAccess = await checkUserAccess(router);
      if (!hasAccess) return;
    };

    verifyAccess();
  }, [router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dateTime: new Date(),
      notes: ""
    },
  });


  type AppointmentStatus = "pending" | "approved" | "declined";
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const user = await account.get();
      console.log(user.$id);
      const appointmentValues = {
        lab: values.lab || [],
        packages: values.packages || [],
        consultation: values.consultation || [],
        note: values.notes || "",
        dateTime: moment(values.dateTime).toISOString(),
        userId: user.$id, 
        status: "pending" as AppointmentStatus,
        fullName: user.name,
      };
      console.log(appointmentValues.userId);

  
      const response = await makeAppointment(appointmentValues);
      toast.success("Appointment made successfully!");
      router.push("/src/user-dash");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Appointment creation failed");
      } else {
        toast.error("Unknown error occurred.");
      }
      console.error("Error creating appointment:", error);
    }
  }
  
  return (
    <div className="min-h-screen remove-scrollbar bg-gradient-to-br from-[#253369] to-[#061133] flex">
      <section className="m-auto bg-gradient-to-br from-[#D9D9D9] to-[#737373] drop-shadow-xl rounded-3xl p-5 w-[70%] ">
        <p className="text-2xl md:text-4xl font-bold">Appointment</p>
        <div className="flex flex-row justify-between items-center">
          <div className="bg-green">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Lab Tests</AccordionTrigger>
                <AccordionContent>
                  <Accordion>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Basic Tests</AccordionTrigger>
                      <AccordionContent>
                        <ul className="">
                          <li className="pt-1">▪️CBC PC</li>
                          <li className="pt-1">▪️Urinalysis</li>
                          <li className="pt-1">▪️Fecalysis</li>
                          <li className="pt-1">▪️Blood Typing</li>
                          <li className="pt-1">▪️Dengue Duo</li>
                          <li className="pt-1">▪️ECG</li>
                          <li className="pt-1">▪️HIV Test</li>
                          <li className="pt-1">▪️75 OGTT</li>
                          <li className="pt-1">▪️Hepa B</li>
                          <li className="pt-1">▪️VDRL</li>
                          <li className="pt-1">▪️Thyroid Function Test</li>
                          <li className="pt-1">▪️Hepatitis Profile</li>
                          <li className="pt-1">▪️Liver Profile</li>
                          <li className="pt-1">▪️Kidney Profile</li>
                          <li className="pt-1">▪️Antigen Swab</li>
                          <li className="pt-1">▪️RT-PCR</li>
                          <li className="pt-1">▪️X-ray</li>
                          <li className="pt-1">▪️Drug Testing</li>
                          <li className="pt-1">▪️Pap Smear</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Ultrasound</AccordionTrigger>
                      <AccordionContent>
                        <p>Advanced Tests</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

          </div>
          <div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

              <div className="grid md:grid-cols-12 gap-4">
              
              <div className="col-span-4">
                
              <FormField
                  control={form.control}
                  name="lab"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">Lab services</FormLabel>
                      <FormControl>
                        <MultiSelector
                          values={field.value ?? []}
                          onValuesChange={field.onChange}
                          loop
                          className="max-w-xs rounded bg-gradient-to-r from-[#253369] to-[#061133] !text-white"
                        >
                          <MultiSelectorTrigger>
                            <MultiSelectorInput placeholder="select services" />
                          </MultiSelectorTrigger>
                          <MultiSelectorContent>
                          <MultiSelectorList className="bg-gray-300 rounded text-black">
                            <MultiSelectorItem value={"Basic Tests"}>Basic Tests</MultiSelectorItem>
                            <MultiSelectorItem value={"Enzymes"}>Enzymes</MultiSelectorItem>
                            <MultiSelectorItem value={"Hepatitis"}>Hepatitis</MultiSelectorItem>
                            <MultiSelectorItem value={"Thyroid Function"}>Thyroid Function</MultiSelectorItem>
                            <MultiSelectorItem value={"Hematology"}>Hematology</MultiSelectorItem>
                            <MultiSelectorItem value={"Electrolytes"}>Electrolytes</MultiSelectorItem>
                            <MultiSelectorItem value={"Serology"}>Serology</MultiSelectorItem>
                            <MultiSelectorItem value={"Hormones"}>Hormones</MultiSelectorItem>
                            <MultiSelectorItem value={"Blood Chemistry"}>Blood Chemistry</MultiSelectorItem>
                            <MultiSelectorItem value={"Clinical Microscopy"}>Clinical Microscopy</MultiSelectorItem>
                            <MultiSelectorItem value={"Bacteriology"}>Bacteriology</MultiSelectorItem>
                            <MultiSelectorItem value={"Tumor Markers"}>Tumor Markers</MultiSelectorItem>
                          </MultiSelectorList>
                          </MultiSelectorContent>
                        </MultiSelector>
                      </FormControl>
                      <FormDescription>Select multiple, if any</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="col-span-4">
                
              <FormField
                  control={form.control}
                  name="packages"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">Packages</FormLabel>
                      <FormControl>
                        <MultiSelector
                          values={field.value ?? []}
                          onValuesChange={field.onChange}
                          loop
                          className="max-w-xs rounded bg-gradient-to-r from-[#253369] to-[#061133] !text-white"
                        >
                          <MultiSelectorTrigger>
                            <MultiSelectorInput placeholder="Select packages" />
                          </MultiSelectorTrigger>
                          <MultiSelectorContent>
                          <MultiSelectorList className="bg-gray-300 rounded text-black">
                            <MultiSelectorItem value={"Buntis Package"}>Buntis Package</MultiSelectorItem>
                            <MultiSelectorItem value={"CHEM 5"}>CHEM 5</MultiSelectorItem>
                            <MultiSelectorItem value={"CHEM 6"}>CHEM 6</MultiSelectorItem>
                            <MultiSelectorItem value={"CHEM 8"}>CHEM 8</MultiSelectorItem>
                            <MultiSelectorItem value={"CHEM 10"}>CHEM 10</MultiSelectorItem>
                            <MultiSelectorItem value={"CHEM 12"}>CHEM 12</MultiSelectorItem>
                          </MultiSelectorList>
                          </MultiSelectorContent>
                        </MultiSelector>
                      </FormControl>
                      <FormDescription>Select multiple, if any</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="col-span-4">
                
              <FormField
                  control={form.control}
                  name="consultation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">Consulation</FormLabel>
                      <FormControl>
                        <MultiSelector
                          values={field.value ?? []}
                          onValuesChange={field.onChange}
                          loop
                          className="max-w-xs rounded bg-gradient-to-r from-[#253369] to-[#061133] !text-white"
                        >
                          <MultiSelectorTrigger>
                            <MultiSelectorInput placeholder="Select consultation" />
                          </MultiSelectorTrigger>
                          <MultiSelectorContent>
                          <MultiSelectorList className="bg-gray-300 rounded text-black">
                            <MultiSelectorItem value={"OB-GYNE"}>OB-GYNE</MultiSelectorItem>
                            <MultiSelectorItem value={"PEDIATRICIAN"}>PEDIATRICIAN</MultiSelectorItem>
                            <MultiSelectorItem value={"GENERAL PHYSICIAN"}>GENERAL PHYSICIAN</MultiSelectorItem>
                          </MultiSelectorList>
                          </MultiSelectorContent>
                        </MultiSelector>
                      </FormControl>
                      <FormDescription>Select multiple, if any</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
            </div>

                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12">
                    <FormField
                      control={form.control}
                      name="dateTime"
                      render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-bold">Date and Time</FormLabel>
                        <FormControl>
                          <SmartDatetimeInput
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="e.g. Tomorrow morning 9am"
                            className="resize-none rounded bg-gradient-to-r from-[#253369] to-[#061133] !text-white"
                            
                          />
                        </FormControl>
                        <FormDescription>Click on calendar icon to set</FormDescription>
                        <FormMessage />
                      </FormItem>
                      )}
                    />
                  </div>

                </div>

                <div className="grid md:grid-cols-12 gap-4">

                  <div className="col-span-12">
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-lg font-bold">Note to Staff</FormLabel>
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
                  <Button type="button" className="bg-white- text-white rounded-3xl " onClick={() => router.push("/src/user-dash")}>Cancel</Button>
                  <Button type="submit" className="bg-[#E2C044] text-white drop-shadow-lg rounded-3xl">Book</Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}
