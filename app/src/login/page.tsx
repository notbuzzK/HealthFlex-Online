"use client";

import LoginForm from '@/components/forms/LoginForm';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import sticker from '/assets/images/Sticker.jpg';


export default function Home() {
  return (
    <div className="flex h-screen max-h-screen bg-gradient-to-br from-[#253369] to-[#061133] text-white">
        <sxection className="remove-scrollbar container my-auto mx-auto">
          <div className="sub-container max-w-[496px]">
            <p className='text-4xl font-bold'>HealthFlex-<span className="text-[#E2C044]">Online</span></p>

            <LoginForm />

            <div className='tex-14-regular mt-20 flex justify-between'>
              <p className='justify-items-end text-dark-600 xl:text-left'>
                ©HealthFlex
              </p>
              <Link href="/admin" className="text-green-500">
                Admin
              </Link>
            </div>
          </div>
        </section>

        <Image 
          src={sticker}
          alt="Placeholder image"
          className='side-img max-w-[70%] rounded-l-3xl'
        />
    </div>
  )
}
