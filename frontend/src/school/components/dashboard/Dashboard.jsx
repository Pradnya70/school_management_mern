import { useEffect, useState } from "react";
import { baseApi } from "../../../environment";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Dashboard() {
  const [school, setSchool] = useState(null);
//   console.log(school);

  // console.log(school.school_image)

  const fetchSchool = () => {
    axios
      .get(`${baseApi}/school/fetch-single`)
      .then((resp) => {
        // console.log(resp)
        setSchool(resp.data.school);
        // console.log(resp.data.school)
      })
      .catch((e) => {
        console.log("Error", e);
      });
  };

  useEffect(() => {
    fetchSchool();
  }, []);

  return (
    <>
      <h1>Dashboard</h1>
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
          <Box component={'div'} sx={{position:'absolute', bottom:"10px", right:"10px", height:'50px',background:'red', width:'50px'}}>
           <EditIcon/>
          </Box>
        </Box>
      )}
    </>
  );
}
