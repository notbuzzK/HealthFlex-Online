import React from "react";
import PatientForm from "@/components/forms/PatientForm";
import Link from 'next/link';


export default function SignUp() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-[#253369] to-[#061133] text-white">
        <section className="container">
          <div className="text-center pt-10">  
            <p className="text-5xl font-bold">Patient Form</p>
            <Link href="./">
              HealthFlex-<span className="text-[#E2C044]">Online</span>
            </Link>
          </div>

          <PatientForm />

        </section>

      </div> 
  )
} 