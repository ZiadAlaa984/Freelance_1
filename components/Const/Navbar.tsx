"use client";
import React, { useContext, useState } from "react";
import { FaBars } from "react-icons/fa";
import Link from "next/link";
import ContainerWidth from "./ContainerWidth";
import { Button } from "../ui/button";
import { UserContext } from "@/Context/UserContext";
import { usePathname } from "next/navigation";

// Define UserContextType if not already defined
interface UserContextType {
  Token: string | null;
  setToken: (token: string | null) => void;
  Role: string | null;
  setRole: (role: string | null) => void;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { Token, setToken, setRole, Role } = useContext<UserContextType>(UserContext);
  const pathname = usePathname(); // Get the current path

  function logOut() {
    localStorage.removeItem('Token');
    localStorage.removeItem('Role');
    setToken(null);
    setRole(null);
  }

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const isActive = (path: string) => pathname === path ? "active" : ""; // Add your active classes here

  return (
    <header className="z-[100] left-0 fixed w-full border-b bg-white/75 backdrop-blur-lg border-gray-200 transition-all">
      <ContainerWidth>
        <div className="flex items-center gap-4 justify-between w-full">
          <div className="flex items-center gap-2 xl:gap-12">
            <button
              className="text-2xl xl:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <FaBars />
            </button>
            <h1 className="md:text-3xl font-serif text-2xl font-bold text-[#108A00]">
              <Link href="/">Freelance</Link>
            </h1>
            {Token && (
              <ul className="xl:flex hidden items-center gap-6">
                <li className={`font-semibold ${isActive('/projects')}`}>
                  <Link href="/projects">Find Projects</Link>
                </li>
                {Role === "freelancer" ? (
                  <li className={`font-semibold ${isActive('/profile')}`}>
                    <Link href="/profile">Profile</Link>
                  </li>
                ) : (
                  <li className={`font-semibold ${isActive('/addTask')}`}>
                    <Link href="/addTask">Add Task</Link>
                  </li>
                )}
              </ul>
            )}
          </div>
          {Token ? (
            <p onClick={logOut} className="font-semibold">
              <a href="/">LogOut</a>
            </p>
          ) : (
            <ul className="flex items-center gap-0 xl:gap-6">
              <li className={`font-semibold ${isActive('/enter')}`}>
                <Link href="/enter">Login</Link>
              </li>
              <li className="font-semibold">
                <Button className="hidden xl:block">
                  <Link href="/enter">Sign Up</Link>
                </Button>
              </li>
            </ul>
          )}

          <div
            className={`fixed inset-0 overflow-hidden transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"} z-50 bg-white backdrop-blur-lg px-4 py-2 h-screen transition-transform duration-300 ease-in-out xl:hidden`}
          >
            <nav className="flex flex-col justify-between gap-6">
              <button
                className="text-black self-end h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer"
                onClick={toggleMenu}
                aria-label="Close menu"
              >
                <svg
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
                    stroke="#000000"
                  />
                </svg>
              </button>
              {Token && (
                <ul className="flex flex-col gap-6">
                  <li className={`font-semibold ${isActive("/projects")}`}>
                    <Link href="/projects">Find Projects</Link>
                  </li>
                  {Role === "freelancer" ? (
                    <li className={`font-semibold ${isActive("/profile")}`}>
                      <Link href="/profile">Profile</Link>
                    </li>
                  ) : (
                    <li className={`font-semibold ${isActive("/addTask")}`}>
                      <Link href="/addTask">Add Task</Link>
                    </li>
                  )}
                </ul>
              )}
              {!Token && (
                <Button>
                  <Link href="/enter">Sign Up</Link>
                </Button>
              )}
            </nav>
          </div>
        </div>
      </ContainerWidth>
    </header>
  );
}
