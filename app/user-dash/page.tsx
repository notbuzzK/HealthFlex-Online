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
      <section className="container min-h-screen remove-scrollbar grid grid-cols-1 grid-rows-auto gap-4 md:grid-cols-6 md:grid-rows-6">

        {/* Make Appointment Section */}
        <div className="bg-gradient-to-br from-[#D9D9D9] to-[#737373] drop-shadow-xl col-span-1 md:col-span-3 row-span-1 md:row-span-2 m-4 rounded-3xl">
          <div className="m-4 grid grid-flow-row grid-rows-3 h-5/6">
            <p className="text-4xl font-bold">Make Appointment</p>
            <p>Ready to make an appointment? Click the button below!</p>
            <Button 
              onClick={handleMakeAppointment} 
              className="rounded-3xl bg-[#E2C044]"
            >
              Make Appointment
            </Button>
          </div>
        </div>

        {/* Appointments Section */}
        <div className="bg-gradient-to-br from-[#D9D9D9] to-[#737373] drop-shadow-xl col-span-1 md:col-span-3 row-span-1 md:row-span-4 m-4 rounded-3xl">
          <div className="m-4">
            <p className="text-4xl font-bold">Appointments</p>
          </div>
        </div>

        {/* Profile Section */}
        <div className="bg-gradient-to-br from-[#D9D9D9] to-[#737373] drop-shadow-xl col-span-1 md:col-span-3 row-span-1 md:row-span-6 m-4 rounded-3xl">
          <div className="m-4">
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
      </section>
    </div>
  );
}
