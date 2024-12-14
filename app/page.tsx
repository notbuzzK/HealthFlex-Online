"use client";

// src/App.tsx
import PatientForm from '@/components/forms/PatientForm';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import Card from '../components/card/card';
import Link from 'next/link';
import Image from 'next/image';
import Header from './header';
import Footer from './footer';
import ServiceSelection from './service-selection';
import Navbar from './navbar';
import AboutUs from './about';


export default function Home() {
  // Create a reference for the ServiceSelection section
  const resultsSectionRef = useRef<HTMLDivElement>(null);

  return (
    <section className="flex flex-col">
      <div className="Navbar fixed w-screen z-50">
        <Navbar />
      </div>
      <div id="home" className="Header">
        {/* Pass the reference to the Header */}
        <Header resultsSectionRef={resultsSectionRef} />
      </div>
      <div id="about-us">
        <AboutUs />
      </div>
      <div id="services"className="Services h-screen" ref={resultsSectionRef}>
        <ServiceSelection />
      </div>
      <div
        className="Book flex flex-col flex-wrap justify-center items-center max-h-full h-[80vh] gap-4"
        style={{
          backgroundImage:
            "radial-gradient(circle at bottom right, #061133, #253369)",
        }}
      >
        <span className='text-5xl font-bold text-white'>Book an Appointment now!</span>
        <p className='text-white'>Log in or sign up to schedule a HealthFlex appointment</p>

        <button className="bg-[#D9D9D9] text-[#061133] px-5 py-2.5 border-none rounded-lg cursor-pointer w-1/4 font-bold rounded-3xl">
          Login
        </button>

        <button className="bg-transparent border border-[#D9D9D9] text-[#E2C044] px-5 py-2.5 rounded-lg cursor-pointer w-1/4 font-bold rounded-3xl">
          Sign up
        </button>
      </div>
      <div id="contact" className="Footer h-1/5">
        <Footer title="footer" />
      </div>
    </section>
  );
}
