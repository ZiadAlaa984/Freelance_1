
import { AccordionDemo } from '@/components/ui/AccordionDemo'

import React from 'react'

export default function WhyUs() {
  return (

      <section>
        <div className='specail_title flex-col gap-2 flex'>
        <h3 className='text-2xl md:text-4xl capitalize'>
          Why choose us
        </h3>
      </div>
      <div className='max-w-2xl   mx-auto py-6'>
        <AccordionDemo/>
      </div>
      </section>

  )
}
