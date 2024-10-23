import { categories } from '@/lib/data';
import React from 'react';
export default function Catagory() {
    return (
    <section className=' flex flex-col gap-8'>
      <div className='specail_title flex-col gap-2 flex'>
        <h3 className='text-2xl md:text-4xl'>
          Browse talent by category
        </h3>
        <p className='text-md flex flex-row gap-2'>
          Looking for work? <span className='underline-offset-4 underline text-[#3c8224]'>Browse jobs</span>
        </p>
      </div>
      <div className='grid   grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
        {categories.map((category, index) => (
          <div key={index} className='col-span-1 md:col-span-1 lg:col-span-1  justify-center items-center h-[100px] gap-4 cursor-pointer drop-shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col border  rounded-md'>
            <h4 className='font-medium xl:text-xl text-sm text-center'>{category.label}</h4>
          </div>
        ))}
      </div>
   </section>
  );
}
