'use client';
import Loader from '@/components/Const/loader';
import { UserContext } from '@/Context/UserContext';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

export default function Project() {
  const { id } = useParams<{ id: string }>();
  const { PortofolioProjectDetails }: any = useContext(UserContext);
  const imgPlaceHolder =
    'https://th.bing.com/th/id/OIP.uF4xhcEH4QKRB9cX8sMSeAHaFA?rs=1&pid=ImgDetMain'; // Placeholder image

  // State to manage project details and errors
  const [project, setProject] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // API call to fetch project details by id
    const fetchProjectDetails = async () => {
      try {
        setLoading(true);
        const response = await PortofolioProjectDetails(id); // Fetch project details by id
        setProject(response.project); // Ensure this is a valid structure from the context
      } catch (err) {
        setError('Failed to load project details.');
        console.error(err); // Optional: log error details for debugging
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProjectDetails();
    }
  }, [id, PortofolioProjectDetails]);

  if (loading) return <><Loader/> </>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <section >
      <div className="flex justify-between gap-2 md:gap-0 items-center">
        <h3 className="text-2xl md:text-3xl capitalize text-nowrap text-md text-primary font-medium">
          {project?.title || 'Project Title'}
        </h3>
      </div>
      <div className="grid grid-cols-4 gap-6 mt-5">
        {/* Main Project Image */}
        <div className="xl:col-span-3 col-span-4 flex flex-col gap-6">
          <div className="bg-white  flex flex-col border overflow-hidden rounded-lg">
            <img
              src={project?.project_image || imgPlaceHolder}
              alt={project?.title || 'Project Image'}
              className="w-full object-cover h-[400px]"
            />
          </div>
        </div>
        <div className="xl:col-span-1 col-span-4">
          <div className="bg-white flex flex-col border rounded-lg">
            <div className="flex flex-col p-4 gap-6">
              <div className="flex justify-between items-center">
                <span className="font-bold">No of Views:</span>
                <span className=" text-md w-fit px-2 py-1 rounded-md ">
                  {project?.no_of_views || 'N/A'}
                </span>
              </div>
              <div className="flex  flex-col">
                <span className="font-bold">Link:</span>
                <a href={project?.link || '#'} className="text-blue-500 text-nowrap  underline">
                  {project?.link ? project.link : 'No link provided'}
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Project Description */}
        <div className="xl:col-span-3 col-span-4 flex flex-col gap-6">
          <div className="bg-white flex flex-col border rounded-lg">
            <h4 className="text-xl border-b border-gray-300 p-4 text-primary">Project Details</h4>
            <p className="md:text-lg text-md p-4">
              {project?.description || 'No description available.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
