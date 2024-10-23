export const categories = [

  { id: 'All', label: 'All' },
  { id: 'UI_UX_Design', label: 'UI/UX Design' },
  { id: 'Frontend_Development', label: 'Frontend Development' },
  { id: 'Backend_Development', label: 'Backend Development' },
  { id: 'Mobile_Development', label: 'Mobile Development' },
  { id: 'Desktop_Development', label: 'Desktop Development' },
  { id: 'Game_Development', label: 'Game Development' },
  { id: 'FullStack_Development', label: 'FullStack Development' },
  { id: 'Marketing', label: 'Marketing' },
  { id: 'Video_Editing', label: 'Video Editing' },
];

export const deliveryTimes = [
    { id: 'All', labelEn: 'All' },
  { id: "1", labelEn: "Less than 1 week" },
  { id: "2", labelEn: "1 to 2 weeks" },
  { id: "3", labelEn: "2 weeks to 1 month" },
];
export interface FormValues {
  implementationDuration: string;
  askingPrice: string;
  description: string;
  taskId: number;
}
export interface Freelancer {
  id: string;
  first_name: string;
  last_name: string;
  image_profile?: string; // Image can be optional
}

export interface OfferType {
  id: string;
  freelancer: Freelancer;
  description: string;
}
export const gridItems = [
  {
    title: "Post a job and hire a pro",
    description: "Talent Marketplace",
    svgPath: "M7 0.5L5.775 1.725L10.675 6.625H0L0 8.375H10.675L5.775 13.275L7 14.5L14 7.5L7 0.5Z",
  },
  {
    title: "Browse and buy a project",
    description: "Project Catalog",
    svgPath: "M7 0.5L5.775 1.725L10.675 6.625H0L0 8.375H10.675L5.775 13.275L7 14.5L14 7.5L7 0.5Z",
  },
  {
    title: "Get advice from an expert",
    description: "Consultation",
    svgPath: "M7 0.5L5.775 1.725L10.675 6.625H0L0 8.375H10.675L5.775 13.275L7 14.5L14 7.5L7 0.5Z",
  },
];