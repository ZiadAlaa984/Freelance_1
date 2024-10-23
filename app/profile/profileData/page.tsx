"use client";
import Loader from "@/components/Const/loader";
import { UserContext } from "@/Context/UserContext";
import React, { useContext, useEffect, useState } from "react";

// Define interfaces for profile and review data
interface Profile {
  bio: string;
  first_name: string;
  last_name: string;
  average_rating: number;
  skills: string[];
}

interface Review {
  comment: string;
}

export default function ProfileData() {
  const { Reviews, UserProfile }: { Reviews: () => Promise<Review[]>, UserProfile: () => Promise<{ profileData: Profile }> } = useContext(UserContext);

  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [reviewData, setReviewData] = useState<Review[] | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const Profile = await UserProfile();
      const Review = await Reviews();
      setProfileData(Profile.profileData);
      setReviewData(Review);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please try again later.");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="grid grid-cols-4 gap-6">
      <div className="xl:col-span-3 col-span-4 flex flex-col">
        <div className="bg-white h-full flex flex-col border rounded-lg">
          <h4 className="text-xl border-b border-gray-300 p-4 text-primary font-semibold">Bio</h4>
          <p className="md:text-lg text-md p-4">
            {profileData ? profileData.bio : "No bio available."}
          </p>
        </div>
      </div>
      <div className="xl:col-span-1 bg-white rounded-lg border border-gray-200 col-span-4 flex flex-col gap-6">
        <div className="flex flex-col p-4 gap-6">
          <div className="flex justify-between items-center">
            <span className="font-bold">First Name:</span>
            <span>{profileData ? profileData.first_name : "N/A"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Last Name:</span>
            <span>{profileData ? profileData.last_name : "N/A"}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Average Rating:</span>
            <span>{profileData ? profileData.average_rating : "N/A"}</span>
          </div>
        </div>
      </div>
      <div className="xl:col-span-3 col-span-4 flex flex-col gap-6">
        <div className="bg-white flex flex-col border rounded-lg">
          <h4 className="text-xl border-b border-gray-300 text-primary font-semibold p-4">Skills</h4>
          <div className="flex flex-wrap gap-2 items-center p-4 flex-1">
            {profileData?.skills?.map((skill: string, index: number) => (
              <p
                key={index}
                className="border px-2 py-1 md:text-sm text-xs text-black/75 bg-gray-200 rounded-full"
              >
                {skill}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="xl:col-span-3 col-span-4 flex flex-col gap-6">
        <div className="bg-white flex flex-col border rounded-lg">
          <h4 className="text-xl border-b border-gray-300 text-primary font-semibold p-4">Reviews</h4>
          <div className="flex flex-wrap gap-2 items-center p-4 flex-1">
            {reviewData && reviewData.length > 0 ? (
              reviewData.map((review: Review, index: number) => (
                <p
                  key={index}
                  className="border px-2 py-1 md:text-sm text-xs text-black/75 bg-gray-200 rounded-full"
                >
                  {review.comment}
                </p>
              ))
            ) : (
              <p className="text-xl text-center w-full capitalize">No reviews available.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
