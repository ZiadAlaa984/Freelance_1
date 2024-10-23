"use client"
import { UserContext } from "@/Context/UserContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Loader from "@/components/Const/loader";
import Image from "next/image";

// Define types for profile data and user profile
interface ProfileData {
  first_name: string;
  image_url: string;
}

interface UserProfileType {
  profileData: ProfileData;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const placeholderImage =
    "https://t4.ftcdn.net/jpg/02/17/34/67/240_F_217346782_7XpCTt8bLNJqvVAaDZJwvZjm0epQmj6j.jpg";

  const { UserProfile }: { UserProfile: () => Promise<UserProfileType> } = useContext(UserContext); // Use UserProfileType for UserProfile

  const pathname = usePathname(); // Get the current path

  const [profileData, setProfileData] = useState<ProfileData | null>(null); // Set type for profileData
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const profile = await UserProfile();
      setProfileData(profile.profileData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to fetch tasks. Please try again later.");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Helper function to check if a path is active
  const isActive = (path: string) => pathname === path;

  if (loading) return <Loader />;

  return (
    <>
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
                {profileData?.first_name || "Loading..."}
              </h5>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <ul className="flex items-center gap-6">
              <li className="capitalize font-semibold">
                <Link
                  className={isActive("/profile/updateData") ? "active" : ""}
                  href="/profile/updateData"
                >
                  {loading ? "Loading..." : "Update Portfolio"}
                </Link>
              </li>
              <li className="capitalize font-semibold">
                <Link
                  className={isActive("/profile/addProject") ? "active" : ""}
                  href="/profile/addProject"
                >
                  {loading ? "Loading..." : "Add Project"}
                </Link>
              </li>
            </ul>
            <ul className="flex items-center gap-6">
              <li className="capitalize font-semibold">
                <Link
                  className={isActive("/profile/profileData") ? "active" : ""}
                  href="/profile/profileData"
                >
                  Profile
                </Link>
              </li>
              <li className="capitalize font-semibold">
                <Link
                  className={isActive("/profile/portfolioData") ? "active" : ""}
                  href="/profile/portfolioData"
                >
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {children}
      </div>
      <main></main>
    </>
  );
}
