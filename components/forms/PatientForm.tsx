"use client"
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
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { account, databases } from "@/lib/appwrite.config";
import { registerUser } from "@/lib/actions/patient.actions"; // Import the utility function
import * as sdk from "node-appwrite";
import { useState, useEffect } from 'react';
const items = [
  { id: "ph1", label: "ph1" },
  { id: "ph2", label: "ph2" },
  { id: "ph3", label: "ph3" },
  { id: "ph4", label: "ph4" },
  { id: "ph5", label: "ph5" },
  { id: "ph6", label: "ph6" },
  { id: "ph7", label: "ph7" },
  { id: "ph8", label: "ph8" },
  { id: "ph9", label: "ph9" },
  { id: "ph10",label: "ph10" },
] as const

const DATABASE_ID='6720cc9c000049efcd3c';
const PATIENT_COLLECTION_ID='6720ccbd0028468dee7e';

const formSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  age: z.number().min(0).max(100),
  dateOfBirth: z.string(),
  contactNo: z
    .string()
    .regex(/^\d{7,15}$/, "Contact number must contain 7 to 15 digits"), // Validate as string
  sex: z.string(),
  items: z.array(z.string()).min(1, "You have to select at least one item."),
});



export default function PatientForm() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  useEffect(() => {
    setSelectedItems(["ph1"]); // Set the default value of selected items
  }, []);
  

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      age: 0,
      dateOfBirth: "",
      contactNo: "",
      sex: "",
      items: ["ph1"],
    },
  });
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await registerUser(values); // Call the utility function
      toast.success("Registration successful!"); // Success notification
    } catch (error) {
      const errorAsError = error as Error;
      toast.error(errorAsError.message || "Registration failed. Please try again."); // Error notification
    }
  }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-bold">Full Name</FormLabel>
              <FormControl>
                <Input 
                className="border rounded bg-gradient-to-r from-white to-gray-400"
                placeholder="Juan Dela Cruz"
                
                type="text"
                {...field} />
              </FormControl>
              <FormDescription className="text-gray-300">Enter your full name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-bold">Email</FormLabel>
              <FormControl>
                <Input 
                className="border rounded bg-gradient-to-r from-white to-gray-400"
                placeholder="juanDelaCruz@gmal.com"
                
                type="email"
                {...field} />
              </FormControl>
              <FormDescription className="text-gray-300">Enter your email</FormDescription>
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
                className="border rounded bg-gradient-to-r from-white to-gray-400"
                placeholder="*******"

                {...field}
              />
              </FormControl>
              <FormDescription className="text-gray-300">Enter your password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        
        <div className="grid grid-cols-12 gap-4">
          
          <div className="col-span-6">
            
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold">Age</FormLabel>
                <FormControl>
                  <Input 
                    className="border rounded bg-gradient-to-r from-white to-gray-400"
                    placeholder="24"
                    type="number"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))} 
                  />
                </FormControl>
                <FormDescription className="text-gray-300">Enter your age</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          
          <div className="col-span-6">
            
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-bold">Birth day</FormLabel>
              <FormControl>
                <Input 
                className="border rounded bg-gradient-to-r from-white to-gray-400"
                placeholder="mmmm / dd / yyyy"
                
                type="text"
                {...field} />
              </FormControl>
              <FormDescription className="text-gray-300">Enter your birthday</FormDescription>
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
            name="contactNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-bold">Contact Number</FormLabel>
                <FormControl>
                  <Input
                    className="border rounded bg-gradient-to-r from-white to-gray-400"
                    placeholder="0999xxxxxxx"
                    type="text" // Ensure the input type is text
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-gray-300">
                  Enter your contact number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          
          <div className="col-span-6">
            
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-bold">Sex</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border rounded bg-gradient-to-r from-white to-gray-400 text-black">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded bg-white">
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription className="text-gray-300">Select your sex</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">

          <div className="col-span-12">
          <FormItem>
              <div className="mb-4">
                <FormLabel className="text-sm font-bold">Patient's Medical Concerncs: </FormLabel>
                <FormDescription className="text-gray-300">
                  Select all that apply
                </FormDescription>
              </div>
              <div className="grid grid-cols-4 gap-4 justify-evenly">
                {items.map((item: { id: string, label: string }) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-colgrid items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              className="rounded"
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                if (!field.value) {
                                  field.onChange([item.id]);
                                } else {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value.filter((id) => id !== item.id)
                                      );
                                }
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          </div>

        </div>

        <Button type="submit" className="w-full p-2 rounded bg-[#E2C044] border border-gray-400">Submit</Button>
      </form>
    </Form>
  )
}