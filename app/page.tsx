"use client";

// src/App.tsx
import React, { useState, useCallback, useEffect, useRef, useContext } from 'react';
import Image from 'next/image';
import Logo from "/assets/images/HealthFlexLogo.png";
import newLogo from "/assets/images/WhiteHealthFlexLogo.png";
import Owner from "/assets/images/Owner.png";
import { SearchContext, useSearch } from "./search-context";
import { services } from "./services";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite.config";

interface Service {
    name: string;
    category: string;
    inclusion: { name: string }[]; 
    doctor?: string; 
    schedule?: string; 
}

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [color, setColor] = useState(false)
  const resultsSectionRef = useRef<HTMLDivElement>(null); // Reference sa results section
  const { searchTerm,setSearchTerm } = useSearch();
  console.log("Search Term from Context:", searchTerm);
  console.log("setSearchTerm from Context:", setSearchTerm);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredServices, setFilteredServices] = useState(services);
  const [expandedItem, setExpandedItem] = useState<Service | null>(null);
  const [isItemOpen, setIsItemOpen] = useState(false);
  const itemRef = useRef(null);
  const filters: string[] = ["All", "Lab Test", "Package", "Consultation"];

  const goToLogin = () => {
    router.push("src/login"); // Redirect to '/login'
  };

  const goToSignup = () => {
    router.push("src/sign-up"); // Redirect to '/login'
  };

  const goToUserDash = () => {
    router.push("src/user-dash"); // Redirect to '/login'
  };

  const goToAppointment = () => {
    router.push("src/appointment"); // Redirect to '/login'
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.get(); // Gamitin yung `account` from config
        if (session) setIsLoggedIn(true);
      } catch (error) {
        setIsLoggedIn(false);
      }
    };
    checkSession();
  }, []);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false); // Close the menu
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" }); // Smooth scrolling
    }
  };

  const changeColor = () => {
    if (window.scrollY >= 550) {
      setColor(true)
    }else{
      setColor(false)
    }
  }

  window.addEventListener('scroll', changeColor)

  const handleSearch = () => {
    
    if (resultsSectionRef.current) {
      resultsSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  // Handles filter button clicks
  const handleFilterButtonClick = (selectedCategory: string) => {
      if (selectedCategory === "All") {
          setSelectedFilters([]); // Reset filters
      } else {
          setSelectedFilters([selectedCategory]); // Apply selected filter
      }
  };
  
  // Effect to apply filtering when `selectedFilters` or `searchTerm` changes
  useEffect(() => {
      filterServices();
  }, [selectedFilters, searchTerm]);


  console.log("Search Term:", searchTerm);
  // Filters the services based on the selected category or search term
  const filterServices = () => {
      let tempServices = services;

      //Apply search filter if searchTerm exists
      if (searchTerm) {
        console.log("Search Term:", searchTerm);
          tempServices = tempServices.filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (item.inclusion && item.inclusion.some((test) =>
                test.toLowerCase().includes(searchTerm.toLowerCase()))) ||
              item.category.toLowerCase().includes(searchTerm.toLowerCase())
          );
      }

      // Apply category filter
      if (selectedFilters.length > 0) {
          tempServices = tempServices.filter(
              (item) => item.category === selectedFilters[0]
          );
      }

      setFilteredServices(tempServices);
  };

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (itemRef.current && !itemRef.current.contains(event.target)) {
        setIsItemOpen(false); // Close the menu
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };
  
  const handleSearchTermChange = debounce((value) => {
    console.log("Setting Search Term:", value); // I-log bago i-set
    setSearchTerm(value);
  }, 300);


  return (
    <section className="flex flex-col remove-scrollbar">
      {/* Navbar */}
      <nav className="Navbar fixed w-screen z-50">
        <div
          className={`flex justify-end items-center text-white ${
                    color
                      ? "bg-white bg-opacity-80 rounded-3xl shadow-xl mt-4 mr-10 ml-10 py-1 px-6 transition-all duration-500 ease-in-out"
                      : "bg-transparent py-2.5 px-6 transition-all duration-500 ease-in-out"
                    }`}
        >
          {/* Logo Section */}
          <div className="Name flex items-center mr-auto text-white text-2xl font-bold">
            <Image
              src={color ? Logo : newLogo} layout="intrinsic" width={color ? 45 : 40} height={color ? 45 : 40} alt='logo' className="w-full max-w-[150px] h-auto rounded-full mr-2"
            />
            <p className={`${color ? "text-[#253369]" : "text-white"}`}>HealthFlex</p>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:flex flex-1 items-center justify-center space-x-4 px-4">
            {["Home", "About Us", "Services", "Contact"].map((link, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(link.toLowerCase().replace(" ", "-"))}
                className={`text-base no-underline rounded-2xl transition-all duration-300 w-[90px]
                  ${color
                    ? hovered === index
                      ? "text-white bg-[#253369] p-1 px-2.5 transition-all duration-500 ease-in-out"
                      : "text-[#253369]"
                    : hovered === index
                      ? "text-[#253369] p-2.5 bg-white transition-all duration-500 ease-in-out"
                      : "text-white"
                  }`}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                {link}
              </button>
            ))}
          </div>

          
          {/* Login/Signup || Book/Profile */}
          <div className="hidden sm:flex justify-between space-x-3">
            {isLoggedIn ? (  
              <>
                <button
                  className={`px-4 py-1.5 border-none rounded-3xl cursor-pointer w-28 
                    ${color
                      ? "bg-[#253369] text-white"
                      : "bg-[#D9D9D9] text-[#061133]"
                    }`}
                  onClick={goToAppointment}
                >
                  Book
                </button>
                <button
                  className={`bg-transparent border text-[#E2C044] px-4 py-1 rounded-3xl cursor-pointer w-28 ${color ? "border-[#253369]" : "border-[#D9D9D9]"
                    }`}
                  onClick={goToUserDash}
                >
                  Profile
                </button>
              </>
            ) : (
                <>
                  <button
                    className={`px-4 py-1.5 border-none rounded-3xl cursor-pointer w-28 
                  ${color
                        ? "bg-[#253369] text-white"
                        : "bg-[#D9D9D9] text-[#061133]"
                      }`}
                    onClick={goToLogin}
                  >
                    Login
                  </button>
                  <button
                    className={`bg-transparent border text-[#E2C044] px-4 py-1 rounded-3xl cursor-pointer w-28 ${color ? "border-[#253369]" : "border-[#D9D9D9]"
                      }`}
                    onClick={goToSignup}
                  >
                    Sign up
                  </button>
              </>
            )}
          </div>
          <div className="justify-end block lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${color ? "text-[#253369]" : "text-white"}`}
            >
              {/* Hamburger Icon */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <div 
            ref={menuRef}
            className="lg:hidden bg-white shadow-md rounded-xl flex flex-col items-center p-4 space-y-2 bg-opacity-80 absolute right-0 w-[130px]">
            {/* Navigation Links */}
            {["Home", "About Us", "Services", "Contact"].map((link, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(link.toLowerCase().replace(" ", "-"))}
                className={`text-base no-underline rounded-2xl transition-all duration-300 
                  ${hovered === index
                    ? "text-white bg-[#253369] p-1 px-2.5 transition-all duration-500 ease-in-out"
                    : "text-[#253369]"}`}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
              >
                {link}
              </button>
            ))}
            {/* Login/Signup Buttons (Only for small screens) */}
            <div className="sm:hidden space-x-3">
              <button
                className={`px-4 py-1.5 border-none rounded-3xl cursor-pointer w-28 
                  ${color
                    ? "bg-[#253369] text-white"
                    : "bg-[#D9D9D9] text-[#061133]"
                  }`}
                onClick={goToLogin}
              >
                Login
              </button>

              <button
                className={`bg-transparent border text-[#E2C044] px-4 py-1 rounded-3xl cursor-pointer w-28 ${color ? "border-[#253369]" : "border-[#D9D9D9]"
                  }`}
                onClick={goToSignup}
              >
                Sign up
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Header */}
      <div id="home" className="Header">
        <div
          className="h-screen w-screen flex flex-col items-end justify-center text-right"
          style={{
            background: "radial-gradient(circle at bottom, #12205D, #020D38)",
          }}
        >
          <div className="flex items-center space-x-8 sm:mr-[150px] mr-12">
            {/* Image Section */}
            <div className="hidden md:block"> {/* Hide on small screens and below */}
              <Image
                src={Logo} // Replace with the correct path
                alt="Doctor"
                className="rounded-full max-w-sm object-cover"
              />
            </div>

            {/* Input Section */}
            <div className="text-white space-y-4">
              <h1 className="text-7xl font-bold">HealthFlex-<span className="text-[#E2C044]">Online</span></h1>
              <p className="text-2xl">
                Laboratory Appointment made{" "}
                <span className="font-semibold italic">easy</span>
              </p>
              <input
                type="text"
                placeholder="Search Services..."
                className="mt-4 px-4 py-2 text-black rounded-lg shadow-lg"
                onChange={(e) => handleSearchTermChange(e.target.value)} // Update the search term
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
      </div>


      <div id="about-us">
        <div className="relative flex flex-col justify-center items-center bg-[#D9D9D9] ">
          {/* First Div */}
          <div className="About flex flex-col lg:flex-row p-20">
            {/* Text Section */}
            <div className="flex flex-col items-end bg-[#D9D9D9] w-full">
              <p className="text-[#253369] text-5xl font-bold mb-10">About</p>

              <p className={`text-right ${isExpanded ? '' : 'line-clamp-4'} sm:ml-40 ml-12`}>
                Welcome to HealthFlex Online, your trusted partner in health and wellness. Established in 2021,
                our mission is to provide accurate, reliable, and timely laboratory services to support your
                healthcare needs. Located at <strong>UNIT 5 Blue Heights Bldg., Pasong Camachile 1, General Trias Cavite</strong>, we are equipped with state-of-the-art technology
                and a team of dedicated professionals committed to delivering the highest standard of care. At
                HealthFlex, we offer a wide range of diagnostic tests, including routine laboratory tests, x-ray, drug testing, consultation, etc.,
                designed to help patients and doctors make informed medical decisions. We take pride in ensuring
                precision and efficiency, all while maintaining a patient-centered approach. Your health is our priority.
                Trust us to provide you with exceptional healthcare and help you achieve optimal well-being.
              </p>

              {/* Read More Button */}
              <button
                onClick={handleReadMore} // Assuming handleReadMore is defined for toggling isExpanded
                className="mt-4 text-[#253369] font-semibold underline hover:text-[#E2C044]"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
            </div>

            <div className="lg:block flex justify-end mt-4 lg:mt-0">
              <img
                src="./assets/images/Logo.png" // Replace with correct path
                alt="Doctor"
                className="rounded-full max-w-sm object-cover"
              />
            </div>
          </div>


          {/* Second Div */}
          <div className="Charter flex-1 flex flex-col justify-center items-center text-center bg-[#12205D] text-white w-full px-20 pb-20">
            <p className="text-center p-4 text-4xl mt-[60px] font-bold">Organizational Charter</p>
            <div className="flex justify-evenly gap-10 mt-10">
              <div className="flex flex-col items-center">
                <img
                  src="./assets/images/Owner.png" // Replace with the correct path
                  alt="Doctor"
                  className="rounded-full max-w-sm object-cover"
                />
                <p><strong>CORAZON O. ARANDIA</strong></p>
                <p className='text-sm'>Owner</p>
              </div>

              <div className="flex flex-col items-center">
                <img
                  src="./assets/images/Logo.png" // Replace with the correct path
                  alt="Doctor"
                  className="rounded-full max-w-sm object-cover"
                />
                <p><strong>FLORECITA LUDIVINA T. SOLIS,MD.,FPSP</strong></p>
                <p className='text-sm'>Pathologist</p>
              </div>

              <div className="flex flex-col items-center">
                <img
                  src="./assets/images/Logo.png" // Replace with the correct path
                  alt="Doctor"
                  className="rounded-full max-w-sm object-cover"
                />
                <p><strong>HAZEL O. ARANDIA,RMT</strong></p>
                <p className='text-sm'>Medical Technologist</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div id="services" className="Services h-screen" ref={resultsSectionRef}>
        <div className="relative flex flex-col bg-[#D9D9D9] justify-center items-center mb-10">
          <div className="flex flex-row mt-20">
            <h1 className="text-5xl font-bold mb-4 text-[#253369]">Services Offered</h1>
          </div>

          <div className="flex flex-col items-center lg:flex-row lg:items-start min-h-max ">
            {/*Category Menu*/}
            <div className="category-container flex flex-col 
                            w-8/12 lg:w-64 min-h-max mr-4 mb-4
                            lg:bg-[#12205D] p-10 space-y-1 rounded-xl 
                            text-sm lg:text-md">
              <div className="hidden lg:block">
                <input
                  type="text"
                  placeholder={`Search ${selectedFilters.length === 0 || selectedFilters.includes("All") ? "Services..." : `${selectedFilters[0]}...`}`}
                  className="px-4 py-2 text-black rounded-full shadow-lg mb-2"
                  onChange={(e) => {
                    handleSearchTermChange(e.target.value);
                    setExpandedItem(null);
                  }} // Update the search term
                />
              </div>
              <div className="flex flex-row lg:flex-col">
                {filters.map((category, idx) => (
                  <button
                    key={`filters-${idx}`}
                    onClick={() => {
                      handleFilterButtonClick(category);
                      setExpandedItem(null);
                    }}
                    className={`button ${selectedFilters.includes(category) || (category === "All" && selectedFilters.length === 0)
                        ? "active text-white bg-blue-600"
                        : "text-blue-600 bg-[#D9D9D9]"
                      } px-4 py-2 rounded-xl hover:bg-blue-500 hover:transition-colors hover:duration-500 flex flex-col lg:w-40 w-32 mb-1`}
                  >
                    {category}
                  </button>
                ))}
                <div className="lg:hidden">
                  <input
                    type="text"
                    placeholder={`Search ${selectedFilters.length === 0 || selectedFilters.includes("All") ? "Services..." : `${selectedFilters[0]}...`}`}
                    className="px-4 py-2 text-black rounded-full shadow-lg mb-2 w-40"
                    onChange={(e) => {
                      handleSearchTermChange(e.target.value);
                      setExpandedItem(null);
                    }}
                  // Update the search term
                  />
                </div>
              </div>
            </div>

            {/*Results Section*/}
            
            <div className="flex remove-scrollbar">
              {/* Left Side: Grid View */}
              <div
                id="results-section"
                className="w-[620px] min-h-full h-[447px] max-h-full overflow-y-auto overflow-x-hidden remove-scrollbar"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 
                                    gap-2 sm:gap-4 
                                    auto-rows-[minmax(100px, 1fr)] sm:auto-rows-[minmax(120px, 1fr)] 
                                    w-full sm:max-w-[620px] 
                                    mx-auto sm:pr-4">
                  {filteredServices.map((item, idx) => (
                    <div
                      key={`services-${idx}`}
                      className="item relative flex flex-col items-start justify-start text-white bg-[#12205D] w-56 sm:w-48 h-28 p-2 scrollbar-hide shadow-md"
                    >
                      <p className="item-name font-bold text-lg">{item.name}</p>
                      <p className="category text-sm">{item.category}</p>
                      <button
                        className="absolute bottom-2 right-2 bg-white text-[#253369] text-sm px-3 py-1 rounded-full hover:bg-blue-600 hover:text-white"
                        onClick={() => {
                          setExpandedItem(item);
                          setIsItemOpen(!isItemOpen);
                        }}
                      >
                        View More
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Side: Details View */}
              <div
                className="hidden xl:flex flex-col w-[400px] max-h-[447px] bg-[#12205D] rounded-xl p-4 overflow-y-auto shadow-lg remove-scrollbar"
              >
                {expandedItem ? (
                  <div className="relative flex flex-col items-center ">
                    
                    <h2 className="text-2xl font-bold mb-4 text-white">{expandedItem.name}</h2>
                    <h2 className="text-xl mb-4 text-white">{expandedItem.category}</h2>
                    {expandedItem.category === "Lab Test" ? (
                      <div className="grid grid-cols-2 gap-4 auto-rows-[minmax(100px, 1fr)]">
                        {expandedItem.inclusion.map((test, index) => (
                          <div
                            key={index}
                            className="text-center bg-white text-black p-4 rounded shadow"
                          >
                            <p>{test}</p>
                          </div>
                        ))}
                      </div>
                    ) : expandedItem.category === "Package" ? (
                      <div>
                        <ul className="list-disc list-inside px-6 text-white">
                          {expandedItem.inclusion.map((test, index) => (
                            <li key={index} className="p-2">
                              {test}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="text-white">
                        <p>Doctor: {expandedItem.doctor}</p>
                        <p>Schedule: {expandedItem.schedule}</p>
                      </div>
                    )}
                  </div>
                ) : (
                    <p className="text-center text-white">Select an item to see details</p>
                )}
              </div>
            </div>
          </div>

          {/* Pop Out*/}
          {expandedItem && isItemOpen &&(
            <div
              className="xl:hidden absolute xl:flex flex-col w-[400px] max-h-[447px] bg-[#12205D] bg-transparency-80 rounded-xl p-4 overflow-y-auto shadow-lg remove-scrollbar"
            >
              <div 
                ref={itemRef}
                className="xl:hidden flex flex-col items-center">
                <button
                  className="absolute top-3 right-3 hover:bg-[#cf142b] hover:duration-500 text-white text-sm px-3 py-2 rounded-full"
                  onClick={() => setExpandedItem(null)}
                >
                  X
                </button>
                <h2 className="text-2xl font-bold mb-4 text-white">{expandedItem.name}</h2>
                <h2 className="text-xl mb-4 text-white">{expandedItem.category}</h2>
                {expandedItem.category === "Lab Test" ? (
                  <div className="grid grid-cols-2 gap-4 auto-rows-[minmax(100px, 1fr)]">
                    {expandedItem.inclusion.map((test, index) => (
                      <div
                        key={index}
                        className="text-center bg-white text-black p-4 rounded shadow"
                      >
                        <p>{test}</p>
                      </div>
                    ))}
                  </div>
                ) : expandedItem.category === "Package" ? (
                  <div>
                    <ul className="list-disc list-inside px-6 text-white">
                      {expandedItem.inclusion.map((test, index) => (
                        <li key={index} className="p-2">
                          {test}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="text-white">
                    <p>Doctor: {expandedItem.doctor}</p>
                    <p>Schedule: {expandedItem.schedule}</p>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      {/*EME*/}
      {!isLoggedIn &&(
      <div
        className="Book flex flex-col flex-wrap justify-center items-center text-center max-h-full h-[80vh] gap-4"
        style={{
          backgroundImage:
            "radial-gradient(circle at bottom right, #061133, #253369)",
        }}
      >
        <span className='text-5xl font-bold text-white '>Book an Appointment now!</span>
        <p className='text-white'>Log in or sign up to schedule a HealthFlex appointment</p>

        <button className="bg-[#D9D9D9] text-[#061133] px-5 py-2.5 border-none rounded-lg cursor-pointer w-1/4 font-bold rounded-lg"
                onClick={goToLogin}>
          Login
        </button>

        <button className="bg-transparent border border-[#D9D9D9] text-[#E2C044] px-5 py-2.5 rounded-lg cursor-pointer w-1/4 font-bold rounded-lg"
                onClick={goToSignup}>
          Sign up
        </button>
      </div>
      )}

      <div id="contact" className="Footer h-1/5">
        <div className="flex flex-col md:flex-row justify-around items-center bg-gray-100 p-6">
          <div>
            <p className="text-sm font-semibold text-gray-700">EMAIL</p>
            <a href="mailto:healthflexlab@gmail.com" className="text-blue-900">healthflexlab@gmail.com</a>
          </div>

          <div className="mt-4 md:mt-0">
            <p className="text-sm font-semibold text-gray-700">TELEPHONE</p>
            <a href="tel:+63468872186" className="text-blue-900">(046) 887-2186</a>
          </div>

          <div className="mt-4 md:mt-0">
            <p className="text-sm font-semibold text-gray-700">FACEBOOK</p>
            <a href="https://facebook.com/healthflexlab" target="_blank" className="text-blue-900">healthflexlab</a>
          </div>
        </div>
      </div>
    </section>
  );
}