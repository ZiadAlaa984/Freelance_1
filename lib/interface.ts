export interface Freelancer {
  id: number;
  first_name: string;
  last_name: string;
  image_profile: string | null;
  average_rating: string;
  description: string;
}
export interface OfferProps {
  key:number
  Offer: {
    freelancer: Freelancer;
    description: string;
  };
}