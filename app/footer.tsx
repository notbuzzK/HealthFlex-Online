import React from 'react';

const Footer = ({ title }) => {
  return (
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

  );
};

export default Footer;
