import React from 'react';
import Image from 'next/image';

export default function AboutUs(){
  return (
    <div className="relative flex flex-col justify-center items-center bg-[#D9D9D9] ">
      {/* First Div */}
      <div className="About flex flex-row p-20">
        <div className="flex flex-col items-end bg-[#D9D9D9] w-full">
          <p className="text-[#253369] text-5xl font-bold mb-10">About</p>
          <p className="text-right ml-40">Welcome to HealthFlex Online, your trusted partner in health and wellness. Established in 2021, 
            our mission is to provide accurate, reliable, and timely laboratory services to support your
            healthcare needs. Located at <strong>UNIT 5 Blue Heights Bldg., Pasong Camachile 1,General Trias Cavite </strong>, we are equipped with state-of-the-art technology 
            and a team of dedicated professionals committed to delivering the highest standard of care. At 
            HealthFlex, we offer a wide range of diagnostic tests, including routine laboratory tests, x-ray, drug testing, consultation, etc., 
            designed to help patients and doctors make informed medical decisions. We take pride in ensuring 
            precision and efficiency, all while maintaining a patient-centered approach. Your health is our priority. 
            Trust us to provide you with exceptional healthcare and help you achieve optimal well-being.
          </p>
        </div>
        <div>
          <img
                src="./assets/images/Logo.png" // Replace with the correct path
                alt="Doctor"
                className="rounded-full max-w-sm object-cover"
              />
        </div>
      </div>

      {/* Second Div */}
      <div className="Charter flex-1 flex flex-col justify-center items-center bg-[#12205D] text-white w-full px-20 pb-20">
        <p className="text-center p-4 text-4xl mt-[60px] font-bold">Organizational Charter</p>
        <div className="flex justify-evenly gap-10 mt-10">
          <div className="flex flex-col items-center">
            <img
              src="./assets/images/Logo.png" // Replace with the correct path
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
  );
};

