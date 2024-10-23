"use client";
import { Button } from "@/components/ui/button";
import { SelectScrollable } from "@/components/ui/SelectScrollable";
import { Textarea } from "@/components/ui/textarea";
import { FreelancerContext } from "@/Context/FreelancerContext";
import { UserContext } from "@/Context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define UserProfile and Context types
interface UserProfile {
  profileData: {
    bio: string;
    skills: string[];
  };
}

interface UserContextType {
  UserProfile: () => Promise<UserProfile>;
}

interface FreelancerContextType {
  UpdateInfo: (update: { bio: string; skills: string[] }) => Promise<{ message: string }>;
}

export default function UpdateData() {
  const [skills, setSkills] = useState<string[]>([]);
  const { UserProfile }: UserContextType = useContext(UserContext);
  const { UpdateInfo }: FreelancerContextType = useContext(FreelancerContext);

  const [bio, setBio] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  async function fetchData() {
    try {
      const profile = await UserProfile();
      setBio(profile.profileData.bio || "");
      setSkills(profile?.profileData?.skills || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      alert("Failed to fetch profile data. Please try again later.");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSkillSelect = (skill: string) => {
    if (skill && !skills.includes(skill)) {
      setSkills((prevSkills) => [...prevSkills, skill]);
    } else {
      alert("Skill already added or invalid.");
    }
  };

  const deleteSkills = (skill: string) => {
    setSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value);
  };

  const updateData = async () => {
    setUpdating(true);
    const update = {
      bio,
      skills,
    };
    try {
      const result = await UpdateInfo(update);
      console.log(result);
      toast.success(result.message);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ToastContainer />
      <section>
        <div className="bg-white h-full flex flex-col p-4 gap-4 border rounded-xl">
          <h4 className="text-xl text-primary font-semibold">Bio</h4>
          <Textarea
            rows={8}
            id="description"
            value={bio}
            onChange={handleBioChange}
            placeholder="Type your bio here."
          />

          <h4 className="text-xl text-primary font-semibold">Skills</h4>
          <SelectScrollable onSkillSelect={handleSkillSelect} />

          <div className="flex flex-wrap gap-2 items-center border rounded-xl p-2 flex-1">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="border gap-2 flex items-center justify-between px-3 py-1 text-black/75 bg-gray-100 rounded-md"
              >
                <span className="capitalize">{skill}</span>
                <span
                  onClick={() => deleteSkills(skill)}
                  className="rounded-full cursor-pointer text-black"
                >
                  <IoIosCloseCircle />
                </span>
              </div>
            ))}
          </div>

          <div>
            <Button
              className="bg-cyan-500 hover:bg-cyan-300"
              onClick={updateData}
              disabled={updating}
            >
              {updating ? "Updating..." : "Confirm Update"}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
