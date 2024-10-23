'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Img from "../../Img/undraw_login_re_4vu2.svg";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik, FormikHelpers } from "formik";
import { useContext, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from "@/Context/UserContext";

interface FormValues {
  email: string;
  password: string;
  role: string | undefined;
}

interface LoginResponse {
  token: string;
  role: string;
  errorMessage?: string;
}

export default function Login() {
  const router = useRouter();
  const { setToken, setRole } = useContext(UserContext) as {
    setToken: (token: string) => void;
    setRole: (role: string) => void;
  };
  const [loading, setLoading] = useState<boolean>(false);
  const { selected } = useParams() as { selected: string };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
      role: selected,
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  async function handleLogin(formValues: FormValues, { setSubmitting }: FormikHelpers<FormValues>) {
    setLoading(true);
    try {
      const response = await fetch("https://freelance-platform-api.vercel.app/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });
      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.errorMessage || "An error occurred during login.");
      }

      setToken(data.token);
      localStorage.setItem("Token", data.token);
      localStorage.setItem("Role", data.role);
      setRole(data.role);
      toast.success("Login successful!");
      router.push('/');
    } catch (error: any) {
      toast.error(error.message || "Login failed!");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="h-screen pt-[100px] md:py-[40px] flex justify-center items-center">
        <div className="grid grid-cols-2 border border-gray-200 px-6 py-12 shadow-md rounded-lg place-content-center lg:gap-14">
          <div className="lg:col-span-1 col-span-2 flex flex-col gap-4">
            <h2 className="lg:text-5xl text-2xl text-nowrap text-primary font-bold capitalize text-center">
              Welcome {selected}
            </h2>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
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
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </div>
          <div className="col-span-1 justify-center items-center hidden lg:flex flex-col">
            <Image src={Img} alt="loginImg" className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
