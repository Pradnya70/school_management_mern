import { useEffect, useState,useRef } from "react";
import { baseApi } from "../../../environment";
import axios from "axios";
import { Box, Button, Typography, CardMedia } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import TextField from "@mui/material/TextField";
import MessageSnackbar from "../../../basic utility components/snackbar/MessageSnackbar";


export default function Dashboard() {
  const [school, setSchool] = useState(null);
  const [schoolName, setSchoolName] = useState(null);
  const [edit,setEdit]= useState(false);
//   console.log(school);
  // console.log(school.school_image)

  //image handling
   const [file, setfile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const addImage = (event) => {
      const file = event.target.files[0];
      setImageUrl(URL.createObjectURL(file));
      setfile(file);
    };
  
    //resetting image
    const fileInputRef = useRef(null);
    const handleClearFile = () => {
      if(fileInputRef.current){
          fileInputRef.current.value = '';
      }
      setfile(null);
      setImageUrl(null);
    }
  
//message
const [message, setMessage]= useState('');
  const [messageType, setMessageType]= useState('sucess')
  const handleMessageClose = () => {
    setMessage('');
  }

    const handleEditSubmit=()=>{
      const fd = new FormData();
      fd.append("school_name",schoolName)
      if(file){
        fd.append("image",file,file.name)
      }
      axios.patch(`${baseApi}/school/update`,fd).then(resp=>{
        setMessage(resp.data.message)
        setMessageType('success')
        cancleEdit();
        handleClearFile();
    }).catch(e=>{
        setMessage(e.response.data.message)
        setMessageType('error')
        console.log("Error",e)
      })
    }  

    const cancleEdit=()=>{
        setEdit(false);
        handleClearFile();
    }

  const fetchSchool = () => {
    axios
      .get(`${baseApi}/school/fetch-single`)
      .then((resp) => {
        setSchool(resp.data.school);
        setSchoolName(resp.data.school.school_name);
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };

  useEffect(() => {
    fetchSchool();
  }, [message]);

  return (
    <>
      <h1>Dashboard</h1>
      {message && (
              <MessageSnackbar
                message={message}
                type={messageType}
                handleClose={handleMessageClose}
              />
            )}
      {message &&
          <MessageSnackbar message={message} type={messageType} handleClose={handleMessageClose}  />
        }
      {edit &&
      <>
      
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
               label="School Name"
               value={schoolName}
               onChange={
                (e)=>{
                    setSchoolName(e.target.value);
                }
               }
             />
             <Button variant="contained" onClick={handleEditSubmit}>Submit Edit</Button>
             <Button variant="outlined" onClick={cancleEdit}>Cancel</Button>
             </Box>


      </>
      }
      {school && (
        <Box
          sx={{
            position:'relative',
            height: "500px",
            width: "100%",
            backgroundImage:`url("public/images/uploaded/school/${school.school_image}")`,
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3">{school.school_name}</Typography>
          <Box component={'div'} sx={{position:'absolute', bottom:"10px", right:"10px", height:'50px', width:'50px'}}>
          <Button variant="outlined" sx={{background:'white', borderRadius:'50%',color:'black',height:'60px'}} onClick={()=>{
            setEdit(true)
          }} ><EditIcon/></Button> 
          </Box>
        </Box>
      )}
    </>
  );
}
