"use client";
import { UserContext } from "@/Context/UserContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface ProfileData {
  first_name: string;
  last_name: string;
  bio?: string;
  image_url?: string;
  average_rating?: number;
  skills?: string[];
}

interface Review {
  comment: string;
}

export default function FreelanceProfile() {
  const placeholderImage =
    "https://t4.ftcdn.net/jpg/02/17/34/67/240_F_217346782_7XpCTt8bLNJqvVAaDZJwvZjm0epQmj6j.jpg";
  
  let { UserProfile, Reviews }: { UserProfile: (id: number) => Promise<{ profileData: ProfileData }>, Reviews: () => Promise<Review[]> } = useContext(UserContext);
  const { id }:any = useParams();
  
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [reviewData, setReviewData] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile data
  async function fetchData(id: number) {
    try {
      const Profile = await UserProfile(id);
      const Review = await Reviews();
      setReviewData(Review);
      setProfileData(Profile?.profileData || null);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to fetch profile data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return (
    <div className="pt-20 md:pt-24">
      <div className="bg-white border flex flex-col gap-3 rounded-xl p-3 border-gray-200">
        <div className="flex justify-center items-center flex-col gap-3">
          <Image
            src={profileData?.image_url || placeholderImage}
            alt="profile"
            width={80}
            height={80}
            className="rounded-full border border-gray-200"
          />
          <div className="text-center">
            <h5 className="text-xl font-semibold">
              {loading ? "Loading..." : profileData?.first_name || "No Name"}
            </h5>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>

      <section className="grid grid-cols-4 gap-6 ">
        <div className="xl:col-span-3 col-span-4 flex flex-col">
          <div className="bg-white h-full flex flex-col border rounded-lg">
            <h4 className="text-xl border-b border-gray-300 p-4 text-primary font-semibold">Bio</h4>
            <p className="md:text-lg text-md p-4">
              {profileData?.bio ? profileData.bio : "No bio available."}
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
    </div>
  );
}
