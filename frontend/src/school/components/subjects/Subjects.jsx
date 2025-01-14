import {Box, Button, TextField, Typography,Paper} from "@mui/material";
import { useFormik } from "formik";
import { subjectSchema } from "../../../yupSchema/subjectSchema";
import axios from "axios";
import {baseApi} from "../../../environment"
import { useEffect, useState } from "react";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";

//icons
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';



export default function subject(){

  const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("sucess");
    const handleMessageClose = () => {
      setMessage("");
    };

  const[subjects,setSubjects] = useState([]);
  const[edit,setEdit]=useState(false);
  const[editId, setEditId]=useState(null)

const handleEdit = (id, subject_name, subject_codename)=>{
  console.log(id)
  setEdit(true);
  setEditId(id)
  Formik.setFieldValue("subject_name",subject_name)
  Formik.setFieldValue("subject_codename",subject_codename)
};

const cancelEdit =()=>{
  setEdit(false)
  setEditId(null)
  Formik.setFieldValue("subject_name","")
  Formik.setFieldValue("subject_codename","")
};

const handleDelete = (id)=>{
  console.log(id)
  axios.delete(`${baseApi}/subject/delete/${id}`).then(resp=>{
      setMessage(resp.data.message);
      setMessageType("success");
}).catch(e=>{
  console.log(e)
  setMessage("Error in delete.")
  setMessageType("error");
});
};

   const Formik = useFormik({
    initialValues: {subject_name:"", subject_codename:""},
    validationSchema:subjectSchema,
    onSubmit: (values) => {
         console.log(values);


if(edit){
  axios.patch(`${baseApi}/subject/update/${editId}`,{...values}).then(resp=>{
    setMessage(resp.data.message)
    setMessageType("success");
    cancelEdit();
  }).catch(e=>{
    console.log("Error in updating",e);
    setMessage("Error in update")
    setMessageType("error");
  });
}else{
        axios.post(`${baseApi}/subject/create`,{...values}).then((resp)=>{
          console.log("subject add response",resp);
          setMessage(resp.data.message)
          setMessageType("success");
        }).catch(e=>{
          console.log("Error in subject",e);
          setMessage("Error in saving")
          setMessageType("error");
        })
      };

            // Reset the form after submission
        Formik.resetForm()
      }
    
   });
  
   
   const fetchAllsubjects = ()=>{
    axios.get(`${baseApi}/subject/all`).then(resp=>{
      setSubjects(resp.data.data);
    }).catch(e=>{
      console.log("Error in subject",e)
    })
   }

   useEffect(()=>{
     fetchAllsubjects();
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
        <Typography variant="h3" sx={{textAlign:"center",fontWeight:"700"}}>Subject</Typography>
        <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1 },
          display: "flex",
          flexDirection: "column",
          width: "100%",
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
        Edit subject
      </Typography>:<Typography
        variant="h4"
        sx={{ textAlign: "center", fontWeight:700}}
      >
        Add New subject
      </Typography>}

        <TextField
          name="subject_name"
          label="Subject Name "
          value={Formik.values.subject_name}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.subject_name && Formik.errors.subject_name && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {Formik.errors.subject_name}
          </p>
        )}

        <TextField
          name="subject_codename"
          label="Subject Codename"
          value={Formik.values.subject_codename}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
        />
        {Formik.touched.subject_codename && Formik.errors.subject_codename && (
          <p style={{ color: "red", textTransform: "capitalize" }}>
            {Formik.errors.subject_codename}
          </p>
        )}
 
       <Button sx={{width:'120px'}} type="submit" variant="contained">
          Submit
        </Button>

        {edit &&
        <Button sx={{width:'120px'}} onClick={()=>{cancelEdit()}} type="button" variant="outlined">
          Cancle
        </Button>}
      </Box>

      <Box component={'div'} sx={{display:"flex",flexDirection:"row",flexWrap:'wrap'}}>
       {subjects && subjects.map(x=>{
        return(<Paper key={x._id} sx={{m:2,p:2}}>
         <Box component={'div'}><Typography variant="h5">Subject:{x.subject_name} [{x.subject_codename}]</Typography></Box>
         <Box component={'div'}>
          <Button onClick={()=>{handleEdit(x._id,x.subject_name, x.subject_codename)}}><EditIcon/></Button>
          <Button onClick={()=>{handleDelete(x._id)}} sx={{color:"red"}}><DeleteIcon/></Button>
         </Box>
          </Paper>)
       })}
      </Box>
       
        </>
    )
}
        
    
