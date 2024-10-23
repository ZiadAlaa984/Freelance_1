import React from 'react'

export default function SidebarProjectDetails({project}:any) {
  return (
                <div>
                  <div className="flex flex-col p-4 gap-6">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Project Status:</span>
                      <span className="text-white text-xs w-fit px-2 py-1 rounded-md bg-[#3c8224]">
                        {project?.is_opened ? "Open" : "Closed"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Date Posted:</span>
                      <span>
                        {new Date(project?.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Budget:</span>
                      <span>
                        ${project?.min_price} - ${project?.max_price}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Implementation Time:</span>
                      <span>{project?.deadline_duration} Days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Average Bid:</span>
                      <span>${project?.average_bid || "0.00"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Proposals :</span>
                      <span>{project?.no_of_offers}</span>
                    </div>
                  </div>
                  <div className="border-t flex flex-col p-4 gap-6 border-gray-300">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Project Owner:</span>
                      <span>
                        {project?.client.first_name} {project?.client.last_name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Platform:</span>
                      <span>{project?.platform || "Not Specified"}</span>
                    </div>
                  </div>
                </div>
  )
}
