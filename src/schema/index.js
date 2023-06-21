import * as yup from 'yup'

const SignupInitialValues = {
    email: '', name: "", password: ''
};
const SigninInitialValues = {
    email: '', password: ''
};
const ForgetInitialValues = {
    email: ''
};
const UpdateInitialValues = {
    password: '', confirmPassword: ""
};
const feedbackInitialValues = {
    name: '',
    email: '',
    message: ''
};

const feedbackValidationSchema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    message: yup.string()
        .required('Message is required')
        .min(10, 'Message must be at least 10 characters')
        .max(150, 'Message must be at most 150 characters')
});
const SignupValidationSchema = yup.object({
    email: yup
        .string().required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should contain at least 8 characters').required('Password is required'),
    name: yup
        .string().required("Name is required").min(2, 'Name is invalid'),



});
const SigninValidationSchema = yup.object({
    email: yup
        .string().required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should contain at least 8 characters').required('Password is required'),
});
const ForgetValidationSchema = yup.object({
    email: yup
        .string().required('Email is required'),
});
const UpdateValidationSchema = yup.object({
    password: yup
        .string()
        .min(8, 'Password should contain at least 8 characters').required('Password is required'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),

});

export { SignupInitialValues, SignupValidationSchema, SigninInitialValues, SigninValidationSchema, ForgetInitialValues, ForgetValidationSchema, UpdateValidationSchema, UpdateInitialValues, feedbackInitialValues, feedbackValidationSchema }