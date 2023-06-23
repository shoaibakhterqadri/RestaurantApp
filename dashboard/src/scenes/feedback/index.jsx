import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import { FlexBetween } from "../../style/CommonClasses";
import { AiOutlineClose } from "react-icons/ai";
import { deleteApiMethod, getApiMethod } from "../../state/Api";
import { ToastContainer, toast } from "react-toastify";

const Feedback = () => {
  const [isLoad, setisLoad] = useState(false)
  const [allFeedback, setAllFeedback] = useState([])
  const init = async () => {
    const { status, data } = await getApiMethod('feedback/getFeedbacks')
    if (status == 200) {
      setAllFeedback(data)
    }

  }

  useEffect(() => {
    init()
  }, [isLoad])
  const handleDelete = async (_id) => {
    try {
      const deleteDish = await deleteApiMethod("feedback/deleteFeedback", {
        _id,
      });
      if (deleteDish?.status == 200) {
        setisLoad(!isLoad);
        toast.success(`${deleteDish?.data.message}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme="light"
      />
      <div className={`${FlexBetween}`}>
        <Heading>FEEDBACK</Heading>
      </div>
      <div className="container mx-auto w-[100%]">
        <div className="flex flex-wrap -m-4 justify-center items-center my-3">

          {
            allFeedback?.map((item, index) => {
              return <div className="p-2 lg:w-1/3">
                <div className="bg-[#f1f1f1] rounded-[30px] border-[4px] border-[#f1f1f1] py-[24px] px-[24px] cursor-grab shadow-xl">
                  <div className="flex justify-between items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="block w-5 h-5 text-[#000] mb-4"
                      viewBox="0 0 975.036 975.036"
                    >
                      <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z" />
                    </svg>
                    <AiOutlineClose
                      size={"1.5rem"}
                      color="red"
                      onClick={() => {
                        handleDelete(item?._id);
                      }}
                    />
                  </div>
                  <p className="max-w-[300px] mb-3">
                    {item?.message}
                  </p>
                  <div className="inline-flex items-center">
                    <img
                      alt="testimonial"
                      src="https://dummyimage.com/106x106"
                      className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                    />
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="title-font font-medium text-indigo-600">
                        {item?.name}
                      </span>
                      <span className="text-indigo-600 text-sm">{item?.email}</span>
                    </span>
                  </div>
                </div>

              </div>
            })
          }
        </div>
      </div>
    </div>
  );
};

export default Feedback;
