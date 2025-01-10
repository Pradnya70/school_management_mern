import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({children,allowedRoles=[]}){
    const {user, authenticated}= useContext(AuthContext)
     const [checked, setChecked] = useState(false);

     useEffect(()=>{
         setChecked(true)
     },[])



    if(checked && !authenticated) return <Navigate to={'/login'}></Navigate>
    // <Navigate to={'/login'}/>

    if( checked && allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to={"/login"} />

    if(checked){
        return children;
    }
}