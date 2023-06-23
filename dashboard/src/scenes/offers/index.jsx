import React, { useEffect, useState } from "react";
import Heading from "../../components/Heading";
import {
  AiOutlineClose,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { FlexBetween } from "../../style/CommonClasses";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import { AiOutlineSearch } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useFormik } from "formik";
import FormikCommonError from "../../components/FormikCommonError";
import { OfferInitialValues, OfferValidationSchema } from "../../schema";
import {
  deleteApiMethod,
  getApiMethod,
  postApiMethod,
} from "../../state/Api";
import { toast, ToastContainer } from "react-toastify";
const Offers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(
    "https://cdn3d.iconscout.com/3d/premium/thumb/upload-cloud-6219414-5102412.png?f=webp"
  );
  const [isLoad, setIsLoad] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const formik = useFormik({
    initialValues: OfferInitialValues,
    validationSchema: OfferValidationSchema,
    onSubmit: async (values) => {
      const { image, date } = values;
      const formData = new FormData();
      formData.append("image", image);
      formData.append("expiryDate", date);
      try {
        const postOffer = await postApiMethod(`/offer/addOffer`, formData);
        if (postOffer?.status == 200) {
          formik.resetForm({ values: "" });
          setImageSrc(
            "https://cdn3d.iconscout.com/3d/premium/thumb/upload-cloud-6219414-5102412.png?f=webp"
          );
          setIsModalOpen(false);
          setIsLoad(!isLoad);
          toast.success(`${postOffer?.data?.message}`, {
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

    },
  });
  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    convertImageIntoBase64(file);
    formik.setFieldValue("image", file);
    formik.setFieldValue("previousFile", file);
  };
  const convertImageIntoBase64 = (file) => {
    const imageReader = new FileReader();
    if (file) {
      imageReader.readAsDataURL(file);
      setImageSrc(
        "https://cdn3d.iconscout.com/3d/premium/thumb/upload-cloud-6219414-5102412.png?f=webp"
      );
      imageReader.onloadend = () => {
        setImageSrc(imageReader.result);
        // formik.setFieldValue("image", imageReader.result);
      };
    }
  };

  // Offer Table Code Start
  const [tableListData, setTableListData] = useState([]);
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
          placeholder="Search Offers"
        />
      </span>
    );
  };
  const header1 = renderHeader("filters1");
  const GeAllOffers = async () => {
    const { data, status } = await getApiMethod("/offer/getAllOffer");
    if (status === 200) {
      setTableListData(data);
    }
  };

  useEffect(() => {
    GeAllOffers();
  }, [isLoad]);

  const changeDateFormat = (e) => {
    const dateString = e?.isUpdate ? e?.updatedAt : e?.createdAt;
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
    const day = ("0" + date.getUTCDate()).slice(-2);
    const newDateString = `${year}-${month}-${day}`;
    return newDateString;
  };

  const handleDelete = async (_id) => {
    try {
      const deleteDish = await deleteApiMethod("offer/deleteOffer", {
        _id,
      });
      if (deleteDish?.status == 200) {
        setIsLoad(!isLoad);
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
  };

  // Offer Table Code End

  return (
    <div>
      {/* TOAST CONTAINER */}
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
      {/* MODAL CODE START */}
      <div
        className={`fixed z-10 inset-0 overflow-y-auto ${isModalOpen ? "" : "hidden"
          }`}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0 transition duration-700">
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
              <div>
                <div className="p-4 bg-white w-max bg-whtie m-auto rounded-lg">
                  <div
                    className="file_upload p-3 relative border-4 border-dotted border-gray-300 rounded-lg"
                    style={{ width: "450px" }}
                  >
                    <img
                      src={imageSrc}
                      alt="dish"
                      style={{ width: "100%", height: 250 }}
                    />
                    <div className="input_field flex flex-col w-max mx-auto text-center">
                      <label>
                        <input
                          className="text-sm cursor-pointer w-36 hidden"
                          type="file"
                          accept="image/"
                          onChange={handleProductImageUpload}
                          name="image"
                        />
                        <div className="text bg-indigo-600 text-white border border-gray-300 rounded cursor-pointer p-1 px-3 hover:bg-indigo-500 mt-1">
                          Upload Image
                        </div>
                      </label>
                    </div>
                  </div>
                  <FormikCommonError
                    name={formik.errors.image}
                    touched={formik.touched.image}
                    error={formik.errors.image}
                  />
                </div>
              </div>
              <div className="flex flex-col mb-4 mx-3 rounded">
                <label>Expire Offer</label>
                <input
                  className="border relative bg-gray-100 px-2 py-1"
                  type="date"
                  name="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <FormikCommonError
                  name={formik.errors.date}
                  touched={formik.touched.date}
                  error={formik.errors.date}
                />
              </div>
              <button
                className="w-full py-2 mt-5 bg-indigo-600 hover:bg-indigo-700 relative text-white"
                type="button"
                onClick={formik.submitForm}
              >
                {isEditMode ? "Update Offer" : "Add Offers"}
              </button>
            </form>
          </div>
        </div>
      </div>
      {/* MODAL CODE END */}

      {/* OFFER PAGE CODE */}
      <div className={`${FlexBetween}`}>
        <Heading>OFFERS</Heading>
        <button
          className={`bg-transparent hover:bg-indigo-600 text-indigo-600 font-semibold hover:text-white py-1 px-2 border border-indigo-600 hover:border-transparent rounded ${FlexBetween} gap-4`}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <AiOutlinePlusCircle fontSize={24} /> Add Offers
        </button>
      </div>
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
          emptyMessage="No offers found."
          filterDisplay="menu"
          showGridlines
          className="my-2"
          paginator
          rows={6}
        >
          <Column
            field="Image"
            header="Image"
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
            field="createdAt"
            header="Created Date"
            style={{ justifyContent: "center" }}
            body={changeDateFormat}
            sortable
          ></Column>
          <Column
            field="expiryDate"
            header="Expire Date"
            style={{ justifyContent: "center" }}
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
                </div>
              );
            }}
            sortable
          ></Column>
        </DataTable>
      </div>
      {/* <OfferTable /> */}
    </div>
  );
};
export default Offers;
