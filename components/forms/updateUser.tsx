"use client"
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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger
} from "@/components/extension/multi-select"
import { updateUserDocument } from "@/lib/actions/patient.actions"
import { getUserInfo } from "@/lib/actions/patient.actions"
import { emphasize } from "@mui/material"
import { account } from "@/lib/appwrite.config"

const formSchema = z.object({
  fullName: z.string().optional(),
  password: z.string().min(8, "Password must be at least 8 characters long").optional(),
  currentPassword: z.string().min(8, "Password must be at least 8 characters long").optional(),
  number: z.string().regex(/^\d{7,15}$/, "Contact number must contain 7 to 15 digits").optional(),
  age: z.number().optional(),
  birthday: z.string().optional(),
  sex: z.string().optional(),
  medicalConcerns: z.array(z.string()).nonempty("Please at least one item").optional()
});


export default function UpdateUser() {

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
    defaultValues: {
      
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const user = await account.get();
      const updatedValues = {
        fullName: values.fullName || "",
        password: values.password  || "",
        currentPassword: values.currentPassword || "",
        number: values.number  || "",
        age: values.age  || 0,
        birthday: values.birthday  || "",
        medicalConcerns: values.medicalConcerns || [],
        sex: values.sex  || "",
      };

      Object.keys(values).forEach((key) => {
        if (values[key] !== "") {
          updatedValues[key] = values[key];
        }
      });

      updateUserDocument(user.email, updatedValues);
      console.log(updatedValues.password, updatedValues.currentPassword);
      toast.success("User information updated successfully!");
    } catch (error) {
      console.error("Error updating user information:", error);
      toast.error("Failed to update user information. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-3">
        
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input 
                placeholder="update name"
                className="rounded bg-gradient-to-r from-[#253369] to-[#061133] !text-white"
                type=""
                {...field} />
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
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input 
                placeholder="enter new password"
                className="rounded bg-gradient-to-r from-[#253369] to-[#061133] !text-white"
                type="text"
                {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter current password"
                  className="rounded bg-gradient-to-r from-[#253369] to-[#061133] !text-white"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-[#fa4147]">ONLY fill in if you want to change your password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Number</FormLabel>
              <FormControl>
                <Input 
                placeholder="enter new number"
                className="rounded bg-gradient-to-r from-[#253369] to-[#061133] !text-white"
                type="text"
                {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input 
                placeholder="enter new age"
                className="rounded bg-gradient-to-r from-[#253369] to-[#061133] !text-white"
                type="number"
                onChange={(e) => field.onChange(Number(e.target.value))} 
              />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birthday</FormLabel>
              <FormControl>
                <Input 
                placeholder="enter new birthday"
                className="rounded bg-gradient-to-r from-[#253369] to-[#061133] !text-white"
                type="text"
                {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sex</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="rounded bg-gradient-to-r from-[#253369] to-[#061133] !text-white">
                  <SelectTrigger>
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded bg-slate-300">
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
                
              <FormMessage />
            </FormItem>
          )}
        />
        
           <FormField
              control={form.control}
              name="medicalConcerns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical Concerns</FormLabel>
                  <FormControl>
                    <MultiSelector
                      values={field.value ?? []}
                      onValuesChange={field.onChange}
                      loop
                      className="rounded bg-gradient-to-r from-[#253369] to-[#061133] !text-white"
                    >
                      <MultiSelectorTrigger>
                        <MultiSelectorInput placeholder="Select Medical Concerns"/>
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                      <MultiSelectorList>
                        <MultiSelectorItem value={"React"}>React</MultiSelectorItem>
                        <MultiSelectorItem value={"Vue"}>Vue</MultiSelectorItem>
                        <MultiSelectorItem value={"Svelte"}>Svelte</MultiSelectorItem>
                      </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                  </FormControl>
                  
                  <FormMessage />
                </FormItem>
              )}
            />
          <div className="flex justify-end">
           <Button type="submit" className="bg-[#E2C044] rounded-xl">Submit</Button>
          </div>
      </form>
    </Form>
  )
}