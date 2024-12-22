/* eslint-disable no-unused-vars */


import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Single_Vedio from "./pages/Single_Vedio"
import Your_Channel from "./pages/Your_Channel"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setData } from "./redux/UserSlice";
import { useEffect } from "react";
import ProtectedRoute from "./protected/ProtectedRoute";
import Watch_History from "./pages/Watch_History";
import Liked_Vedios from "./pages/Liked_Vedios";
import Watch_Later from "./pages/Watch_Later";
import Subscriptions from "./pages/Subscriptions";
import Playlist from "./pages/Playlist";
import Playlist_Vedios from "./pages/Playlist_Vedios";
import {io} from 'socket.io-client'
import { setSocket } from "./redux/Socket";
import { setChange } from "./redux/ChangeSlice";

const App = () => {
  const token=localStorage.getItem("yo")
  const base="http://localhost:8000/api"
 const dispatch=useDispatch()
 const{change}=useSelector(state=>state.change)
 const {user}=useSelector(state=>state.user)
  //console.log(user?._id)
  const socket=useSelector(state=>state.socket.socket)
 const getUser=async()=>{
 try {
   if(token){
    const res=await axios.get(`${base}/get_user`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
  })
  dispatch(setData(res.data.user))
   }
    //console.log(res.data)
 } catch (error) {
    localStorage.removeItem("yo")
 }
 }

 
useEffect(()=>{
    getUser()
},[change])

// const socket=io('http://localhost:8000',{query:{
//   id:user?._id
// }})
  //console.log(socket)

useEffect(() => {
  if(user){
    dispatch(setSocket(io('http://localhost:8000',{query:{
      id:user?._id
    }})))
  }
}, [user])


 

  return (
    <>
    <BrowserRouter>
    <ToastContainer/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/search" element={<Home/>}/>
      <Route path="/single/vedio/:id" element={<Single_Vedio/>}/>
      <Route path="/Channel/:id?" element={<ProtectedRoute><Your_Channel/></ProtectedRoute>}/>
      <Route path="/Watch/history" element={<ProtectedRoute><Watch_History/></ProtectedRoute>}/>
      <Route path="/Like/Videos" element={<ProtectedRoute><Liked_Vedios/></ProtectedRoute>}/>
      <Route path="/Watch_later/Videos" element={<ProtectedRoute><Watch_Later/></ProtectedRoute>}/>
      <Route path="/Subscription/Videos" element={<ProtectedRoute><Subscriptions/></ProtectedRoute>}/>
      <Route path="/Playlist" element={<ProtectedRoute><Playlist/></ProtectedRoute>}/>
      <Route path="/Playlist/Videos/:id" element={<Playlist_Vedios/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
