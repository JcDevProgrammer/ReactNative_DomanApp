import * as yup from "yup"

export const schema = yup
  .object({
    id: yup
      .string()
      .required("Id is required"),

    firstName: yup
    .string()
    .required("FirstName is required"),

    lastName: yup
    .string()
    .required("LastName is required"),

    phoneNumber: yup
    .string()
    .required("PhoneNumber is required"),
   

    email: yup
    .string()
    .required("Email is required")
    .email("Email must be valid"),

    password: yup
    .string()
    .required("Strong password with 2digits and 1 special char")
    .min(8, 'Password must be at least 8 characters long.')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .matches(/\d/, 'Password must contain at least one number.')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character.'),
    
    confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match.')
    .required('Confirm Password is required.'),

  }).required();
