import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import React from 'react';
import axios from 'axios';


export default function Gallery() {
    const [open, setOpen] = React.useState(false);
    const [selectedSchool, setSelectedSchool] = React.useState(null);
    const [schools,setSchools] = React.useState([])

    const handleOpen = (school) => {
        setOpen(true)
        setSelectedSchool(school)
    }
    const handleClose = () => {
        setOpen(false)
        setSelectedSchool(null)
        }

    

React.useEffect(()=>{
    axios
    .get(`http://localhost:5000/api/school/all`).then((resp) => {
     console.log("School",resp)
     setSchools(resp.data.schools)
    //   setMessage(resp.data.message);
    //   setMessageType("success");
    //   Formik.resetForm();
    })
    .catch((e) => {
    //   setMessage(e.response.data.message);
    //   setMessageType("error");
      console.log("Error", e);
    })
    },[]);



  return (
    <Box>
    <ImageList sx={{ width: '100%', height: 'auto' }}>
      {schools.map((school) => (
        <ImageListItem key={school.school_image}>
          <img
            srcSet={`./images/uploaded/school/${school.school_image}?w=248&fit=crop&auto=format&dpr=2 2x`}
         
            src={`./images/uploaded/school/${school.school_image}?w=248&fit=crop&auto=format`}
            alt={school.title}
            loading="lazy"
            onClick={()=>{handleOpen(school)}}
          />

console.log(`./images/uploaded/school/${school.school_image}`)

          <ImageListItemBar
            title={school.school_name}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
       
      >
        <Box component={'div'}  sx={{postion:'absolute',top:'50%',left:'50%', transform:'translate(-50%,-50%)',
            //  background:'#fff',
            padding:'10px',
            border:'none',
            outline:'none'
        }} >
          
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {selectedSchool && selectedSchool.school_name}
          </Typography>
          <img
            // srcSet={`./images/uploaded/school/${selectedSchool && selectedSchool.school_image}`}
            src={selectedSchool && `./images/uploaded/school/${selectedSchool.school_image}`}
            style={{maxHeight:"80vh"}}
            alt={"alt"}
           
          />
        </Box>
      </Modal>

    </Box>
  );
}

