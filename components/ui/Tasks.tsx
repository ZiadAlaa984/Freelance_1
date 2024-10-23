// Tasks.tsx
import React from "react";
import { FaPlus } from "react-icons/fa";
import Link from "next/link"; // Ensure you have this import
import { Button } from "./button";

interface TaskProps {
  task: {
    id: number;
    title: string;
    description: string;
    created_at: string;
    is_opened: boolean;
    no_of_offers: number;
    keywords: string[];
    client: {
      first_name: string;
      last_name: string;
    };
  };
}

const Tasks: React.FC<TaskProps> = ({ task }) => {
  return (
    <div className="h-fit w-full col-span-1 gap-2 flex flex-col bg-white border rounded-lg cursor-pointer drop-shadow-md hover:shadow-md transition-all duration-300 border-gray-300 p-4">
      <span className="md:text-sm text-xs text-gray-600">
        Posted {new Date(task.created_at).toLocaleTimeString()}
      </span>
      <div className="flex justify-between gap-2 md:gap-0 items-center">
        <h3 className="md:text-xl capitalize text-nowrap text-md text-[#3c8224] font-medium">
          {task.title.split(",").slice(0,3).join()}
        </h3>
        <Link href={`/projectDetails/${task.id}`}>
            <Button
              type="submit"
              className={`md:px-6 px-[6px] text-xs md:text-base flex gap-1 capitalize py-[1px] md:py-2 ${task.is_opened == false && 'bg-red-600' }`}
            >
             {task.is_opened ?' Add offers' : 'close' }  <FaPlus className="text-xs" />
            </Button>

        </Link>
      </div>
      <p className="text-xs text-gray-500">
        Name : {task.client.first_name} {task.client.last_name} 
      </p>
      <p className="md:text-lg text-md">
        {task.description}
      </p>
      <div className="flex flex-wrap gap-2 items-center">
        {task.keywords.map((tag, idx) => (
          <p
            key={idx}
            className="border px-2 py-1 md:text-sm text-xs text-black/75 bg-gray-200 rounded-full"
          >
            {tag}
          </p>
        ))}
      </div>
      <p className="text-secondary text-sm ">
        Proposals: {task.no_of_offers}
      </p>
    </div>
  );
};

export default Tasks;
