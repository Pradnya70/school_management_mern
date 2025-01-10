import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { RegisterSchema } from "../../../yupSchema/RegisterSchema";
import { Button, Typography,CardMedia } from "@mui/material";
import axios from "axios";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";

export default function Register() {
  const [file, setfile] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);

  const addImage = (event) => {
    const file = event.target.files[0];
    setImageUrl(URL.createObjectURL(file));
    setfile(file);
  };

  //resetting image
  const fileInputRef = React.useRef(null);
  const handleClearFile = () => {
    if(fileInputRef.current){
        fileInputRef.current.value = '';
    }
    setfile(null);
    setImageUrl(null);
  }


  const initialValues = {
    school_name: "",
    email: "",
    owner_name: "",
    password: "",
    confirm_password: "",
  };
  const Formik = useFormik({
    initialValues,
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      console.log("Register submit values", values);
      const fd = new FormData();
      fd.append("image",file, file.name);
      fd.append("school_name", values.school_name);
      fd.append("email", values.email);
      fd.append("owner_name", values.owner_name);
      fd.append("password", values.password);

       if(file){ 
      axios.post(`http://localhost:5000/api/school/register`,fd).then(resp=>{
        console.log(resp)
        setMessage(resp.data.message)
        setMessageType('success')
        Formik.resetForm();
        handleClearFile()  
      }).catch(e=>{
        setMessage(e.response.data.message)
        setMessageType('error')
        console.log("Error",e)
      })
      }else{
        setMessage("Please Add School Image")
        setMessageType('error')
      }
    },
  });

  const [message, setMessage]= React.useState('');
  const [messageType, setMessageType]= React.useState('sucess')
  const handleMessageClose = () => {
    setMessage('');
  }
  return (<Box component={'div'} sx={{background:"url(https://cdn.pixabay.com/photo/2017/08/12/21/42/back2school-2635456_1280.png)",
    backgroundSize:"cover",
    backgroundRepeat:"no-repeat",
    height:"100%",
    paddingTop:"60px",
    paddingBottom:"60px"
  }}>
  {message &&
    <MessageSnackbar message={message} type={messageType} handleClose={handleMessageClose}  />
  }
  
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
        display: "flex",
        flexDirection: "column",
        width: "50vw",
        minWidth: "230px",
        margin: "auto",
        background: "#fff"
      }}
      noValidate
      autoComplete="off"
      onSubmit={Formik.handleSubmit}
    >
      <Typography variant="h2" sx={{textAlign:"center"}}>Register</Typography>
      <Typography>Add School Picture</Typography>

      <TextField
        type="file"
        inputRef={fileInputRef}
        onChange={(event) => {
          addImage(event);
        }}
      />
      {imageUrl && 
        <Box>
          <CardMedia component={"img"} height={"240px"} image={imageUrl} />
        </Box>
      }

      <TextField
        name="school_name"
        label="School Name"
        value={Formik.values.school_name}
        onChange={Formik.handleChange}
        onBlur={Formik.handleBlur}
      />
      {Formik.touched.school_name && Formik.errors.school_name && (
        <p style={{ color: "red", textTransform: "capitalize" }}>
          {Formik.errors.school_name}
        </p>
      )}

      <TextField
        name="email"
        label="Email"
        type="email"
        value={Formik.values.email}
        onChange={Formik.handleChange}
        onBlur={Formik.handleBlur}
      />
      {Formik.touched.email && Formik.errors.email && (
        <p style={{ color: "red", textTransform: "capitalize" }}>
          {Formik.errors.email}
        </p>
      )}

      <TextField
        name="owner_name"
        label="Owner_name"
        value={Formik.values.owner_name}
        onChange={Formik.handleChange}
        onBlur={Formik.handleBlur}
      />
      {Formik.touched.owner_name && Formik.errors.owner_name && (
        <p style={{ color: "red", textTransform: "capitalize" }}>
          {Formik.errors.owner_name}
        </p>
      )}

      <TextField
        name="password"
        label="Password"
         type="password"
        value={Formik.values.password}
        onChange={Formik.handleChange}
        onBlur={Formik.handleBlur}
      />
      {Formik.touched.password && Formik.errors.password && (
        <p style={{ color: "red", textTransform: "capitalize" }}>
          {Formik.errors.password}
        </p>
      )}

      <TextField
        name="confirm_password"
        label="Confirm password"
        type="password"
         value={Formik.values.confirm_password}
        onChange={Formik.handleChange}
        onBlur={Formik.handleBlur}
      />
      {Formik.touched.confirm_password && Formik.errors.confirm_password && (
        <p style={{ color: "red", textTransform: "capitalize" }}>
          {Formik.errors.confirm_password}
        </p>
      )}

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Box>
    </Box>
  );
}
