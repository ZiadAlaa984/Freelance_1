'use client'
import { useContext, useState } from "react";
import { Button } from "../../components/ui/button";
import { FreelancerContext } from "@/Context/FreelancerContext";
import Link from "next/link";
export default function Offer({ Offer, setUpdate, setState }: any) {
  let { DeleteOffer, setObjectUpdateOffers }: any =
    useContext(FreelancerContext);

  const placeholderImage =
    "https://t4.ftcdn.net/jpg/02/17/34/67/240_F_217346782_7XpCTt8bLNJqvVAaDZJwvZjm0epQmj6j.jpg"; // Placeholder image URL

  const freelancer = Offer?.freelancer || {}; // Safe check for freelancer
  const { description, id, asking_price, implementation_duration }: any = Offer;

const [Loading, setLoading] = useState(false)
  const profileImage = freelancer?.image_profile || placeholderImage;
  const freelancerName = `${freelancer?.first_name || "Unknown"} ${
    freelancer?.last_name || ""
  }`;

  async function DeleteOfferProject(id: number) {
      setLoading(true)
  try {
    let result = await DeleteOffer(id);
    setState(true);
    console.log(result);
    setLoading(false)
  } catch (error: any) {
    console.error(error); // Log the actual error
  }
}
function UpdateOfferProject(id: number) {
  if (setObjectUpdateOffers) {
    setObjectUpdateOffers({
      askingPrice: asking_price,
      implementation_duration: implementation_duration,
      description: description,
      id: id,
    });
    setUpdate(true);
  }
}


  return (
    <>
      <div className="flex p-3 gap-3 flex-col border-b border-gray-300">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <img
              alt={`Profile of ${freelancerName}`}
              loading="lazy"
              width={100}
              height={100}
              src={profileImage}
              className="inline-block w-10 h-10 object-cover rounded-full ring-2 ring-slate-100"
            />
            <div className="flex flex-col">
              <Link href={`/freelanceProfile/${freelancer.id}`}>
              <p className="text-md font-light">{freelancerName}</p>
              </Link>
              
              <p>Freelancer</p>
            </div>
          </div>
          {id && (
            <div className="flex items-center gap-6">
              <Button
                aria-label="Update Offer"
                onClick={() => UpdateOfferProject(id)}
                className="bg-cyan-500 hover:bg-cyan-300"
              >
                Update
              </Button>
              <Button
                onClick={() => DeleteOfferProject(id)}
                className="bg-red-600 hover:bg-red-500"
              >
                {Loading ? "Loading" : "Delete"}
                
              </Button>
            </div>
          )}
        </div>
        <p>{description}</p>
      </div>
    </>
  );
}
