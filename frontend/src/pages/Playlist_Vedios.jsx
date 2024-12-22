//Playlist_Vedios

/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import Navbar from "../Navbar/Navbar"
import SideBar from "../Navbar/SideBar"
import {Dialog, Drawer} from "@mui/material"
import Vedios from "../components/Vedios"
import Filter from "../components/Filter"
import { useSearchParams } from "react-router-dom"
import AllFilter from "../components/AllFilter"
import { useDispatch, useSelector } from "react-redux"
import {setChange} from '../redux/ChangeSlice'
import {toast} from 'react-toastify'
import axios from "axios"
import Playlist from "../components/Playlist"
const Playlist_Vedios = () => {
    const [open,setOpen]=useState(true)
    const[sidebar,setSidebar]=useState(false)
    const [vedios,setVedios]=useState([])
    const dispatch=useDispatch() 
  const{user}=useSelector(state=>state.user)
  // eslint-disable-next-line no-unused-vars
    const{change}=useSelector(state=>state.change)
     const token=localStorage.getItem("yo")
    const base="http://localhost:8000/api"
    //console.log(query)

    ////get vedio and photo

    useEffect(() => {
      const getVedio_And_Photo=async()=>{
        try {
           
            const res=await axios.get(`${base}/Subscription`,{
              headers:{
                Authorization:`Bearer ${token}`
              }
            })
            setVedios(res.data.Vedio)
              // console.log(res.data)
      
        } catch (error) {
          toast.error("Failed to get vedios and photos")
          console.log(error)
        }
      }
      getVedio_And_Photo()
    }, [change])

   
   
  return (
    <div className="h-screen flex flex-col w-full bg-zinc-950 overflow-scroll">
       <Navbar single={false} setOpen={setOpen} open={open}  setSidebar={setSidebar} sidebar={sidebar}/>
       
       <div className="h-[92vh] w-full flex gap-x-2">
       <div className="h-full hidden lg:block ">
       <SideBar open={open}/>
       </div>
       
       <Drawer className="lg:hidden block" open={sidebar} onClose={()=>{setSidebar(!sidebar)}}>
       <div className=" h-full ">
       <SideBar open={open}/>
       </div>
       </Drawer>
     {/* //vedios */}
       <div className="w-full">

           <Playlist/>

       </div>
      {/* end //vedios */}


       </div>
    </div>
  )
}

export default Playlist_Vedios
