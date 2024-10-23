"use client";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as Yup from "yup";
import { useFormik } from "formik";
import { FreelancerContext } from "@/Context/FreelancerContext";
import { Textarea } from "@/components/ui/textarea";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface FormValues {
  implementationDuration: string;
  askingPrice: string;
  description: string;
  taskId?: number;
}

export default function FormOffer({ id, Update, setUpdate, setState }: any) {
  const { AddOffer, ObjectUpdateOffers, UpdateOffer }: any = useContext(FreelancerContext);
  const [loading, setLoading] = useState(false); // Add loading state
  let [ID, setID] = useState<number>(1);

  const validationSchema = Yup.object().shape({
    implementationDuration: Yup.number()
      .typeError("Must be a number")
      .required("Delivery time is required"),
    askingPrice: Yup.number()
      .typeError("Must be a number")
      .required("Offer value is required"),
    description: Yup.string().required("Offer details are required"),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      implementationDuration: '',
      askingPrice: '',
      description: "",
      taskId: +id,
    },
    validationSchema,
    onSubmit: Update ? updateOff : fetchHandleOffer,
  });

  async function fetchHandleOffer(values: FormValues) {
    setLoading(true); // Set loading to true
    try {
      const result = await AddOffer(values);
      console.log(result); // Inspect the result in the console
      
      if (result.message) {
        formik.resetForm();
        setState(true);
      } 
      if (result.errorMessage == "Not Authorized User") {
                toast.success("you can add offer if you client");
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false); // Reset loading to false
    }
  }

  async function updateOff(values: FormValues) {
    setLoading(true); // Set loading to true
    const idToUpdate = ID || ObjectUpdateOffers.id;
    try {
      let result = await UpdateOffer(values, idToUpdate);
      if (result.Message) {
        formik.resetForm();
        setState(true);
        setUpdate(false);
      } 
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false); // Reset loading to false
    }
  }

  useEffect(() => {
    if (Update && ObjectUpdateOffers) {
      formik.setValues({
        implementationDuration: ObjectUpdateOffers.implementation_duration || '0',
        askingPrice: ObjectUpdateOffers.askingPrice || '0',
        description: ObjectUpdateOffers.description || "",
      });
      setID(ObjectUpdateOffers.id);
    }
  }, [Update, ObjectUpdateOffers]);

  return (
    <>
            <ToastContainer />
      <form className="p-4" onSubmit={formik.handleSubmit}>
        <div className="grid gap-2 grid-cols-2">
          <div className="col-span-2 grid gap-6 grid-cols-2">
            <div className="grid col-span-2 md:col-span-1 w-full items-center gap-2">
              <Label htmlFor="implementationDuration">Delivery Time</Label>
              <Input
                type="text"
                id="implementationDuration"
                placeholder="Days"
                onChange={formik.handleChange}
                value={formik.values.implementationDuration}
                onBlur={formik.handleBlur}
              />
              {formik.touched.implementationDuration && formik.errors.implementationDuration ? (
                <div className="text-red-500 capitalize text-sm">
                  {formik.errors.implementationDuration}
                </div>
              ) : null}
            </div>
            <div className="grid col-span-2 md:col-span-1 w-full items-center gap-2">
              <Label htmlFor="askingPrice">Offer Value</Label>
              <Input
                type="text"
                id="askingPrice"
                placeholder="$"
                onChange={formik.handleChange}
                value={formik.values.askingPrice}
                onBlur={formik.handleBlur}
              />
              {formik.touched.askingPrice && formik.errors.askingPrice ? (
                <div className="text-red-500 capitalize text-sm">
                  {formik.errors.askingPrice}
                </div>
              ) : null}
            </div>
          </div>
          <div className="grid col-span-2 w-full items-center gap-2">
            <Label htmlFor="description">Offer Details *</Label>
            <Textarea
              rows={8}
              id="description"
              placeholder="Type your message here."
              onChange={formik.handleChange}
              value={formik.values.description}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className="text-red-500 capitalize text-sm">
                {formik.errors.description}
              </div>
            ) : null}
          </div>
        </div>
        <Button
          type="submit"
          className={`${Update && "bg-cyan-500 hover:bg-cyan-300"} mt-3`}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Loading..." : Update ? "Update Offer" : "Submit Offer"}
        </Button>
      </form>
    </>
  );
}
