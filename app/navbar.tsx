"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Logo from "/assets/images/HealthFlexLogo.png"

export default function Navbar() {
  // State for tracking the hovered menu item
  const [hovered, setHovered] = useState(null);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" }); // Smooth scrolling
    }
  };

  const [color, setColor] = useState(false)
  const changeColor = () => {
    if (window.scrollY >= 550) {
      setColor(true)
    }else{
      setColor(false)
    }
  }

  window.addEventListener('scroll', changeColor)

  return (
    <nav
      className={`flex relative justify-end items-center text-white ${
        color
          ? "bg-white bg-opacity-80 rounded-3xl shadow-xl mt-4 mr-10 ml-10 py-1 px-6 transition-all duration-500 ease-in-out"
          : "bg-transparent py-2.5 px-6 transition-all duration-500 ease-in-out"
      }`}
>
      {/* Logo Section */}
      <div className="Name flex items-center mr-auto text-white text-2xl font-bold">
        <Image
          src={Logo} layout="intrinsic" width={50} height={50} alt='logo' className="w-full max-w-[150px] h-auto"
        />
        <p className={`${color ? "text-[#253369]" : "text-white"}`}>HealthFlex</p>
      </div>

      {/* Navigation Links */}
      <div className="flex absolute inset-0 object-center items-center justify-between px-[430px] space-x-4">
        {["Home", "About Us", "Services", "Contact"].map((link, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(link.toLowerCase().replace(" ", "-"))}
            className={`text-base no-underline rounded-2xl transition-all duration-300 
              ${color
              ? hovered === index
                ? "text-white bg-[#253369] p-1 px-2.5 transition-all duration-500 ease-in-out"
                : "text-[#253369]"
              : hovered === index
                ? "text-[#253369] p-2.5 bg-white transition-all duration-500 ease-in-out"
                : "text-white"}`}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}>
            {link}
          </button>
        ))}
      </div>

      <div className="buttons justify-between space-x-3">
        <button 
          className={` px-4 py-1.5 border-none rounded-3xl cursor-pointer w-28
                    ${color ? "bg-[#253369] text-white":"bg-[#D9D9D9] text-[#061133]"}`}>
          Login
        </button>

        <button 
          className={`bg-transparent border  text-[#E2C044] px-4 py-1 rounded-3xl cursor-pointer w-28
                    ${color ? "border-[#253369]" : "border-[#D9D9D9]"}`}>
          Sign up
        </button>
      </div>
    </nav>
  );
}
