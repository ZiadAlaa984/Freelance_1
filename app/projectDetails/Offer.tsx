'use client';
import { useContext, useState } from "react";
import { Button } from "../../components/ui/button";
import { FreelancerContext } from "@/Context/FreelancerContext";
import Link from "next/link";
import Image from "next/image";



interface OfferProps {
  Offer: {
    id: number;
    description: string;
    asking_price: number;
    implementation_duration: number;
    freelancer?: any;
  };
  setUpdate: (value: boolean) => void;
  setState: (value: boolean) => void;
}

export default function Offer({ Offer, setUpdate, setState }: OfferProps) {
  const { DeleteOffer, setObjectUpdateOffers } = useContext(FreelancerContext);

  const placeholderImage =
    "https://t4.ftcdn.net/jpg/02/17/34/67/240_F_217346782_7XpCTt8bLNJqvVAaDZJwvZjm0epQmj6j.jpg"; // Placeholder image URL

  const freelancer = Offer?.freelancer || {}; // Safe check for freelancer
  const { description, id, asking_price, implementation_duration } = Offer;

  const [loading, setLoading] = useState<boolean>(false); // Specify loading state type
  const profileImage = freelancer?.image_profile || placeholderImage;
  const freelancerName = `${freelancer?.first_name || "Unknown"} ${freelancer?.last_name || ""}`;

  // Function to delete offer
  const DeleteOfferProject = async (id: number) => {
    setLoading(true);
    try {
      const result = await DeleteOffer(id);
      setState(true);
      console.log(result);
    } catch (error) {
      console.error(error); // Log the actual error
    } finally {
      setLoading(false); // Ensure loading is set back to false
    }
  };

  // Function to update offer
  const UpdateOfferProject = (id: number) => {
    if (setObjectUpdateOffers) {
      setObjectUpdateOffers({
        askingPrice: asking_price,
        implementation_duration: implementation_duration,
        description: description,
        id: id,
      });
      setUpdate(true);
    }
  };

  return (
    <div className="flex p-3 gap-3 flex-col border-b border-gray-300">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Image
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
              {loading ? "Loading" : "Delete"}
            </Button>
          </div>
        )}
      </div>
      <p>{description}</p>
    </div>
  );
}
