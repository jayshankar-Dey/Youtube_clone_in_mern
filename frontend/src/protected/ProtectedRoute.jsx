/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {  useDispatch, useSelector } from "react-redux"

import { Navigate } from "react-router-dom"
import { toast } from "react-toastify"
//import {islogin} from '../redux/LoginSlice'
const ProtectedRoute = ({children}) => {
  const{user}=useSelector(state=>state.user)
 // const dispatch=useDispatch()
  if(user && localStorage.getItem("yo")){
    return children
  }else{
   toast.warning("Login is required")
   // dispatch(islogin(true))
    return <Navigate to={'/'}/>
  }
}

export default ProtectedRoute
