import React from 'react'
import Hero from './Hero'
import { LogoTicker } from './LogoTicker'
import Enterprise from './Enterprise'
import Catagory from './Catagory'
import ForClients from './ForClients'
import WhyUs from './WhyUs'
import JoinWithUs from './JoinWithUs'

export default function LandingPage() {
  return (
    <div>
        <Hero />
        <LogoTicker />
      <Enterprise />
      <Catagory />
      <ForClients />
      <WhyUs />
      <JoinWithUs />
    </div>
  )
}
