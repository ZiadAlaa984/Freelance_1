"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import React, { useState } from "react";
import { FaUserTie, FaUser } from "react-icons/fa";

export default function Enter() {
const [selected, setSelected] = useState<string>("");

  const handleCheckboxChange = (value: string) => {
    setSelected(value);
  };

  return (
    <section className="h-screen pt-[100px] md:pt-[40px]  grid place-content-center">
      <div className="flex border flex-col border-gray-200 p-6 shadow-md rounded-lg  place-content-center  lg:gap-14">
        <h4 className="md:text-4xl pb-2 capitalize text-2xl text-primary font-bold text-center">
          Join as a client or freelancer
        </h4>
        <div className="grid grid-cols-2 gap-6">
          <div
            className={`col-span-2 md:col-span-1 py-8 px-4 flex flex-col items-center justify-between h-[200px] rounded-lg border cursor-pointer drop-shadow-lg hover:shadow-xl transition-all duration-300 text-center ${
              selected === "client" ? "border-[#3c8224]/45" : ""
            }`}
            onClick={() => handleCheckboxChange("client")}
          >
            <Checkbox
              className="ml-auto"
              checked={selected === "client"}
              onChange={() => handleCheckboxChange("client")}
              id="client"
            />
            <p className="text-center  flex text-primary flex-col items-center gap-6 font-medium text-xl md:text-2xl">
              <FaUserTie /> I am a client, hiring for a project
            </p>
          </div>
          <div
            className={`col-span-2 md:col-span-1 py-8 px-4 flex flex-col items-center justify-between h-[200px] rounded-lg border cursor-pointer drop-shadow-lg hover:shadow-xl transition-all duration-300 text-center ${
              selected === "freelancer" ? "border-[#3c8224]/45" : ""
            }`}
            onClick={() => handleCheckboxChange("freelancer")}
          >
            <Checkbox
              className="ml-auto"
              checked={selected === "freelancer"}
              onChange={() => handleCheckboxChange("freelancer")}
              id="freelancer"
            />
            <p className="text-center text-primary  flex flex-col items-center gap-6 font-medium text-xl md:text-2xl">
              <FaUser /> I'm a freelancer, looking for work
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:gap-6 gap-2 ">
          <Button
            disabled={!selected}
            className={`mt-6 md:col-span-1 col-span-2 ${
              !selected ? "opacity-50   capitalize cursor-not-allowed" : ""
            }`}
          >
            <Link href={`/login/${selected || ""}`} passHref>
              {selected ? `Join as a ${selected}` : "Select an option"}
            </Link>
          </Button>
          <Button
            disabled={!selected}
            className={`mt-6 md:col-span-1 col-span-2 ${
              !selected ? "opacity-50   capitalize cursor-not-allowed" : ""
            }`}
          >
            <Link href={`/signup/${selected || ""}`} passHref>
              {selected ? `Create as a ${selected}` : "Select an option"}
            </Link>
          </Button>


        </div>
      </div>
    </section>
  );
}
