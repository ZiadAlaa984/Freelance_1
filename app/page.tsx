'use client'
import { useState, useEffect } from "react";
import Loader from "@/components/Const/loader";
import LandingPage from "./landingPage/page";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? <Loader /> : <LandingPage />}
    </>
  );
}
