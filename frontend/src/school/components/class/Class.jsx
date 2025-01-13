import {Box, Button, TextField, Typography,Paper} from "@mui/material";
import { useFormik } from "formik";
import { classSchema } from "../../../yupSchema/classSchema";
import axios from "axios";
import {baseApi} from "../../../environment"
import { useEffect, useState } from "react";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";

//icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



export default function Class(){

  const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("sucess");
    const handleMessageClose = () => {
      setMessage("");
    };

  const[classes,setClasses] = useState([]);
  const[edit,setEdit]=useState(false);
  const[editId, setEditId]=useState(null)

const handleEdit = (id, class_text, class_num)=>{
  console.log(id)
  setEdit(true);
  setEditId(id)
  Formik.setFieldValue("class_text",class_text)
  Formik.setFieldValue("class_num",class_num)
};

const cancelEdit =()=>{
  setEdit(false)
  setEditId(null)
  Formik.setFieldValue("class_text","")
  Formik.setFieldValue("class_num","")
};

const handleDelete = (id)=>{
  console.log(id)
  axios.delete(`${baseApi}/class/delete/${id}`).then(resp=>{
      setMessage(resp.data.message);
      setMessageType("success");
}).catch(e=>{
  console.log(e)
  setMessage("Error in delete.")
  setMessageType("error");
});
};

   const Formik = useFormik({
    initialValues: {class_text:"", class_num:""},
    validationSchema:classSchema,
    onSubmit: (values) => {
         console.log(values);


if(edit){
  axios.patch(`${baseApi}/class/update/${editId}`,{...values}).then(resp=>{
    setMessage(resp.data.message)
    setMessageType("success");
    cancelEdit();
  }).catch(e=>{
    console.log("Error in updating",e);
    setMessage("Error in update")
    setMessageType("error");
  });
}else{
        axios.post(`${baseApi}/class/create`,{...values}).then((resp)=>{
          console.log("Class add response",resp);
          setMessage(resp.data.message)
          setMessageType("success");
        }).catch(e=>{
          console.log("Error in class",e);
          setMessage("Error in saving")
          setMessageType("error");
        })
      };

            // Reset the form after submission
        Formik.resetForm()
      }
    
   });
  
   
   const fetchAllClasses = ()=>{
    axios.get(`${baseApi}/class/all`).then(resp=>{
      setClasses(resp.data.data);
    }).catch(e=>{
      console.log("Error in class",e)
    })
   }

   useEffect(()=>{
     fetchAllClasses();
   },[message])

    return (
        <>
        {message && (
                <MessageSnackbar
                  message={message}
                  type={messageType}
                  handleClose={handleMessageClose}
                />
              )}
        <h1>Class</h1>
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
        {edit?
              <Typography
        variant="h4"
        sx={{ textAlign: "center", fontWeight:700}}
      >
        Edit Class
      </Typography>:<Typography
        variant="h4"
        sx={{ textAlign: "center", fontWeight:700}}
      >
        Add New Class
      </Typography>}

        <TextField
          name="class_text"
          label="Class Text "
          value={Formik.values.class_text}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.class_text && Formik.errors.class_text && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {Formik.errors.class_text}
          </p>
        )}

        <TextField
          name="class_num"
          label="Class Number"
          value={Formik.values.class_num}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.class_num && Formik.errors.class_num && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {Formik.errors.class_num}
          </p>
        )}
 
       <Button type="submit" variant="contained">
          Submit
        </Button>

        {edit &&
        <Button onClick={()=>{cancelEdit()}} type="button" variant="contained">
          Cancle
        </Button>}
      </Box>

      <Box component={'div'} sx={{display:"flex",flexDirection:"row",flexWrap:'wrap'}}>
       {classes && classes.map(x=>{
        return(<Paper key={x._id} sx={{m:2,p:2}}>
         <Box component={'div'}><Typography variant="h5">Class:{x.class_text} [{x.class_num}]</Typography></Box>
         <Box component={'div'}>
          <Button onClick={()=>{handleEdit(x._id,x.class_text, x.class_num)}}><EditIcon/></Button>
          <Button onClick={()=>{handleDelete(x._id)}} sx={{color:"red"}}><DeleteIcon/></Button>
         </Box>
          </Paper>)
       })}
      </Box>
       
        </>
    )
}