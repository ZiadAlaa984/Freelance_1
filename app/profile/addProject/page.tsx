'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useContext, useState } from 'react';
import { FreelancerContext } from '@/Context/FreelancerContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function AddProject() {

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  link: Yup.string().url('Invalid URL format').required('Link is required'),
  image: Yup.mixed().required('Image is required'), // Ensure image is provided
});
const { AddProj }: any = useContext(FreelancerContext);
const [loading, setloading] = useState(false)
    const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      link: '',
      image: null, // Initialize image as null
    },
    validationSchema,
    onSubmit: handleAddProject,
  });
  async function handleAddProject(values: {
    title: string;
    description: string;
    link: string;
    image: File | null;
  }) {
    try {

  setloading(true)
      const response = await AddProj(values); // Send all data in one request

      console.log(response);

      // Display success toast
      toast.success('Project added successfully!');
      setloading(false)
      // Reset form after successful submission
      formik.resetForm();
    } catch (error) {
      console.error(error);
      // Display error toast
      toast.error('Failed to add project. Please try again.');
    }
  }


  return (
    <>
      <ToastContainer />
      <section>
        <form onSubmit={formik.handleSubmit} className="p-4 flex flex-col gap-3 bg-white rounded-xl border">
          {/* Title Project */}
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="title">Title Project</Label>
            <Input
              type="text"
              id="title"
              name="title"
              placeholder="Enter project title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-600">{formik.errors.title}</div>
            )}
          </div>

          {/* Description Project */}
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="description">Description Project</Label>
            <Textarea
              rows={8}
              id="description"
              name="description"
              placeholder="Type your description here."
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="text-red-600">{formik.errors.description}</div>
            )}
          </div>

          {/* Link Project */}
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="link">Link Project</Label>
            <Input
              type="text"
              id="link"
              name="link"
              placeholder="Enter project link"
              value={formik.values.link}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.link && formik.errors.link && (
              <div className="text-red-600">{formik.errors.link}</div>
            )}
          </div>

          {/* File Upload */}
          <div className="grid w-full items-center gap-3">
            <Label htmlFor="file_input">Upload Image</Label>
            <input
              className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer"
              id="file_input"
              type="file"
              name="image" // Set name to match the formik field
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.currentTarget.files) {
                  formik.setFieldValue('image', e.currentTarget.files[0]); // Set file directly
                }
              }}
              onBlur={formik.handleBlur}
            />
            {formik.touched.image && formik.errors.image && (
              <div className="text-red-600">{formik.errors.image}</div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <Button disabled={loading} type="submit">
               {loading ? "loading ..." : "Add Project"}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}
