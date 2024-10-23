import { Button } from '@/components/ui/button';
import React from 'react';

export default function Enterprise() {
  return (
      <section className=' flex items-center justify-center'>
        <div className=' mx-auto flex flex-col xl:flex-row bg-[#13544E] rounded-xl drop-shadow-lg overflow-hidden h-full'>
          <div className='w-full  text-white xl:w-1/2 flex flex-col items-start gap-2 p-6 justify-between  '>
            <h2 className='text-xl md:text-2xl font-medium'>
              Enterprise Suite
            </h2>
            <p className='md:text-4xl xl:text-5xl  text-2xl md:leading-7  font-medium'>
              This is how
            </p>
            <p className='md:text-4xl xl:text-5xl  text-2xl md:leading-7 text-[#91e6b3] font-medium'>
              good companies
            </p>
            <p className='md:text-4xl xl:text-5xl  text-2xl md:leading-7 text-[#91e6b3] font-medium'>
              find good company.
            </p>
            <p className='md:text-xl text-md font-medium mt-4'>
              Access the top 1% of talent on Upwork, and a full suite of
              hybrid workforce management tools. This is how innovation works now.
            </p>
            <ul className='flex flex-col items-start mt-4 space-y-2'>
                          <li className='flex flex-row items-center gap-2'><img src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/f_auto,q_auto/brontes/for-enterprise/Skills.svg" className='w-4 h-4 object-contain' alt="" />Fill skill gaps with expert talent</li>
                          <li className='flex flex-row items-center gap-2'><img src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/f_auto,q_auto/brontes/for-enterprise/Briefcase.svg" className='w-4 h-4 object-contain' alt="" />Control your workflow: hire, classify and pay your talent</li>
                          <li className='flex flex-row items-center gap-2'><img src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/f_auto,q_auto/brontes/for-enterprise/Support.svg" className='w-4 h-4 object-contain' alt="" />Partner with Upwork for end-to-end support</li>

            </ul>
            <Button variant="outline" className='text-black'>Learn more</Button>
          </div>
          <div className='w-full indent-1 xl:w-1/2'>
            <img 
              src="https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/f_auto,q_auto/brontes/for-enterprise/enterprise-2023.jpg" 
              className='w-full object-cover h-full' 
              alt="Illustration of searching talent"
            />
          </div>
        </div>
      </section>
  );
}
