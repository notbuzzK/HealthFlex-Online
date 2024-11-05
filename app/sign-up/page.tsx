import React from "react";
import PatientForm from "@/components/forms/PatientForm";
import Image from "next/image";
import HealthflexLogo from "/assets/images/HealthflexLogo.png"


export default function Page() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-[#253369] to-[#061133] text-white">
        <section className="container">
          <div className="text-center pt-10">  
            <p className="text-5xl font-bold">Patient Form</p>
            <p>HealthFlex-<span className="text-[#E2C044]">Online</span></p>
          </div>

          <PatientForm />

        </section>

      </div> 
  )
} 