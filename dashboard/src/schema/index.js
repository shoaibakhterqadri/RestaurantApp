import * as Yup from "yup";

// ALL INITIAL VALUES
const LoginInitialValues = {
  email: "",
  password: "",
};
const dishCreationInitialValues = {
  name: "",
  category: "",
  discription: "",
  price: 0,
  discount: "",
  image: "",
  _id: "",
  isUpload: true
};

const OfferInitialValues = {
  image: null,
  date: "",
  _id: "",
};
const OfferValidationSchema = Yup.object().shape({
  image: Yup.mixed().required("Please upload an image"),
  date: Yup.date()
    .required("Please enter a date")
    .test(
      "is-future-date",
      "Date must be greater than today",
      function (value) {
        const today = new Date();
        const selectedDate = new Date(value);
        return selectedDate > today;
      }
    ),
});

// ALL SCHEMAS
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("email is required"),
  password: Yup.string()
    .required("password is required")
    .min(6, "Password must be at least 6 characters"),
});
const dishCreationSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  category: Yup.string().required("category is required"),
  discription: Yup.string().required("discription is required"),
  discount: Yup.number().required("discount is required"),
  image: Yup
    .string()
    .when("isUpload", (isUpload, schema) => {
      return isUpload == true
        ? schema.mixed().required("Please upload an image")
        : schema;
    }),
  // image: Yup.mixed().required("Please upload an image"),
  price: Yup.number()
    .required("enter price")
    .min(2, "Price must greater than 2 digits"),
});

export {
  LoginInitialValues,
  dishCreationInitialValues,
  LoginSchema,
  dishCreationSchema,
  OfferInitialValues,
  OfferValidationSchema,
};
