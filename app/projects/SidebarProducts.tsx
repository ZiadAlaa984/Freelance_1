'use client'
import { categories, deliveryTimes } from '@/lib/data';
import { FaSearch } from 'react-icons/fa';
import { Range, getTrackBackground } from 'react-range';

export default function SidebarProducts({setSearchQuery ,values ,selectedCategory ,searchQuery , selectedDeliveryTime ,setSelectedCategory , setSelectedDeliveryTime , setValues}:any) {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const handleRadioChange = (categoryId: string) => {
    if (categoryId === 'All') {
      setSelectedCategory(null); // No category filter
    } else {
      setSelectedCategory(categoryId); // Set the selected category
    }
  };
  const handleDeliveryTimeChange = (timeId: string) => {
    let deliveryTimeRange: string | null = null;

    // Map timeId to a specific duration range
    if (timeId === '1') {
      deliveryTimeRange = '1-7';
    } else if (timeId === '2') {
      deliveryTimeRange = '7-14';
    } else if (timeId === '3') {
      deliveryTimeRange = '14-28';
    }

    setSelectedDeliveryTime(deliveryTimeRange); // Save the selected range
  };
  const handleRangeChange = (values: number[]) => {
    setValues(values);
  };

  return (
    <div className="col-span-1 hidden lg:flex flex-col gap-3">
      {/* Search Section */}
      <h3 className="text-xl">Search</h3>
      <div className="relative">
        <input
          className="border rounded-lg w-full placeholder:text-sm focus:outline-0 px-3 py-1 pl-10"
          type="search"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      </div>

      {/* Category Filter */}
      <h3 className="text-xl">Category</h3>
      <div className="flex flex-col gap-3">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center space-x-2">
            <input
              type="radio"
              id={category.id}
              name="category"
              checked={selectedCategory === category.id}
              onChange={() => handleRadioChange(category.id)}
              className="cursor-pointer"
            />
            <label
              htmlFor={category.id}
              className={`text-md font-medium leading-none ${
                selectedCategory === category.id
                  ? 'text-[#3c8224]'
                  : 'text-gray-700'
              }`}
            >
              {category.label}
            </label>
          </div>
        ))}
      </div>

      {/* Delivery Time Filter */}
      <h3 className="text-xl">Delivery time</h3>
      <div className="flex flex-col gap-3">
        {deliveryTimes.map((time) => (
          <div key={time.id} className="flex items-center space-x-2">
            <input
              type="radio"
              id={time.id}
              name="deliveryTime"
              checked={
                (time.id === '1' && selectedDeliveryTime === '1-7') ||
                (time.id === '2' && selectedDeliveryTime === '7-14') ||
                (time.id === '3' && selectedDeliveryTime === '14-28')
              }
              onChange={() => handleDeliveryTimeChange(time.id)}
              className="cursor-pointer"
            />
            <label
              htmlFor={time.id}
              className={`text-md font-medium leading-none ${
                (time.id === '1' && selectedDeliveryTime === '1-7') ||
                (time.id === '2' && selectedDeliveryTime === '7-14') ||
                (time.id === '3' && selectedDeliveryTime === '14-28')
                  ? 'text-[#3c8224]'
                  : 'text-gray-700'
              }`}
            >
              {time.labelEn}
            </label>
          </div>
        ))}
      </div>

      {/* Budget Range Slider */}
      <h3 className="text-xl">Budget</h3>
      <h4 className="text-md">Salary range: ${values[0]} - ${values[1]}</h4>
      <div className="relative mb-6">
        <Range
          step={1}
          min={25}
          max={1000}
          values={values}
          onChange={handleRangeChange}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="w-full h-2 bg-gray-200 rounded-lg"
              style={{
                background: getTrackBackground({
                  values,
                  colors: ['#d0d0d0', '#3c8224', '#d0d0d0'],
                  min: 25,
                  max: 1000,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div {...props} className="w-4 h-4 bg-[#3c8224] rounded-full" />
          )}
        />
        <span className="text-xs text-gray-500 absolute start-0 -bottom-6">
          Min ($25)
        </span>
        <span className="text-xs text-gray-500 absolute end-0 -bottom-6">
          Max ($1000)
        </span>
      </div>
    </div>
  );
}
