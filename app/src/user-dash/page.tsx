"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import UserAppointmentsTable from "@/components/userAppointmentTable";
import { use } from "react";
import { userLogout } from "@/lib/actions/patient.actions";
import UserInfo from "@/components/userInfo";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export default function SignUp() {
  const router = useRouter();

  const handleMakeAppointment = () => {
    // Navigate to the 'appointment' page inside the 'user-dash' folder
    router.push("/src/appointment");
  };

  return (
    <div className="bg-gradient-to-br remove-scrollbar from-[#253369] to-[#061133] text-black ">
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
        <div className="bg-gradient-to-br from-[#D9D9D9] to-[#737373] drop-shadow-xl  md:col-span-3 md:row-span-6 m-4 rounded-3xl ">
          <div className="grid grid-rows-2 h-full">
            <section className="p-5 row-span-1">
              <p className="text-4xl font-bold">Profile</p>

              <UserInfo />

            </section>
            <section className="p-5 row-span-1 place-content-end">
              <p className="text-xl font-bold">User Tools</p>
              <div className="">
                <div className="flex justify-between items-center">
                  <p className="py-4">Update Information</p>
                  <Button className="bg-[#E2C044] rounded-xl">
                    Update
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <p className="py-4">Contact Healthflex</p>
                  <Popover>
                    <PopoverTrigger className="rounded-xl bg-[#E2C044] p-2 hover:bg-transparent duration-100 shadow-lg w-20">
                        Contact
                      </PopoverTrigger>
                    <PopoverContent className="bg-gray-300 rounded-xl mr-16 w-80">
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
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex justify-between items-center">
                  <p className="py-4">Logout</p>
                  <Button className="bg-[#E2C044] rounded-xl" onClick={userLogout}>
                    Logout
                  </Button>
                </div>
                
              </div>
            </section>
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-gradient-to-br from-[#D9D9D9] to-[#737373] drop-shadow-xl  md:col-span-3 md:row-span-4 m-4 rounded-3xl overflow-y-auto max-h-[450px]">
          <div className="p-5">
            <p className="text-4xl font-bold">Appointments</p>
          </div>

          <div className="px-4">
            <UserAppointmentsTable />
          </div>

        </div>
        
        
      </section>
    </div>
  );
}
