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
import { services } from "@/app/services"

const formSchema = z.object({
  lab: z.array(z.string()).nonempty("Please at least one item").optional(),
  packages: z.array(z.string()).nonempty("Please at least one item").optional(),
  consultation: z.array(z.string()).nonempty("Please at least one item").optional(),
  dateTime: z.coerce.date(),
  notes: z.string().optional()
});

export default function MyForm() {
  const router = useRouter();


  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [availableInclusions, setAvailableInclusions] = useState<string[]>([]);
  const [serviceInclusions, setServiceInclusions] = useState<Record<string, string[]>>({});


  // Function to handle service selection and show inclusions
  const handleServiceSelect = (serviceName: string) => {
    const service = services.find((s) => s.name === serviceName);
    if (service && service.inclusion) {
      setSelectedService(serviceName);
      setAvailableInclusions(service.inclusion);
    }
  };
  

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

  const handleInclusionChange = (serviceName: string, inclusions: string[]) => {
    setServiceInclusions((prev) => ({
      ...prev,
      [serviceName]: inclusions, // Update inclusions for this service
    }));
  };
  


  type AppointmentStatus = "pending" | "approved" | "declined";
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const user = await account.get();
      const allInclusions = Object.values(serviceInclusions).flat();
  
      const appointmentValues = {
        lab: values.lab || [],
        packages: values.packages || [],
        consultation: values.consultation || [],
        note: values.notes || "",
        dateTime: moment(values.dateTime).toISOString(),
        userId: user.$id,
        status: "pending" as AppointmentStatus,
        fullName: user.name,
        selectedInclusions: allInclusions, // Include all inclusions
      };
  
      const response = await makeAppointment(appointmentValues);
      toast.success("Appointment made successfully!");
      router.push("/src/user-dash");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unknown error occurred."
      );
      console.error("Error creating appointment:", error);
    }
  }
  
  
  return (
    <div className="min-h-screen remove-scrollbar bg-gradient-to-br from-[#253369] to-[#061133] felx">
      <section className="m-auto bg-gradient-to-br from-[#D9D9D9] to-[#737373] drop-shadow-xl rounded-3xl p-5 w-[70%] ">
        <p className="text-2xl md:text-4xl font-bold">Appointment</p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">

            <div className="grid md:grid-cols-12 gap-4">

              <div className="col-span-4">

                <FormField
                  control={form.control}
                  name="lab"
                  render={({ field }) => {
                    const labTest = services.filter(service => service.category === "Lab Test");

                    return (
                      <FormItem>
                        <FormLabel className="text-lg font-bold">Lab Test</FormLabel>
                        <FormControl>
                          <MultiSelector
                            values={field.value ?? []}
                            onValuesChange={value => {
                              field.onChange(value);
                              handleServiceSelect(value[value.length - 1]);
                            }}
                            loop
                            className="max-w-xs rounded bg-gradient-to-r from-[#253369] to-[#061133] !text-white"
                          >
                            <MultiSelectorTrigger>
                              <MultiSelectorInput placeholder="Select services" />
                            </MultiSelectorTrigger>
                            <MultiSelectorContent>
                              <MultiSelectorList className="bg-gray-300 rounded text-black">
                                {labTest.map(service => (
                                  <MultiSelectorItem key={service.name} value={service.name}>
                                    {service.name}
                                  </MultiSelectorItem>
                                ))}
                              </MultiSelectorList>
                            </MultiSelectorContent>
                          </MultiSelector>
                        </FormControl>
                        {selectedService && availableInclusions.length > 0 && (
                        <div className="mt-4">
                          <p className="text-md font-semibold">Inclusions for {selectedService}</p>
                          <MultiSelector
                            values={serviceInclusions[selectedService] || []}
                            onValuesChange={(inclusions) =>
                              handleInclusionChange(selectedService, inclusions)
                            }
                            className="max-w-xs rounded bg-gray-100 text-black"
                          >
                            <MultiSelectorTrigger>
                              <MultiSelectorInput placeholder="Select inclusions" />
                            </MultiSelectorTrigger>
                            <MultiSelectorContent>
                              <MultiSelectorList className="bg-white rounded">
                                {availableInclusions.map((inclusion) => (
                                  <MultiSelectorItem key={inclusion} value={inclusion}>
                                    {inclusion}
                                  </MultiSelectorItem>
                                ))}
                              </MultiSelectorList>
                            </MultiSelectorContent>
                          </MultiSelector>
                        </div>
                      )}

                        <FormDescription>Select multiple, if any</FormDescription>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              <div className="col-span-4">

                <FormField
                  control={form.control}
                  name="packages"
                  render={({ field }) => {
                    const packages = services.filter(service => service.category === "Package");

                    return (
                      <FormItem>
                        <FormLabel className="text-lg font-bold">Packages</FormLabel>
                        <FormControl>
                          <MultiSelector
                            values={field.value ?? []}
                            onValuesChange={value => {
                              field.onChange(value);
                              handleServiceSelect(value[value.length - 1]);
                            }}
                            loop
                            className="max-w-xs rounded bg-gradient-to-r from-[#253369] to-[#061133] !text-white"
                          >
                            <MultiSelectorTrigger>
                              <MultiSelectorInput placeholder="Select services" />
                            </MultiSelectorTrigger>
                            <MultiSelectorContent>
                              <MultiSelectorList className="bg-gray-300 rounded text-black">
                                {packages.map(service => (
                                  <MultiSelectorItem key={service.name} value={service.name}>
                                    {service.name}
                                  </MultiSelectorItem>
                                ))}
                              </MultiSelectorList>
                            </MultiSelectorContent>
                          </MultiSelector>
                        </FormControl>
                        <FormDescription>Select multiple, if any</FormDescription>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />;
              </div>

              <div className="col-span-4">

                <FormField
                  control={form.control}
                  name="consultation"
                  render={({ field }) => {
                    const packages = services.filter(service => service.category === "Consultation");

                    return (
                      <FormItem>
                        <FormLabel className="text-lg font-bold">Packages</FormLabel>
                        <FormControl>
                          <MultiSelector
                            values={field.value ?? []}
                            onValuesChange={value => {
                              field.onChange(value);
                              handleServiceSelect(value[value.length - 1]);
                            }}
                            loop
                            className="max-w-xs rounded bg-gradient-to-r from-[#253369] to-[#061133] !text-white"
                          >
                            <MultiSelectorTrigger>
                              <MultiSelectorInput placeholder="Select services" />
                            </MultiSelectorTrigger>
                            <MultiSelectorContent>
                              <MultiSelectorList className="bg-gray-300 rounded text-black">
                                {packages.map(service => (
                                  <MultiSelectorItem key={service.name} value={service.name}>
                                    {service.name}
                                  </MultiSelectorItem>
                                ))}
                              </MultiSelectorList>
                            </MultiSelectorContent>
                          </MultiSelector>
                        </FormControl>
                        <FormDescription>Select multiple, if any</FormDescription>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />;
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
      </section>
    </div>
  );
}
