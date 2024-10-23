"use client";
import { Range, getTrackBackground } from "react-range";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosCloseCircle } from "react-icons/io"; // Icon for removing skills
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SelectScrollable } from "@/components/ui/SelectScrollable";
import { Button } from "@/components/ui/button";
import { SelectCatagory } from "@/components/ui/SelectCatagory";
import { FreelancerContext } from "@/Context/FreelancerContext";

// Validation schema for form fields
const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  duration: Yup.number()
    .required("Duration is required")
    .min(1, "Duration must be at least 1 day"),
  minPrice: Yup.number().required("Minimum Price is required"),
  maxPrice: Yup.number().required("Maximum Price is required"),
  category: Yup.string().required("Category is required"),  // Validate category
});

export default function AddTask() {
  let {AddTask}:any = useContext(FreelancerContext)
  const [skills, setSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<number[]>([25, 1000]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      duration: "",
      minPrice: "",
      maxPrice: "",
      category: "",  // Add category field
      keywords: [],  // Add keywords field
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
      console.log(values);
      let result = await AddTask(values);
        console.log(result);
        toast.success("Task added successfully!");
      formik.resetForm();
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  // Handle skill selection and update formik's keywords
  const handleSkillSelect = (skill: string) => {
    if (!skills.includes(skill)) {
      const newSkills = [...skills, skill];
      setSkills(newSkills);
      formik.setFieldValue("keywords", newSkills);  // Update formik's keywords
    }
  };

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    formik.setFieldValue("category", category);  // Update formik's category
  };

  // Remove skill from the list
  const deleteSkills = (skill: string) => {
    const updatedSkills = skills.filter((s) => s !== skill);
    setSkills(updatedSkills);
    formik.setFieldValue("keywords", updatedSkills);  // Update formik's keywords
  };

  // Handle budget range slider
  const handleRangeChange = (values: number[]) => {
    setValues(values);
    formik.setFieldValue("minPrice", values[0]);
    formik.setFieldValue("maxPrice", values[1]);
  };
  return (
    <>
      <ToastContainer />
      <section className="pt-[100px]">
        <h2 className="text-3xl capitalize font-bold text-[#3c8224]">Add Task</h2>

        <form
          onSubmit={formik.handleSubmit}
          className="flex mt-5 bg-white rounded-lg border p-5 flex-col gap-6"
        >
          {/* Title Input */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              onChange={formik.handleChange}
              value={formik.values.title}
              onBlur={formik.handleBlur}
              id="title"
              placeholder="Task title"
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 capitalize text-sm">{formik.errors.title}</div>
            )}
          </div>

          {/* Category Input */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="Category">Category</Label>
            <SelectCatagory onSkillSelect={handleCategorySelect} />
            {formik.touched.category && formik.errors.category && (
              <div className="text-red-500 capitalize text-sm">{formik.errors.category}</div>
            )}
          </div>

          {/* Duration Input */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="duration">Duration (days)</Label>
            <Input
              onChange={formik.handleChange}
              value={formik.values.duration}
              onBlur={formik.handleBlur}
              type="number"
              id="duration"
              placeholder="Task duration"
            />
            {formik.touched.duration && formik.errors.duration && (
              <div className="text-red-500 capitalize text-sm">{formik.errors.duration}</div>
            )}
          </div>

          {/* Description Textarea */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              rows={8}
              id="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Describe the task"
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-500 capitalize text-sm">{formik.errors.description}</div>
            )}
          </div>

          {/* Skills Section */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xl text-primary font-semibold">Skills</h4>
            <SelectScrollable onSkillSelect={handleSkillSelect} />
            <div
              className={`${
                skills.length > 0 ? "flex" : "hidden"
              } flex-wrap   gap-2 items-center border rounded-xl p-2 flex-1`}
            >
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="border gap-2 flex items-center justify-between px-3 py-1 text-black/75 bg-gray-100 rounded-md"
                >
                  <span className="capitalize">{skill}</span>
                  <span
                    onClick={() => deleteSkills(skill)}
                    className="rounded-full cursor-pointer text-black"
                  >
                    <IoIosCloseCircle />
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Range Slider */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-lg text-primary">Budget</h3>
            <h4 className="text-md">Salary range: ${values[0]} - ${values[1]}</h4>
            <div className="relative mb-6">
              <Range
               step={50} // Set the step to 50
                min={25}
                max={1000}
                values={values}
                onChange={handleRangeChange}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    className=" h-2  bg-gray-200 rounded-lg"
                    style={{
                      background: getTrackBackground({
                        values,
                        colors: ["#d0d0d0", "#3c8224", "#d0d0d0"],
                        min: 25,
                        max: 1000,
                      }),
                    }}
                  >
                    {children}
                  </div>
                )}
                renderThumb={({ props }) => (
                  <div {...props} className="w-4 h-4 bg-[#3c8224] rounded-full" />
                )}
              />
              <span className="text-sm text-gray-500 absolute start-0 -bottom-6">Min ($25)</span>
              <span className="text-sm text-gray-500 absolute end-0 -bottom-6">Max ($1000)</span>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <Button type="submit" className="px-6 py-2" disabled={loading}>
              {loading ? "Submitting..." : "Submit Task"}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}
