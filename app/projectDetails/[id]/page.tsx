"use client";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { useParams } from "next/navigation";
import SidebarProjectDetails from "../SidebarProjectDetails";
import Offer from "../Offer";
import { UserContext } from "@/Context/UserContext";
import FormOffer from "../FormOffer";
import Loader from "@/components/Const/loader"; // Assuming you have a Loader component

export default function ProjectDetails() {
  // * Variables
  const { fetchOffers, fetchDetails } = useContext(UserContext);
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [offers, setOffers] = useState<any[]>([]);
  const [update, setUpdate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<any>();
  const [state, setState] = useState(false);

  // Fetch Project Details
  async function fetchProjectDetails(id: string) {
    setLoading(true); // Set loading to true before fetching
    try {
      const result = await fetchDetails(id);
      setProject(result);
    } catch (error) {
      setError("Failed to load project details.");
    } finally {
      setLoading(false); // Set loading to false once data is fetched
    }
  }

  // Fetch Project Offers
  async function fetchProjectOffers(id: string) {
    try {
      const result = await fetchOffers(id);
      setOffers(result);
      console.log(result);
      
    } catch (error) {
      setError("Failed to load project offers.");
    }
  }

  useEffect(() => {
    if (id) {
      fetchProjectDetails(id);
      fetchProjectOffers(id);
    }
  }, [id]);

  // Re-fetch offers when state changes to true
  useEffect(() => {
    if (state) {
      fetchProjectOffers(id);
      setState(false);
    }
  }, [state, id]);

  if (loading) {
    // Show loading spinner when fetching data
    return (

        <Loader />

    );
  }

  return (
    <section className="pt-[100px]">
      <div className="flex justify-between gap-2 md:gap-0 items-center">
        <h3 className="text-2xl md:text-3xl capitalize text-nowrap text-md text-primary font-medium">
          {project?.title}
        </h3>
        <Button
          type="button"
          className="md:px-6 px-[6px] text-xs md:text-base flex gap-1 capitalize py-[1px] md:py-2"
          onClick={() => setState(true)} // Handle adding offers
        >
          Add offers <FaPlus className="text-xs" />
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-6 mt-5">
        <div className="xl:col-span-3 col-span-4 flex flex-col gap-6">
          {/* Project Details */}
          <div className="bg-white flex flex-col border rounded-lg">
            <h4 className="text-xl border-b border-gray-300 p-4 text-primary">
              Project Details
            </h4>
            <p className="md:text-lg text-md p-4">{project?.description}</p>
          </div>

          {/* Skills Needed */}
          <div className="bg-white flex flex-col border rounded-lg">
            <h4 className="text-xl border-b border-gray-300 text-primary capitalize p-4">
              Skills needed
            </h4>
            <div className="flex flex-wrap gap-2 items-center p-4 flex-1">
              {project?.keywords?.length ? (
                project.keywords.map((tag: string, idx: number) => (
                  <p
                    key={idx}
                    className="border px-2 py-1 md:text-sm text-xs text-black/75 bg-gray-200 rounded-full"
                  >
                    {tag}
                  </p>
                ))
              ) : (
                <p>No skills listed</p>
              )}
            </div>
          </div>

          {/* Add Offer Form */}
          <div className="bg-white flex flex-col border rounded-lg">
            <h4 className="text-xl border-b border-gray-300 p-4 capitalize text-primary">
              Add your offer now
            </h4>
            <FormOffer
              setUpdate={setUpdate}
              Update={update}
              setState={setState}
              id={id}
            />
          </div>

          {/* Offers Section */}
          <div className="bg-white flex flex-col border rounded-lg">
            <h4 className="text-xl border-b border-gray-300 p-4">Offers</h4>
            {offers ? (
              offers.map((offer, index) => {
                if (offer == null) {
                  return null; // Skip empty or invalid offers
                }
                return (
                  <Offer
                    key={offer.id || index} // Prefer offer.id if available
                    setUpdate={setUpdate}
                    setState={setState}
                    Offer={offer}
                    index={index}
                  />
                );
              })
            ) : (
              <p>No offers available.</p>
            )}
          </div>
        </div>

        {/* Sidebar Project Details */}
        <div className="xl:col-span-1 col-span-4">
          <div className="bg-white flex flex-col border rounded-lg">
            <SidebarProjectDetails project={project} />
          </div>
        </div>
      </div>
    </section>
  );
}
