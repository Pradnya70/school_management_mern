import * as yup from 'yup';

export const studentSchema = yup.object({
    name: yup.string().min(8, "Name must contain 8 characters").required("School Name is required."),
    email:yup.string().email("It must be an Email.").required("Email is required"),
    student_class:yup.string().required("Student Class is required field."),
    age:yup.string().required("Age is required field."),
    gender: yup.string().required("Gender is required field."),
    guardian: yup.string().min(4, "Must contain 4 characters").required("Guardian is required field."),
    guardian_phone: yup.string().min(10, " Must contain 10 characters").required("Guardian phone is required."),
    password:yup.string().min(8, "Password must contain at least 8 characters").required("Password is a required field."),
    confirm_password:yup.string().oneOf([yup.ref('password')],"Confirm Password Must is required field")
    
})