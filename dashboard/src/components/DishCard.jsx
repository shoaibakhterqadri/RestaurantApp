import React, { useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";

const DishCard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="w-full rounded-lg flex flex-col justify-between shadow-md">
          <div className="flex justify-end px-5 pt-3">
            <HiOutlineDotsVertical fontSize={24} onClick={toggleDropdown} />
          </div>
          <div className="relative">
            {isOpen && (
              <div
                className="absolute right-4 z-10 py-2 w-44 bg-white rounded-lg shadow divide-y divide-gray-100 dark:bg-gray-700"
                id="dropdown"
              >
                <ul className="py-1" aria-labelledby="dropdownButton">
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                      Delete
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div class="col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-1 xl:col-span-1 flex flex-col items-center">
            <div class="bg-white rounded-lg mt-5">
              <img
                src="https://source.unsplash.com/MNtag_eXMKw/1600x900"
                class="h-40 rounded-md"
                alt=""
              />
            </div>
            <div class="bg-white shadow-lg rounded-lg -mt-4 w-full">
              <div class="py-5 px-5">
                <span class="font-bold text-gray-800 text-lg">Geek Pizza</span>
                <div class="flex items-center justify-between">
                  <div class="text-sm text-gray-600 font-light">Fast Food</div>
                  <div class="text-xl text-red-600 font-bold">$ 8.00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishCard;
