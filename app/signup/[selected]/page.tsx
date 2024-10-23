'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Img from "../../Img/undraw_login_re_4vu2.svg";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const { selected } = useParams();
  const router = useRouter()

  // Validation schema for form
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      password: "",
      role: selected || "freelancer", // Default role if selected is not available
    },
    validationSchema,
    onSubmit: handleSignup,
  });

  // Handle signup
  async function handleSignup(formValues: any) {
    setLoading(true);
    try {
      const response = await fetch("https://freelance-platform-api.vercel.app/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errorMessage || "An error occurred during signup.");
      }
       router.push('/enter');
      // Show success toast
      toast.success("Signup successful!");
    } catch (error: any) {
      toast.error(error.errorMessage || "Signup failed!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <section className="h-screen pt-[100px] md:py-[40px] flex justify-center items-center ">
        <div className="grid grid-cols-2 border border-gray-200 px-6 py-12 shadow-md rounded-lg place-content-center lg:gap-14">
          <div className="lg:col-span-1 col-span-2 flex flex-col gap-4">
            <h2 className="lg:text-5xl text-2xl text-nowrap text-primary font-bold capitalize text-center">
              Create an Account
            </h2>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  onBlur={formik.handleBlur}
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-red-500 text-sm">{formik.errors.firstName}</div>
                ) : null}
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  onBlur={formik.handleBlur}
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-red-500 text-sm">{formik.errors.lastName}</div>
                ) : null}
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                  onBlur={formik.handleBlur}
                  type="tel"
                  id="phoneNumber"
                  placeholder="Phone Number"
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
                ) : null}
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  type="email"
                  id="email"
                  placeholder="Email"
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  type="password"
                  id="password"
                  placeholder="Password"
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm">{formik.errors.password}</div>
                ) : null}
              </div>

              <Button type="submit" className="px-6 py-2" disabled={loading}>
                {loading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>
          </div>
          <div className="col-span-1 justify-center items-center hidden lg:flex flex-col">
            <Image src={Img} alt="Signup Image" className="w-full" />
          </div>
        </div>
      </section>
    </>
  );
}
