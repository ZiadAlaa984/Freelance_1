import { gridItems } from "@/lib/data";
export default function ForClients() {
  return (
    <section>
            <div
        className="flex flex-col p-6 min-h-[613px] justify-between text-white rounded-xl drop-shadow-lg overflow-hidden"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/upwork-cloud-acquisition-prod/image/upload/c_scale/brontes/delivery-models/find-talent-2x.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col gap-2 md:gap-6">
          <h2 className="text-xl font-medium  mb-4">For Clients</h2>
          <p className="md:text-7xl text-2xl leading-7 capitalize font-medium mb-4">Find talent</p>
          <p className="md:text-7xl text-2xl leading-7 capitalize font-medium mb-4">your way</p>
          <p className=" capitalize  text-lg font-medium mb-6 max-w-[600px]">
            Work with the largest network of independent professionals and get
            things done from quick turnarounds to big transformations.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 xl:gap-24">
          {gridItems.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer col-span-3 xl:col-span-1  hover:bg-white hover:text-[#108A00] transition-all duration-300 flex flex-col min-h-[140px] p-4 bg-[#108A00] drop-shadow-lg rounded-lg"
            >
              <h4 className="md:text-4xl text-2xl w-full md:max-w-[250px] mb-2">{item.title}</h4>
              <div className="flex items-center">
                <span className="text-md">
                  {item.description}<sup>TM</sup>
                </span>
                <svg
                  width={15}
                  height={15}
                  viewBox="0 0 15 15"
                  fill="#ffffff"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2"
                >
                  <path d={item.svgPath} />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
</section>
  );
}
