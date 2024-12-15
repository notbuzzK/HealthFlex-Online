"use client";

import React from "react";
import Image from 'next/image'; 
import { useSearch } from "./search-context";
import Logo from "/assets/images/HealthFlexLogo.png"


export default function Header({ resultsSectionRef }: { resultsSectionRef: React.RefObject<HTMLDivElement> }) {
  const { setSearchTerm } = useSearch();

  const handleSearch = () => {
    if (resultsSectionRef.current) {
        resultsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
};

  return (
    <div
      className="h-screen w-screen flex flex-col items-end justify-center text-right"
      style={{
        background: "radial-gradient(circle at bottom, #12205D, #020D38)",
      }}
    >
      <div className="flex items-center space-x-8 mr-[150px]">
        {/* Image Section */}
        <div>
          <Image
            src={Logo} // Replace with the correct path
            alt="Doctor"
            className="rounded-full max-w-sm object-cover"
          />
        </div>

        {/* Input Section */}
        <div className="text-white space-y-4">
          <h1 className="text-7xl font-bold">HealthFlex Online</h1>
          <p className="text-2xl">Laboratory Appointment made <span className="font-semibold italic">easy</span></p>
          <input
            type="text"
            placeholder="Search Services..."
            className="mt-4 px-4 py-2 text-black rounded-lg shadow-lg"
            onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
          />
          <button
                className="mt-4 bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-200"
                onClick={handleSearch} // Trigger scroll to results
            >
          Search  
          </button>
        </div>
      </div>
    </div>
  );
}
