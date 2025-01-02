
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useFormik} from 'formik';
import { RegisterSchema } from '../../../yupSchema/RegisterSchema';
import Button from '@mui/material/Button';


export default function Register() {


  const initialValues = {
     school_name:"",
        email:"",
        owner_name:"",
        password:"",
        confirm_password:""
  }
  const Formik = useFormik({
    initialValues,
    validationSchema:RegisterSchema,
    onSubmit:(values)=>{
        console.log("Register submit values",values);
    }
  })

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { m: 1 },
      display:'flex',
      flexDirection:'column',
      width:'60vw',
      minWidth:'230px',
      margin:'auto'
    }}
      noValidate
      autoComplete="off"
      onSubmit={Formik.handleSubmit}
    >
      <TextField
        name='school_name'
        label="School Name"
        value={Formik.values.school_name}
        onChange={Formik.handleChange}
        onBlur={Formik.handleBlur}
      />
      {Formik.touched.school_name && Formik.errors.school_name &&
       <p style={{color:"red", textTransform:"capitalize"}}>
        {Formik.errors.school_name}</p>}


        <TextField
        name='email'
        label="Email"
        value={Formik.values.email}
        onChange={Formik.handleChange}
        onBlur={Formik.handleBlur}
      />
      {Formik.touched.email && Formik.errors.email &&
       <p style={{color:"red", textTransform:"capitalize"}}>
        {Formik.errors.email}</p>}


        <TextField
        name='owner_name'
        label="Owner_name"
        value={Formik.values.owner_name}
        onChange={Formik.handleChange}
        onBlur={Formik.handleBlur}
      />
      {Formik.touched.owner_name && Formik.errors.owner_name &&
       <p style={{color:"red", textTransform:"capitalize"}}>
        {Formik.errors.owner_name}</p>}


        <TextField
        name='password'
        label="Password"
        value={Formik.values.password}
        onChange={Formik.handleChange}
        onBlur={Formik.handleBlur}
      />
      {Formik.touched.password && Formik.errors.password &&
       <p style={{color:"red", textTransform:"capitalize"}}>
        {Formik.errors.password}</p>}


        <TextField
        name='confirm_password'
        label="Confirm password"
        value={Formik.values.confirm_password}
        onChange={Formik.handleChange}
        onBlur={Formik.handleBlur}
      />
      {Formik.touched.confirm_password && Formik.errors.confirm_password &&
       <p style={{color:"red", textTransform:"capitalize"}}>
        {Formik.errors.confirm_password}</p>}




<Button type='submit' variant='contained'>Submit</Button>
      
    </Box>
  );
}