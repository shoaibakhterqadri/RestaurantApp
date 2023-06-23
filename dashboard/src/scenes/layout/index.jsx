import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import { RxCross2 } from "react-icons/rx";

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={`flex`} width={"100%"} height={"100%"}>
      <Sidebar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className="grow">
        <Navbar />
        <div className="px-5 pt-5 pb-2">
          <Outlet />
        </div>
      </div>
      {/* MODAL CODE START */}
      <div
        className={`fixed z-10 inset-0 overflow-y-auto ${
          isModalOpen ? "" : "hidden"
        }`}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 text-center sm:block sm:p-0 transition duration-700">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-5 sm:align-middle max-w-lg w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="p-5 rounded">
              <div className="flex justify-end">
                <RxCross2
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                  fontSize={24}
                  className="text-indigo-600"
                />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <p className="text-black text-center mt-3 text-lg font-semibold">
                    Are you sure you want to logout your account.
                  </p>
                </div>
              <div className="bg-gray-50 pt-3 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 sm:w-auto"
                  onClick={() => setIsModalOpen(false)}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* MODAL CODE END */}
    </div>
  );
};

export default Layout;
