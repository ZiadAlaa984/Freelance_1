import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Hero() {
  return (
    <section className=' flex items-center pt-[100px]  justify-center'>
      <div className='container mx-auto flex flex-col md:flex-row items-center'>
        <div className='w-full md:w-1/2 gap-4 md:gap-6 flex flex-col items-start mb-8 md:mb-0'>
          <h2 className='text-5xl text-nowrap text-primary  md:text-6xl  xl:text-8xl font-medium'>
            How work
          </h2>
          <h2 className='text-5xl text-nowrap text-primary  md:text-6xl xl:text-8xl font-medium'>
            Should work
          </h2>
          <p className='text-md md:text-xl  font-medium mt-4'>
            Forget the old rules. You can have the best people.
            Right now. Right here.
          </p>
            <Button>
               <Link href="#">Get started</Link>
              </Button>
        </div>
        <div className='w-full  md:w-1/2'>
          <img 
            src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/c_scale,w_440,h_300,f_auto,q_auto,dpr_2.0/brontes/hero/searching-talent@1x.png" 
            className='w-full  object-contain' 
            alt="Illustration of searching talent"
          />
        </div>
      </div>
      </section>

  );
}
