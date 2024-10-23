"use client";
import Loader from "@/components/Const/loader";
import { UserContext } from "@/Context/UserContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { IoEyeSharp } from "react-icons/io5";

// Define interfaces for project data
interface Project {
  id: string;
  title: string;
  project_image: string;
  no_of_views: number;
}

interface GalleryResponse {
  projectsGallertData: Project[];
}

export default function PortfolioData() {
  const { Gallery }: { Gallery: () => Promise<GalleryResponse> } = useContext(UserContext); // Use the GalleryResponse type

  const [galleryData, setGalleryData] = useState<Project[] | null>(null); // Use Project[] for the gallery data
  const [loading, setLoading] = useState(true);

  const imgPlaceHolder =
    "https://th.bing.com/th/id/OIP.uF4xhcEH4QKRB9cX8sMSeAHaFA?rs=1&pid=ImgDetMain"; // Placeholder image

  async function fetchData() {
    try {
      const galleryResponse = await Gallery();
      setGalleryData(galleryResponse.projectsGallertData);
      console.log(galleryResponse.projectsGallertData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching gallery data:", error);
      alert("Failed to fetch gallery data. Please try again later.");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="grid grid-cols-4 gap-6">
      {galleryData && galleryData.length > 0 ? (
        galleryData.map((project: Project) => (
          <Link href={`/profile/Project/${project.id}`} key={project.id}>
            <div className="md:col-span-2 cursor-pointer relative col-span-4 rounded-lg overflow-hidden lg:col-span-1 flex flex-col">
              <div className="bg-white h-full flex flex-col border">
                <Image
                  src={project.project_image || imgPlaceHolder}
                  className="w-full h-[200px] object-cover"
                  alt={project.title}
                />
                <div className="p-3">
                  <h4 className="font-bold capitalize">{project.title}</h4>
                  <p className="text-sm text-gray-500">
                    Views: {project.no_of_views}
                  </p>
                </div>
              </div>
              <div className="absolute hover:opacity-100 transition-opacity duration-300 opacity-0 bg-black/40 flex justify-center items-center w-full h-full">
                <IoEyeSharp className="text-4xl" />
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-xl font-bold text-center">No projects available.</p>
      )}
    </section>
  );
}
