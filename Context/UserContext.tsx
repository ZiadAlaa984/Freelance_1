'use client';
import React, { useEffect, useState, createContext, ReactNode, useCallback } from 'react';



// Create context with default value
export const UserContext = createContext<any>(0);

// Define the props type for UserContextProvider
interface UserContextProviderProps {
  children: ReactNode;
}

export default function UserContextProvider({ children }: UserContextProviderProps) {
  const [Token, setToken] = useState<string | null>(null);
  const [Role, setRole] = useState<string  | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('Token');
    const Role = localStorage.getItem('Role');
    if (token) {
      setToken(token);
      setRole(Role);
    }
  }, []);
async function UserProfile(id: any | null = null) {
  // Get token from localStorage
  const token = localStorage.getItem("Token");
  // Check if the token is available
  if (!token) {
    console.error("Authentication token is missing.");
    throw new Error("Authentication token is missing.");
  }

  // Construct the URL, with or without the freelancer_id query param
  const baseURL = "https://freelance-platform-api.vercel.app/api/v1/profile";
  const url = id ? `${baseURL}?freelancer_id=${id}` : baseURL;
console.log(url);

  try {
    // Fetch the profile data
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if the response is ok (status code between 200-299)
    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle and log the error
    console.error("Error fetching profile:", error);
    return undefined; // Return undefined in case of an error
  }
}

  async function PortofolioProjectDetails(id:number){
    try {
      const response = await fetch(
        `https://freelance-platform-api.vercel.app/api/v1/freelancer_projects/${id}`,
              {
          method: "GET",
        });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching offers:", error);
      return undefined;
    }
  }
  async function Reviews(){
        const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error("Authentication token is missing.");
    }
    try {
      const response = await fetch(
        `https://freelance-platform-api.vercel.app/api/v1/profile/reviews`,
              {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          
        });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching offers:", error);
      return undefined;
    }
  }
  async function Gallery(){
        const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error("Authentication token is missing.");
    }
    try {
      const response = await fetch(
        `https://freelance-platform-api.vercel.app/api/v1/profile/gallery`,
              {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          
        });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching offers:", error);
      return undefined;
    }
  }
  async function fetchOffers(id: string): Promise<any[] | undefined> {
        const token = localStorage.getItem("Token");
    if (!token) {
      throw new Error("Authentication token is missing.");
    }
    try {
      const response = await fetch(
        `https://freelance-platform-api.vercel.app/api/v1/offers?task_id=${id}`,
              {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          
        });
      const data = await response.json();
      // console.log(data.offers);
      return data.offers;
    } catch (error) {
      console.error("Error fetching offers:", error);
      return undefined;
    }
  }
  // Fetch project details by ID
  async function fetchDetails(id: string): Promise<any | undefined> {
    try {
      const response = await fetch(
        `https://freelance-platform-api.vercel.app/api/v1/tasks/${id}`
      );
      const data = await response.json();
      // console.log(data.task);
      return data.task;
    } catch (error) {
      console.error("Error fetching details:", error);
      return undefined;
    }
  }
  // Fetch tasks with filters
  const fetchTasks = useCallback(async (
    searchQuery: string,
    selectedCategory: string | null,
    selectedDeliveryTime: string | null,
    values: number[]
  ) => {
    try {
      // Build the query string dynamically based on selected filters
      const queryParams: string[] = [];
      if (searchQuery) queryParams.push(`title=${encodeURIComponent(searchQuery)}`);
      if (selectedCategory) queryParams.push(`category=${encodeURIComponent(selectedCategory)}`);
      if (selectedDeliveryTime) queryParams.push(`duration=${encodeURIComponent(selectedDeliveryTime)}`);
      if (values) {
        queryParams.push(`budget_min=${values[0]}`);
        queryParams.push(`budget_max=${values[1]}`);
      }

      const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
      const response = await fetch(
        `https://freelance-platform-api.vercel.app/api/v1/TASKS${queryString}`
      );

      // Check for HTTP error status
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data.tasks);
      return data.tasks;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Failed to fetch tasks. Please try again later.");
    }
  }, []);

  return (
    <UserContext.Provider value={{ Token, setToken, setRole , Role ,PortofolioProjectDetails , fetchDetails,fetchOffers, Reviews , Gallery,  UserProfile,fetchTasks }}>
      {children}
    </UserContext.Provider>
  );
}
