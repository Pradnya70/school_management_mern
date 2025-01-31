import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { loginSchema } from "../../../yupSchema/loginSchema";
import { Button, Typography, CardMedia } from "@mui/material";
import axios from "axios";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
      const navigate= useNavigate();
      const {login}= React.useContext(AuthContext)
  
  const initialValues = {
    email: "",
    password: "",
  };
  const Formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      axios
        .post(`http://localhost:5000/api/school/login`, { ...values })
        .then((resp) => {

          // console.log(resp.headers["authorization"]);
          console.log(resp.headers["authorization"])

          const token = resp.headers.get("Authorization");
          if(token){
            localStorage.setItem("token",token)
          }
          const user = resp.data.user;
          if(user){
            localStorage.setItem("user",JSON.stringify(user))
            login(user);
          }
          setMessage(resp.data.message);
          setMessageType("success");
          Formik.resetForm();
          navigate("/school");

        })
        .catch((e) => {
          setMessage(e.response.data.message);
          setMessageType("error");
          console.log("Error", e);
        });
    },
  });

  const [message, setMessage] = React.useState("");
  const [messageType, setMessageType] = React.useState("sucess");
  const handleMessageClose = () => {
    setMessage("");
  };
  return (
    <Box
      component={"div"}
      sx={{
        background:
          "url(https://cdn.pixabay.com/photo/2017/08/12/21/42/back2school-2635456_1280.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100%",
        minHeight: "80vh",
        paddingTop: "60px",
        paddingBottom: "60px",
      }}
    >
      {message && (
        <MessageSnackbar
          message={message}
          type={messageType}
          handleClose={handleMessageClose}
        />
      )}

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          display: "flex",
          flexDirection: "column",
          width: "50vw",
          minWidth: "230px",
          margin: "auto",
          background: "#fff",
        }}
        noValidate
        autoComplete="off"
        onSubmit={Formik.handleSubmit}
      >
              <Typography
        variant="h2"
        sx={{ textAlign: "center" }}
      >
        Login
      </Typography>
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

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </Box>
    </Box>
  );
}
