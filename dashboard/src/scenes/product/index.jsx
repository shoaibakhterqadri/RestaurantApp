import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import { FlexBetween, FlexCenter } from "../../style/CommonClasses";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { HashLoader } from "react-spinners";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import {
  deleteApiMethod,
  getApiMethod,
  postApiMethod,
  updateApiMethod,
} from "../../state/Api.js";
import FormikCommonError from "../../components/FormikCommonError";
import { RxCross2 } from "react-icons/rx";
import { dishCreationInitialValues, dishCreationSchema } from "../../schema";
import {
  AiOutlineClose,
  AiOutlineSearch,
  AiOutlinePlusCircle,
  AiOutlineEdit,
} from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";

const Dish = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableListData, setTableListData] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  const [image, setImage] = useState(
    "https://cdn3d.iconscout.com/3d/premium/thumb/upload-cloud-6219414-5102412.png?f=webp"
  );
  const [isEditMode, setIsEditMode] = useState(false);

  const formik = useFormik({
    initialValues: dishCreationInitialValues,
    validationSchema: dishCreationSchema,
    onSubmit: async (values) => {
      const { name, category, discription, price, discount, image, _id, isUpload } =
        values;
      if (!isEditMode) {
        try {
          const formData = new FormData();
          formData.append("name", name);
          formData.append("category", category);
          formData.append("discription", discription);
          formData.append("price", price);
          formData.append("discount", discount);
          formData.append("image", image);
          const postDish = await postApiMethod("dish/createDish", formData);
          if (postDish?.status == 200) {
            formik.resetForm({ values: "" });
            setImage(
              "https://cdn3d.iconscout.com/3d/premium/thumb/upload-cloud-6219414-5102412.png?f=webp"
            );
            setIsModalOpen(false);
            setIsLoad(!isLoad);
            toast.success(`${postDish?.data?.message}`, {
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
          toast.error(`${error?.message}`, {
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
      } else {
        try {
          if (isUpload) {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("category", category);
            formData.append("discription", discription);
            formData.append("price", price);
            formData.append("discount", discount);
            formData.append("image", image);
            formData.append("_id", _id);
            formData.append("isUpload", isUpload);
            const postDish = await updateApiMethod("dish/updateDish", formData);
            if (postDish?.status == 200) {
              formik.resetForm({ values: "" });
              setImage(
                "https://cdn3d.iconscout.com/3d/premium/thumb/upload-cloud-6219414-5102412.png?f=webp"
              );
              setIsModalOpen(false);
              setIsLoad(!isLoad);
              toast.success(`${postDish?.data?.message}`, {
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
          } else {
            const postObj = {
              name, category, discription, price, discount, image, _id, isUpload
            }
            const postDish = await updateApiMethod("dish/updateDish", postObj);
            if (postDish?.status == 200) {
              formik.resetForm({ values: "" });
              setImage(
                "https://cdn3d.iconscout.com/3d/premium/thumb/upload-cloud-6219414-5102412.png?f=webp"
              );
              setIsModalOpen(false);
              setIsLoad(!isLoad);
              toast.success(`${postDish?.data?.message}`, {
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

        } catch (error) {
          toast.error(`${error?.message}`, {
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
    },
  });

  const [filters1, setFilters1] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    "country.name": {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: {
      operator: FilterOperator.OR,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
  });
  const filtersMap = {
    filters1: { value: filters1, callback: setFilters1 },
  };
  const onGlobalFilterChange = (event, filtersKey) => {
    const value = event.target.value;
    let filters = { ...filtersMap[filtersKey].value };
    filters["global"].value = value;

    filtersMap[filtersKey].callback(filters);
  };
  const renderHeader = (filtersKey) => {
    const filters = filtersMap[`${filtersKey}`].value;
    const value = filters["global"] ? filters["global"].value : "";

    return (
      <span className="p-input-icon-left">
        <AiOutlineSearch fontSize={20} />
        <InputText
          type="search"
          value={value || ""}
          onChange={(e) => onGlobalFilterChange(e, filtersKey)}
          placeholder="Search Dish"
        />
      </span>
    );
  };
  const header1 = renderHeader("filters1");
  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    convertImageIntoBase64(file);
    formik.setFieldValue("image", file);
  };
  const convertImageIntoBase64 = (file) => {
    const imageReader = new FileReader();
    if (file) {
      imageReader.readAsDataURL(file);
      setImage();
      imageReader.onloadend = () => {
        setImage(imageReader.result);
      };
    }
  };
  const handleEditProductImageUpload = (e) => {
    formik.setFieldValue('isUpload', true)
    const file = e.target.files[0];
    convertImageIntoBase64(file);
    formik.setFieldValue("image", file);
  };

  const getAllDishes = async () => {
    try {
      const getAllDishesData = await getApiMethod("dish/getDishes");
      setTableListData(getAllDishesData?.data);
    } catch (error) {
      toast.error(`${error?.message}`, {
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
  };

  const handleDelete = async (_id) => {
    try {
      const deleteDish = await deleteApiMethod("dish/deleteDish", {
        _id,
      });
      if (deleteDish?.status == 200) {
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
        setIsLoad(!isLoad);
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
  };

  const handleEdit = async (e) => {
    setIsEditMode(true);
    setIsModalOpen(true);
    formik.setFieldValue("_id", e?._id);
    formik.setFieldValue("category", e?.category);
    formik.setFieldValue("name", e?.name);
    formik.setFieldValue("discription", e?.discription);
    formik.setFieldValue("price", e?.price);
    formik.setFieldValue("discount", e?.discount);
    formik.setFieldValue('isUpload', false)
    setImage(e?.image?.url);
  };

  useEffect(() => {
    getAllDishes();
  }, [isLoad]);
  return (
    <div>
      {/* TOAST CONTAINER FOR MESSAGE */}
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
        <Heading>DISHES</Heading>
        <button
          className={`bg-transparent hover:bg-indigo-600 text-indigo-600 font-semibold hover:text-white py-1 px-2 border border-indigo-600 hover:border-transparent rounded ${FlexBetween} gap-4`}
          onClick={() => {
            setIsModalOpen(true)
            formik.resetForm()
          }}
        >
          <AiOutlinePlusCircle fontSize={24} /> DISH
        </button>
      </div>
      <div>
        {/* DISHES MODAL START HERE */}
        <div
          className={`fixed z-10 inset-0 overflow-y-auto ${isModalOpen ? "" : "hidden"
            }`}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 transition duration-700">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
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
              <form
                className="bg-white p-5 rounded"
                onSubmit={formik.handleSubmit}
              >
                <div className="flex justify-end">
                  <RxCross2
                    onClick={() => {
                      setIsModalOpen(false);
                    }}
                    fontSize={24}
                    className="text-indigo-600"
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label>Dish Name</label>
                  <input
                    className="border relative bg-gray-100 px-2 py-1"
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormikCommonError
                    name={formik.errors.name}
                    touched={formik.touched.name}
                    error={formik.errors.name}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label>Dish Price</label>
                  <input
                    className="border relative bg-gray-100 px-2 py-1"
                    type="number"
                    name="price"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormikCommonError
                    name={formik.errors.price}
                    touched={formik.touched.price}
                    error={formik.errors.price}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label>Dish Category</label>
                  <input
                    className="border relative bg-gray-100 px-2 py-1"
                    type="text"
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormikCommonError
                    name={formik.errors.category}
                    touched={formik.touched.category}
                    error={formik.errors.category}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label>Dish Discription</label>
                  <input
                    className="border relative bg-gray-100 px-2 py-1"
                    type="text"
                    name="discription"
                    value={formik.values.discription}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormikCommonError
                    name={formik.errors.discription}
                    touched={formik.touched.discription}
                    error={formik.errors.discription}
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <label>Dish Discount</label>
                  <input
                    className="border relative bg-gray-100 px-2 py-1"
                    type="text"
                    name="discount"
                    value={formik.values.discount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <FormikCommonError
                    name={formik.errors.discount}
                    touched={formik.touched.discount}
                    error={formik.errors.discount}
                  />
                </div>
                <div>
                  <div className="p-4 bg-white w-max bg-whtie m-auto rounded-lg">
                    <div
                      className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
                      style={{ width: "450px" }}
                    >
                      <img
                        src={image}
                        alt="dish"
                        style={{ width: "100%", height: 250 }}
                      />
                      {
                        isEditMode ? <div className="input_field flex flex-col w-max mx-auto text-center">
                          <label>
                            <input
                              className="text-sm cursor-pointer w-36 hidden"
                              type="file"
                              accept="image/"
                              name={"image"}
                              onChange={handleEditProductImageUpload}
                            />
                            <div className="text bg-indigo-600 text-white border border-gray-300 rounded cursor-pointer p-1 px-3 hover:bg-indigo-500 mt-1">
                              Select
                            </div>
                          </label>
                        </div> : <div className="input_field flex flex-col w-max mx-auto text-center">
                          <label>
                            <input
                              className="text-sm cursor-pointer w-36 hidden"
                              type="file"
                              accept="image/"
                              name={"image"}
                              onChange={handleProductImageUpload}
                            />
                            <div className="text bg-indigo-600 text-white border border-gray-300 rounded cursor-pointer p-1 px-3 hover:bg-indigo-500 mt-1">
                              Select
                            </div>
                          </label>
                        </div>
                      }

                    </div>
                    <FormikCommonError
                      name={formik.errors.image}
                      touched={formik.touched.image}
                      error={formik.errors.image}
                    />
                  </div>
                </div>
                <button
                  className="w-full py-2 mt-5 bg-indigo-600 hover:bg-indigo-700 relative text-white"
                  type="submit"
                >
                  {isEditMode ? "Update Dish" : "Add Dish"}
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* DISHES MODAL END HERE */}

        {/* DISHES TABLE START */}
        <div className="table-card">
          <DataTable
            value={tableListData}
            styleClass="myTable"
            responsiveLayout="scroll"
            scrollable
            size="small"
            resizableColumns
            columnResizeMode="expand"
            header={header1}
            filters={filters1}
            onFilter={(e) => setFilters1(e.filters)}
            scrollHeight="430px"
            emptyMessage="No dish found."
            filterDisplay="menu"
            showGridlines
            className="my-2"
            paginator
            rows={6}
          >
            <Column field="name" header="Dish Name" sortable></Column>
            {/* <Column
              field="discription"
              header="Dish Description"
              sortable
            ></Column> */}
            <Column
              field="price"
              header="Dish Price"
              style={{ justifyContent: "center" }}
              sortable
            ></Column>
            <Column
              field="category"
              header="Dish Category"
              style={{ justifyContent: "center" }}
              sortable
            ></Column>
            <Column
              field="clientCompanyName"
              header="Dish Image"
              style={{ justifyContent: "center" }}
              body={(e) => {
                return (
                  <>
                    <div className="justify-items-center items-center">
                      <img
                        src={e?.image?.url}
                        alt="product image"
                        width={50}
                        height={50}
                        style={{
                          display: "flex",
                          borderRadius: "50%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      />
                    </div>
                  </>
                );
              }}
              sortable
            ></Column>
            <Column
              field="clientCompanyName"
              header="Actions"
              style={{ justifyContent: "center" }}
              body={(e) => {
                return (
                  <div className="flex justify-start items-center">
                    <AiOutlineClose
                      size={"1.5rem"}
                      color="red"
                      onClick={() => {
                        handleDelete(e?._id);
                      }}
                    />
                    <AiOutlineEdit
                      size={"1.5rem"}
                      color="green"
                      onClick={() => {
                        handleEdit(e);
                      }}
                    />
                  </div>
                );
              }}
              sortable
            ></Column>
          </DataTable>
        </div>
        {/* DISHES TABLE END */}
      </div>
    </div>
  );
};

export default Dish;
