"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
          <div className="p-5">
            <p className="text-4xl font-bold">Profile</p>
            <p>Name: </p>
            <p>Email: </p>
            <p>Password: </p>
            <p>Contact Number: </p>
            <p>Age: </p>
            <p>Birthday: </p>
            <p>Sex: </p>
            <p>Medical Concerns: </p>
          </div>
        </div>

        {/* Appointments */}
        <div className="bg-gradient-to-br from-[#D9D9D9] to-[#737373] drop-shadow-xl  md:col-span-3 md:row-span-4 m-4 rounded-3xl">
          <div className="p-5">
            <p className="text-4xl font-bold">Appointments</p>
          </div>
        </div>

        
      </section>
    </div>
  );
}
