'use client';
import { FormikValues } from 'formik';
import React, { createContext, ReactNode, useContext, useState } from 'react';

export const FreelancerContext = createContext<any>(0);


interface FreelancerContextProviderProps {
  children: ReactNode;
}

export default function FreelancerContextProvider({ children }: FreelancerContextProviderProps) {
  // Fetch offers by task ID
  const [ObjectUpdateOffers, setObjectUpdateOffers] = useState({})

async function AddProj(values: any): Promise<any> {
  const token = localStorage.getItem("Token");
  if (!token) {
    throw new Error("Authentication token is missing.");
  }
  
  try {
    // Create a FormData object to handle the form submission
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('link', values.link);
    formData.append('image', values.image); // Append the image file
    const response = await fetch(
      `https://freelance-platform-api.vercel.app/api/v1/freelancer_projects`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Do NOT set 'Content-Type' header to allow browser to set it correctly
        },
        body: formData, // Use FormData object for the body
      }
    );

    if (!response.ok) {
      // Handle errors based on the response status
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error(errorData.message || "Failed to add project");
    }

    const data = await response.json();
    console.log("Project added successfully:", data);
    return data;

  } catch (error) {
    console.error("Error submitting project:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
async function UpdateOffer(values: FormikValues , id:any ): Promise<any> {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error("Authentication token is missing.");
    }
    try {
      const response = await fetch(
        `https://freelance-platform-api.vercel.app/api/v1/offers/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.error("Error submitting offer:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
}
async function UpdateInfo(values: FormikValues ): Promise<any> {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error("Authentication token is missing.");
    }
    try {
      const response = await fetch(
        `https://freelance-platform-api.vercel.app/api/v1/profile`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.error("Error submitting offer:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
}
async function AddTask(values: any ): Promise<any> {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error("Authentication token is missing.");
    }
    try {
      const response = await fetch(
        `https://freelance-platform-api.vercel.app/api/v1/tasks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.error("Error submitting offer:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
}
// * check true 
async function DeleteOffer(id: string): Promise<any[] | undefined> {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error("Authentication token is missing.");
    }
    try {
      const response = await fetch(
        `https://freelance-platform-api.vercel.app/api/v1/offers/${id}`,
              {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error Delete offers:", error);
      return undefined;
    }
}
// * check true 
async function AddOffer(values: FormikValues): Promise<any> {
    const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error("Authentication token is missing.");
    }
    try {
      const response = await fetch(
        "https://freelance-platform-api.vercel.app/api/v1/offers",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      // console.log(data);
      return data;
    } catch (error) {
      console.error("Error submitting offer:", error);
      throw error; // Re-throw the error to be handled by the caller
    }
}


  return (
    <FreelancerContext.Provider value={{ DeleteOffer , AddTask,AddProj,UpdateInfo ,UpdateOffer,setObjectUpdateOffers ,ObjectUpdateOffers , AddOffer }}>
      {children}
    </FreelancerContext.Provider>
  );
}
