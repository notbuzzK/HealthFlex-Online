"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function SignUp() {
  const router = useRouter();

  const handleMakeAppointment = () => {
    // Navigate to the 'appointment' page inside the 'user-dash' folder
    router.push("/appointment");
  };

  return (
    <div className="bg-gradient-to-br remove-scrollbar from-[#253369] to-[#061133] text-black">
      <section className="container min-h-screen remove-scrollbar grid grid-flow-row md:grid-cols-6 md:grid-rows-6 gap-4">

        {/* Make Appointment */}
        <div className="bg-gradient-to-br from-[#D9D9D9] to-[#737373] drop-shadow-xl  md:col-span-3 md:row-span-2 m-4 rounded-3xl">
          <div className="h-full w-full p-5 grid gridrow3">
            <p className="text-4xl font-bold">Make Appointment</p>
            <p>Ready to make an appointment? Click the button below!</p>
            <Button 
              onClick={handleMakeAppointment} 
              className="rounded-3xl bg-[#E2C044] drop-shadow-lg"
            >
              Make Appointment
            </Button>
          </div>
        </div>

        {/* Profile */}
        <div className="bg-gradient-to-br from-[#D9D9D9] to-[#737373] drop-shadow-xl  md:col-span-3 md:row-span-6 m-4 rounded-3xl">
          <div>
            <section className="p-5">
              <p className="text-4xl font-bold">Profile</p>
              <p>Name: </p>
              <p>Email: </p>
              <p>Password: </p>
              <p>Contact Number: </p>
              <p>Age: </p>
              <p>Birthday: </p>
              <p>Sex: </p>
              <p>Medical Concerns: </p>
            </section>
            <section className="p-5">
              <p className="text-xl font-bold">User Tools</p>
              <div className="grid grid-cols-2">
                <div className="col-span-1">
                <p className="py-4">Update Information</p>
                <p>Contact Healthflex</p>
                <p>Upload Doctor's Recommendation</p>
                <p>Logout</p>
                </div>
                <div className="col-span-1 grid-">
                  <Button className="">
                    Update
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-gradient-to-br from-[#D9D9D9] to-[#737373] drop-shadow-xl  md:col-span-3 md:row-span-4 m-4 rounded-3xl">
          <div className="p-5">
            <p className="text-4xl font-bold">Appointments</p>
          </div>

          <div className="px-4">
            <Table>
              <TableCaption>A list of your appointments.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Appointment</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">1</TableCell>
                  <TableCell>Approved</TableCell>
                  <TableCell>Dec 21, 2024: 09:00 AM</TableCell>
                  <TableCell>Consultation</TableCell>
                  <TableCell className="text-right text-green-400">Approved</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

        </div>
        
        
      </section>
    </div>
  );
}
