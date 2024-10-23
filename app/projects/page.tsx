"use client";
import { useContext, useEffect, useState } from "react";
import { FaSliders } from "react-icons/fa6";
import { UserContext } from "@/Context/UserContext";
import SidebarProducts from "./SidebarProducts";
import Model from "./Model";
import Tasks from "@/components/ui/Tasks";
import Loader from "@/components/Const/loader"; // Assuming you have a Loader component
import React from 'react'

export default function Projects() {
  const { fetchTasks }: any = useContext(UserContext);
  const [tasks, setTasks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState<string | null>(null);
  const [values, setValues] = useState<number[]>([25, 1000]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    fetchData(searchQuery, selectedCategory, selectedDeliveryTime, values);
  }, [searchQuery, selectedCategory, selectedDeliveryTime, values]);
  // First useEffect: Handles initial data fetching with the loader
  useEffect(() => {
    const initialFetch = async () => {
      setLoading(true); // Show loader initially
      await fetchData(searchQuery, selectedCategory, selectedDeliveryTime, values);
      setLoading(false); // Remove loader after data is fetched
    };
    initialFetch();
  }, []); // Empty dependency array, runs only on mount

  async function fetchData(
    searchQuery: string,
    selectedCategory: string | null,
    selectedDeliveryTime: string | null,
    values: number[]
  ) {
    try {
      let result = await fetchTasks(searchQuery, selectedCategory, selectedDeliveryTime, values);
      setTasks(result);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
    }
  }

  // Toggle modal visibility
  const handleModalToggle = () => {
    setIsModalVisible((prev) => !prev);
  };
  return (
    <>
      {loading ? <Loader /> : <section className="pt-[100px]  mx-auto">
        <div className="flex justify-between  items-center">
          <h2 className="text-3xl capitalize font-bold text-[#3c8224]">
            Open Projects
          </h2>
          <span className="border block p-2 rounded-lg  lg:hidden">
            <FaSliders
              onClick={handleModalToggle}
              className="text-xl block lg:hidden cursor-pointer"
            />
          </span>
        </div>
        <div className="grid lg:gap-6 gap-0 mt-5 w-full grid-cols-4">
          {/* Check if loading is true, and show loader */}
          {loading ? (
            <div className="col-span-4 text-center">
              <Loader /> {/* Display a loader */}
            </div>
          ) : (
            <>
              <div className="lg:col-span-3 col-span-4 h-fit grid-cols-1 grid gap-y-6">
                {tasks.length > 0 ? (
                  tasks.map((task) => <Tasks key={task.id} task={task} />)
                ) : (
                  <div className="text-2xl text-center font-semibold capitalize">No projects exist</div>
                )}
              </div>

              {/* Sidebar for filtering products */}
              <SidebarProducts
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setSelectedCategory={setSelectedCategory}
                selectedCategory={selectedCategory}
                setSelectedDeliveryTime={setSelectedDeliveryTime}
                selectedDeliveryTime={selectedDeliveryTime}
                setValues={setValues}
                values={values}
              />
            </>
          )}

          {/* Modal for mobile view filtering */}
          {isModalVisible && (
            <Model
              isModalVisible={isModalVisible}
              onClose={handleModalToggle} // Close modal when onClose is triggered
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
              setSelectedDeliveryTime={setSelectedDeliveryTime}
              selectedDeliveryTime={selectedDeliveryTime}
              setValues={setValues}
              values={values}
            />
          )}
        </div>
      </section>}
    </>
  );
}

