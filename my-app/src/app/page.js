'use client';
import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image';
const width = 300;
const height = 400;

function Page() {
  
      const router = useRouter()
  const navigates = () => { 

    router.push('/Product');
  }
  return (
    <div className='overflow-hidden'>
      <h1 className='text-center mt-10 md:mt-[4rem] lg:mt-[6rem] xl:mt-[3rem] text-3xl md:text-6xl'>welcome<p className='mt-0.5 transform   translate-x-[10%]'>to Dams</p></h1>

           <Image  className=' mt-10 shadow-2xl transform translate-x-[30%] md:translate-x-[90%] lg:translate-x-[130%] xl:ml-[15rem]'  src="/images/phone.jpeg" alt="dams logo"  width={300} height={400}  />
           <div className='w-40 h-40'>
            <h1 className='ml-5'>ultimate place to see live chart or trade crypto currencys
            <span className='text-blue-600 underline cursor-pointer' onClick={navigates}> click here</span>
            </h1>
           </div>

   
       {/* <h1 onClick={navigates}> Movie page </h1> */}

    </div>
  )
}

export default Page
