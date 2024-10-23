import React from "react";

export default function Footer() {
  return (
    <div className="   w-full border-t p-3   bg-white/75 backdrop-blur-lg border-gray-200  transition-all">

        <div className=" flex flex-col  items-center justify-center gap-6 w-full ">
          <h1 className="md:text-3xl text-2xl  font-serif  font-bold text-[#108A00]">Freelance</h1>
          <ul className="flex flex-col md:flex-row items-center  gap-2 md:gap-6">
            <li className="font-semibold capitalize">
              <a href="#" className="hover:underline hover:underline-offset-4">
                © 2024 Freelance Global Inc.
              </a>{" "}
            </li>
            <li className="font-semibold capitalize">
              <a href="#" className="hover:underline hover:underline-offset-4">
                Terms of Service
              </a>
            </li>
            <li className="font-semibold capitalize">
              <a href="#" className="hover:underline hover:underline-offset-4">
                Privacy Policy
              </a>
            </li>
            <li className="font-semibold capitalize"> copy write by ziadalaa</li>
          </ul>
        </div>

    </div>
  );
}
