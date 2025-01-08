import * as yup from 'yup';

export const LoginSchema = yup.object({
    email:yup.string().email("It must be an Email.").required("Email is required"),
    password:yup.string().min(8, "Password must contain at least 8 characters").required("Password is a required field.")
})