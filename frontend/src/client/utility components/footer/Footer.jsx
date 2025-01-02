
import {Box, Typography} from "@mui/material"

export default function Footer(){
    return(
        <>
        <Box sx={{display:"flex", flexDirection:"column",justifyContent:"center",alignItems:"center"}} component={'div'}>
            <Typography variant="h6">School Management System</Typography>

            <Typography variant="p">Copyright@2024</Typography>

        </Box>
        </>
    )
}