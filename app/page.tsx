// src/App.tsx
import PatientForm from '@/components/forms/PatientForm';
import React from 'react';
import Card from '../components/card/card';
import Link from 'next/link';
import Image from 'next/image';

// function App() {
//   return (
//     <div className="App">
//       <Card
//         title="No Image Card"
//         description="This is a card without an image."
//       />
//     </div>
//   );
// }

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container my-auto mx-auto">
          <div className="sub-container max-w-[496px]">
            <h1>HealthFlex-Online</h1>

            <PatientForm />

            <div className='tex-14-regular mt-20 flex justify-between'>
              <p className='justify-items-end text-dark-600 xl:text-left'>
                HealthFlex
              </p>
              <Link href="/?admin=true" className="text-green-500">
                Admin
              </Link>
            </div>
          </div>
        </section>

        <Image  
          src={require('/assets/images/damn.jpg')}
          height={1000}
          width={1000}
          alt='placeholder'
          className='side-img max-w-[50%]'
        />
    </div>
  )
}
