import React, { useState } from "react";
import Chef from '../../assets/image/feedback.png'
import { useFormik } from "formik";
import { feedbackInitialValues, feedbackValidationSchema } from "../../schema";
import { postApiMethod } from "../../Api";
import { HashLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";

const Feedback = () => {
  const [load, setLoad] = useState(false)
  const formik = useFormik({
    initialValues: feedbackInitialValues,
    validationSchema: feedbackValidationSchema,
    onSubmit: async (values) => {
      setLoad(true)
      const { name, email, message } = values
      const postObj = { name, email, message }
      const postFeedback = await postApiMethod('feedback/addFeedback', postObj)
      if (postFeedback?.status == 200) {
        toast.success(`${postFeedback?.data?.message}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoad(false)
        formik.resetForm()
      }
      setLoad(false)

    }
  })
  return (
    <section className="text-white body-font" id="feedback">
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
      <div className="container px-5 py-8 mx-auto flex flex-wrap w-[92%]">
        <div className="lg:w-1/2 w-full lg:mb-0 rounded-lg overflow-hidden mt-[-50px] items-center">
          <img
            alt="feature"
            className="w-full h-full object-cover"
            src={Chef}
          />
        </div>
        <div className="lg:w-1/2 w-full lg:mb-0 rounded-lg overflow-hidden">
          <div className="flex-grow">
            <div className="mt-6">
              <form className="bg-white p-5 rounded-xl" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col mb-4">
                  <label htmlFor="name" className="text-black">
                    Name
                  </label>
                  <input
                    className="border bg-gray-100 text-black px-2 py-1"
                    type="name"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.name &&
                    formik.touched.name ? (
                    <span className="col-12 ps-0 pe-4 text-start mt-3 text-red-600">
                      {formik.errors.name}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="email" className="text-black">
                    Email
                  </label>
                  <input
                    className="border bg-gray-100 px-2 py-1 text-black"
                    type="email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email &&
                    formik.touched.email ? (
                    <span className="col-12 ps-0 pe-4 text-start mt-3 text-red-600">
                      {formik.errors.email}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-col mb-4">
                  <label htmlFor="message" className="text-black">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border bg-white rounded h-32 text-base outline-none text-black py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                  {formik.errors.message &&
                    formik.touched.message ? (
                    <span className="col-12 ps-0 pe-4 text-start mt-3 text-red-600">
                      {formik.errors.message}
                    </span>
                  ) : null}
                </div>
                <button
                  className="w-full py-2 bg-[#161c4A] hover:bg-[#161c4A] relative text-white rounded-full"
                  type="button"
                  disabled={load}
                  onClick={formik.submitForm}
                >
                  {load ? <HashLoader color="#fff" size={20} /> : "Send Feedback"}
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>

    </section>
  );
};
export default Feedback;