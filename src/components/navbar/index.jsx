import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import {
  SignupInitialValues,
  SignupValidationSchema,
  SigninInitialValues,
  SigninValidationSchema,
  ForgetInitialValues,
  ForgetValidationSchema,
  UpdateInitialValues,
  UpdateValidationSchema
} from "../../schema";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { logout, saveEmail, saveToken } from "../../redux/slices/User";
import { postApiMethod, updateApiMethod } from "../../Api";
import UserImage from '../../assets/image/user.png'

const Navbar = ({ setOpen }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state?.user?.token);
  const userEmail = useSelector((state) => state?.user?.email);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(false)
  const [modalData, setModalData] = useState("Login");
  const formik = useFormik({
    initialValues: SignupInitialValues, validationSchema: SignupValidationSchema, onSubmit: async (values) => {
      setIsLoad(true)
      const { name, email, password } = values
      const postObj = {
        name,
        email,
        password,
        role: 'user'
      }
      const postSignupData = await postApiMethod('/user/signup', postObj)
      if (postSignupData?.status == 200) {
        const token = postSignupData?.data?.token;
        dispatch(saveToken(token))
        formik.resetForm();
        setIsModalOpen(false);
      }
      setIsLoad(true)


    }
  })
  const SigninFormik = useFormik({
    initialValues: SigninInitialValues,
    validationSchema: SigninValidationSchema,
    onSubmit: async (values) => {
      const { email, password } = values
      const postObj = { email, password }
      const { data, status } = await postApiMethod('/user/login', postObj)
      if (status == 200) {
        dispatch(saveToken(data?.token))
        formik.resetForm()
        setIsModalOpen(false);
        setIsLoad(true)
      }
      setIsLoad(true)

    }
  })
  const ForgetFormik = useFormik({
    initialValues: ForgetInitialValues, validationSchema: ForgetValidationSchema, onSubmit: async (values) => {
      const { email } = values
      const postObj = { email }
      const { data, status } = await postApiMethod('/user/checkEmail', postObj)
      if (status == 200) {
        dispatch(saveEmail(email))
        setModalData('Update')
        formik.resetForm()
      }
      setIsLoad(true)
    }
  })
  const UpdateFormik = useFormik({
    initialValues: UpdateInitialValues, validationSchema: UpdateValidationSchema, onSubmit: async (values) => {
      const { password, confirmPassword } = values
      // updateApiMethod
      const updateObj = { password, confirmPassword, email: userEmail }
      const { data, status } = await updateApiMethod('/user/updatePass', updateObj)
      if (status == 200) {
        console.log("🚀data:", data)
        dispatch(saveEmail(''))
        UpdateFormik.resetForm()
        setIsModalOpen(!isModalOpen)

      }
      setIsLoad(true)
    }
  })
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    setIsOpen(!isOpen);
    dispatch(logout())

  }
  return (
    <header className="bg-[#000021] shadow-xl">
      <nav className="flex justify-between items-center w-[92%] mx-auto py-2">
        <div className="text-white font-[Poppins]">TAKEAWAY</div>
        <div
          className={`nav-links duration-1000 md:static absolute bg-[#000021] md:min-h-fit min-h-[60vh] left-0 ${menuOpen ? "top-[9%]" : "top-[-100%]"
            } md:w-auto w-full flex items-center px-5`}
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
            <li>
              <div
                className="hover:text-[#f1f1f1] text-white cursor-pointer"
                href="#home"
              >
                HOME
              </div>
            </li>
            <li>
              <div
                className="hover:text-[#f1f1f1] text-white cursor-pointer"
                href="#about"
              >
                ABOUT
              </div>
            </li>
            <li>
              <div
                className="hover:text-[#f1f1f1] text-white cursor-pointer"
                href="#dishes"
              >
                DISHES
              </div>
            </li>
            <li>
              <div
                className="hover:text-[#f1f1f1] text-white cursor-pointer"
                href="#testimonals"
              >
                TESTIMONALS
              </div>
            </li>
            <li>
              <div
                className="hover:text-[#f1f1f1] text-white cursor-pointer"
                href="#feedback"
              >
                FEEDBACK
              </div>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-6">
          {
            user !== "" ? <>
              <div className="relative inline-block text-left">
                <div>
                  <img src={UserImage} alt="Avatar" className="h-12 w-15 rounded-full cursor-pointer" onClick={toggleDialog} />
                </div>
                {!isOpen && (
                  <div className="absolute top-0 right-12 mt-10 bg-white p-2 rounded-lg shadow w-40 text-sm text-[#000021] dark:text-gray-200">
                    <button className="block w-full text-left hover:bg-gray-100 dark:hover:text-white py-1 px-2"
                      onClick={handleLogout}
                    >Logout</button>
                    <button className="block w-full text-left hover:bg-gray-100 dark:hover:text-white py-1 px-2"
                    >Profile</button>
                  </div>
                )}
              </div>
            </> : <button
              className="bg-[#fff] text-[#000021] px-5 py-2 rounded-full hover:bg-[#fff]"
              onClick={() => {
                setIsModalOpen(!isModalOpen);
              }}
            >
              Sign in
            </button>
          }
          <AiOutlineMenu
            onClick={toggleMenu}
            className="text-3xl cursor-pointer md:hidden text-[#000021] p-2 rounded-full bg-white"
          />
          <AiOutlineShoppingCart
            className="text-3xl cursor-pointer text-[#000021] p-2 rounded-full bg-white"
            onClick={() => {
              setOpen(true);
            }}
          />
        </div>
      </nav>
      {/* Modal Code Start */}
      <div>
        <div
          className={`fixed z-10 inset-0 overflow-y-auto  ${isModalOpen ? "" : "hidden"
            }`}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 transition duration-1000">
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
              {modalData == "Login" ?
                <form className="bg-white p-5 rounded" onSubmit={SigninFormik.handleSubmit}>
                  <div className="flex justify-end">
                    <RxCross2
                      onClick={() => {
                        setIsModalOpen(false);
                      }}
                      fontSize={24}
                      className="text-[#000021] cursor-pointer"
                    />
                  </div>
                  <div className="flex flex-col mb-4 mx-3 rounded">
                    <label>Email</label>
                    <input
                      className="border relative bg-gray-100 px-2 py-1"
                      type="email"
                      name="email"
                      value={SigninFormik.values.email}
                      onChange={SigninFormik.handleChange}
                      onBlur={SigninFormik.handleBlur}
                    />
                    {SigninFormik.touched.email && SigninFormik.errors.email ? (
                      <span className="col-12 ps-0 pe-4 text-start text-red-600">{SigninFormik.errors.email}</span>
                    ) : null}
                  </div>
                  <div className="flex flex-col mb-4 mx-3 rounded">
                    <label>Password</label>
                    <input
                      className="border relative bg-gray-100 px-2 py-1"
                      type="password"
                      name="password"
                      value={SigninFormik.values.password}
                      onChange={SigninFormik.handleChange}
                      onBlur={SigninFormik.handleBlur}
                    />
                    {SigninFormik.touched.password && SigninFormik.errors.password ? (
                      <span className="col-12 ps-0 pe-4 text-start text-red-600">{SigninFormik.errors.password}</span>
                    ) : null}
                  </div>
                  <div className="flex justify-end text-[#161c4A] underline mx-4 cursor-pointer" onClick={() => {
                    setModalData("Forget");
                  }}>
                    Forgot Password?
                  </div>
                  <button
                    className="w-full py-2 mt-5 bg-[#161c4A] hover:bg-[#161c4A] relative text-white rounded-full"
                    type="submit"
                  >
                    Sign In
                  </button>
                  <div
                    className="flex justify-center text-[#161c4A] underline mx-4 mt-4 cursor-pointer"
                    onClick={() => {
                      setModalData("Signup");
                      formik.setFieldValue('isSignup', true)
                    }}
                  >
                    Don't have an account
                  </div>
                </form> : modalData == "Signup" ?
                  <form className="bg-white p-5 rounded" onSubmit={formik.handleSubmit}>
                    <div className="flex justify-end">
                      <RxCross2
                        onClick={() => {
                          setIsModalOpen(false);
                        }}
                        fontSize={24}
                        className="text-[#000021] cursor-pointer"
                      />
                    </div>
                    <div className="flex flex-col mb-4 mx-3 rounded">
                      <label>Name</label>
                      <input
                        className="border relative bg-gray-100 px-2 py-1"
                        type="text"
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
                    <div className="flex flex-col mb-4 mx-3 rounded">
                      <label>Email</label>
                      <input
                        className="border relative bg-gray-100 px-2 py-1"
                        type="email"
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
                    <div className="flex flex-col mb-4 mx-3 rounded">
                      <label>Password</label>
                      <input
                        className="border relative bg-gray-100 px-2 py-1"
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.errors.password &&
                        formik.touched.password ? (
                        <span className="col-12 ps-0 pe-4 text-start mt-3 text-red-600">
                          {formik.errors.password}
                        </span>
                      ) : null}
                    </div>
                    <button
                      className="w-full py-2 mt-5 bg-[#161c4A] hover:bg-[#161c4A] relative text-white rounded-full"
                      type="submit"
                    >
                      Sign Up
                    </button>

                    <div className="flex justify-center text-[#161c4A] underline mx-4 mt-4 cursor-pointer" onClick={() => {
                      setModalData("Login");
                    }}>
                      Already have an account
                    </div>
                  </form> : modalData == "Forget" ? <form className="bg-white p-5 rounded" onSubmit={ForgetFormik.handleSubmit}>
                    <div className="flex justify-end">
                      <RxCross2
                        onClick={() => {
                          setIsModalOpen(false);
                        }}
                        fontSize={24}
                        className="text-[#000021] cursor-pointer"
                      />
                    </div>
                    <div className="flex flex-col mb-4 mx-3 rounded">
                      <label>Email</label>
                      <input
                        className="border relative bg-gray-100 px-2 py-1"
                        type="email"
                        name="email"
                        value={ForgetFormik.values.email}
                        onChange={ForgetFormik.handleChange}
                        onBlur={ForgetFormik.handleBlur}
                      />
                      {ForgetFormik.errors.email &&
                        ForgetFormik.touched.email ? (
                        <span className="col-12 ps-0 pe-4 text-start mt-3 text-red-600">
                          {ForgetFormik.errors.email}
                        </span>
                      ) : null}
                    </div>
                    <button
                      className="w-full py-2 mt-5 bg-[#161c4A] hover:bg-[#161c4A] relative text-white rounded-full"
                      type="button"
                      onClick={ForgetFormik.submitForm}
                    >
                      Next
                    </button>
                  </form> : modalData == "Update" ? <form className="bg-white p-5 rounded" onSubmit={UpdateFormik.handleSubmit}>
                    <div className="flex justify-end">
                      <RxCross2
                        onClick={() => {
                          setIsModalOpen(false);
                        }}
                        fontSize={24}
                        className="text-[#000021] cursor-pointer"
                      />
                    </div>
                    <div className="flex flex-col mb-4 mx-3 rounded">
                      <label>Password</label>
                      <input
                        className="border relative bg-gray-100 px-2 py-1"
                        type="password"
                        name="password"
                        value={UpdateFormik.values.password}
                        onChange={UpdateFormik.handleChange}
                        onBlur={UpdateFormik.handleBlur}
                      />
                      {UpdateFormik.errors.password &&
                        UpdateFormik.touched.password ? (
                        <span className="col-12 ps-0 pe-4 text-start mt-3 text-red-600">
                          {UpdateFormik.errors.password}
                        </span>
                      ) : null}
                    </div>
                    <div className="flex flex-col mb-4 mx-3 rounded">
                      <label>Confirm Password</label>
                      <input
                        className="border relative bg-gray-100 px-2 py-1"
                        type="password"
                        name="confirmPassword"
                        value={UpdateFormik.values.confirmPassword}
                        onChange={UpdateFormik.handleChange}
                        onBlur={UpdateFormik.handleBlur}
                      />
                      {UpdateFormik.errors.confirmPassword &&
                        UpdateFormik.touched.confirmPassword ? (
                        <span className="col-12 ps-0 pe-4 text-start mt-3 text-red-600">
                          {UpdateFormik.errors.confirmPassword}
                        </span>
                      ) : null}
                    </div>
                    <button
                      className="w-full py-2 mt-5 bg-[#161c4A] hover:bg-[#161c4A] relative text-white rounded-full"
                      type="button"
                      onClick={UpdateFormik.submitForm}
                    >
                      Update
                    </button>
                  </form> : <></>}
            </div>
          </div>
        </div>
      </div>
      {/* Modal Code End */}
    </header>
  );
};
export default Navbar;