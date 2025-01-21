"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import UserAppointmentsTable from "@/components/userAppointmentTable";
import { use, useEffect } from "react";
import UserInfo from "@/components/userInfo";
import UserTools from "@/components/ui/userTools";
import { checkUserAccess } from "@/lib/actions/patient.actions";

export default function SignUp() {
  const router = useRouter();

  useEffect(() => {
    const verifyAccess = async () => {
      const hasAccess = await checkUserAccess(router);
      if (!hasAccess) return;
    };

    verifyAccess();
  }, [router]);

  const handleMakeAppointment = () => {
    // Navigate to the 'appointment' page inside the 'user-dash' folder
    router.push("/src/appointment");
  };

  return (
    <div className="bg-gradient-to-br remove-scrollbar from-[#253369] to-[#061133] text-black">
      <section className="container min-h-screen remove-scrollbar grid lg:grid-cols-7 lg:grid-rows-4 gap-4 max-h-screen">

        {/* Make Appointment */}
        <div className="bg-gradient-to-br from-[#D9D9D9] to-[#737373] drop-shadow-xl  md:col-span-3 md:row-span-1 m-4 rounded-3xl">
          <div className="h-full w-full p-5">
            <p className="text-2xl font-bold pb-4">Make Appointment</p>
            <div className="md:flex justify-between items-center">
              <p>Ready to make an appointment? Click the button!</p>
              <Button 
                onClick={handleMakeAppointment} 
                className="rounded-3xl bg-[#E2C044] drop-shadow-lg"
              >
                Make Appointment
              </Button>
            </div>
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-gradient-to-br from-[#D9D9D9] to-[#737373] drop-shadow-xl  md:col-span-4 md:row-span-6 m-4 rounded-3xl overflow-y-auto md:max-h-[775px] remove-scrollbar">
        <div className="p-5">
            <p className="text-2xl font-bold">Appointments</p>
          </div>

          <div className="px-4">
            <UserAppointmentsTable />
          </div>
        </div>
        
        {/* Profile */}
        <div className="bg-gradient-to-br from-[#D9D9D9] to-[#737373] drop-shadow-xl  md:col-span-3 md:row-span-3 m-4 rounded-3xl overflow-y-auto md:max-h-[570px]">
          
          <div className="grid grid-rows-1 h-full">
            <section className="p-5 row-span-1">
              <p className="text-2xl font-bold">Profile</p>

              <UserInfo />

            </section>
            <section className="p-5 row-span-1 place-content-end">
              <p className="text-xl font-bold">User Tools</p>
              <UserTools />
            </section>
          </div>

        </div>
        
        
      </section>
    </div>
  );
}
