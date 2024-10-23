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
export default function UpdateData() {
  const [skills, setSkills] = useState<string[]>([]); // Explicitly set type for skills
  const { UserProfile }: any = useContext(UserContext);
  const { UpdateInfo }: any = useContext(FreelancerContext);

  const [bio, setBio] = useState<string>(""); // Set initial state as empty string
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false); // State to manage updating status

  async function fetchData() {
    try {
      let profile = await UserProfile();
      setBio(profile.profileData.bio || ""); // Set bio if exists
      setSkills(profile?.profileData?.skills || []); // Set skills if exists
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      alert("Failed to fetch profile data. Please try again later.");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSkillSelect = (skill: string) => {
    // Ensure skill is not empty and does not already exist in the array
    if (skill && !skills.includes(skill)) {
      setSkills((prevSkills) => [...prevSkills, skill]);
    } else {
      alert("Skill already added or invalid.");
    }
  };

  const deleteSkills = (skill: string) => {
    // Update skills array, removing the selected skill
    setSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(e.target.value); // Update the bio state as the user types
  };

  const updateData = async () => {
    setUpdating(true); // Set loading state for update
    let update = {
      bio: bio,
      skills: skills,
    };
    try {
      let result = await UpdateInfo(update);
      console.log(result);
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUpdating(false); // Reset updating state
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state for fetching data
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
            value={bio} // Controlled value for textarea
            onChange={handleBioChange} // Handle changes to textarea
            placeholder="Type your bio here." // Placeholder for clarity
          />

          <h4 className="text-xl text-primary font-semibold">Skills</h4>
          {/* Passing handleSkillSelect to SelectScrollable */}
          <SelectScrollable onSkillSelect={handleSkillSelect} />

          <div className="flex flex-wrap gap-2 items-center border rounded-xl p-2 flex-1">
            {/* Display selected skills as tags */}
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
