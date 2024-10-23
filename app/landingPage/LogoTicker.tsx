'use client'
import acmeLogo from "../../app/Img/images/acme.png";
import quantumLogo from "../../app/Img/images/quantum.png";
import echoLogo from "../../app/Img/images/echo.png";
import celestialLogo from "../../app/Img/images/celestial.png";
import pulseLogo from "../../app/Img/images/pulse.png";
import apexLogo from "../../app/Img/images/apex.png";
import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  { src: acmeLogo, alt: "Acme Logo" },
  { src: quantumLogo, alt: "Quantum Logo" },
  { src: echoLogo, alt: "Echo Logo" },
  { src: celestialLogo, alt: "Celestial Logo" },
  { src: pulseLogo, alt: "Pulse Logo" },
  { src: apexLogo, alt: "Apex Logo" },
];

export const LogoTicker = () => {
  return <section >
    <div className=" relative ">

      <h2 className="md:text-4xl text-2xl ">Trusted By The World  most innovation Teams </h2>

      <div className="overflow-hidden flex mt-9    ">
        <motion.div
          transition={{
            duration: 10,
            ease: 'linear',
            repeat:Infinity,
          }}
          initial={{
        translateX:0
          }}
          animate={{
        translateX:'-50%'
          }}
          className="flex gap-16 flex-none pr-16 ">
        {images.map((imgSrc , index) =>   <Image key={index} className="flex-none" src={imgSrc.src} alt={imgSrc.alt}/>)}
        {images.map((imgSrc , index) =>   <Image key={index} className="flex-none" src={imgSrc.src} alt={imgSrc.alt}/>)}

      </motion.div>
      </div>
    </div>
  </section>
};
