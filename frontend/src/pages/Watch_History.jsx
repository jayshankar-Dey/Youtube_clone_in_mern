/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import Navbar from "../Navbar/Navbar"
import SideBar from "../Navbar/SideBar"
import {Drawer} from "@mui/material"
import Filter from "../components/Filter"
import { useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {setChange} from '../redux/ChangeSlice'
import {toast} from 'react-toastify'
import axios from "axios"
import History_Video from "../components/History_Video"
const Watch_History = () => {
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

    useEffect(()=>{
      const fetchVedios=async()=>{
        try {
          const res=await axios.get(`${base}/getViews`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
          setVedios(res.data.views)
          //console.log(res.data)
        } catch (error) {
          toast.error("error fetching history")
        }
      }
      fetchVedios()
    },[change])
  ///delete vedio
const deleteHistory=async(id)=>{
    try {
      const res=await axios.delete(`${base}/delete/views/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
      })
      if(res.data.success){
        toast.success("History deleted")
        dispatch(setChange(!change))
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error("Failed to delete history")
    }
  
}
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
      <div className=" flex flex-col gap-y-2 md:p-3 overflow-scroll p-1 lg:w-[50rem] w-full">
        {vedios.length==0&&<h1 className="text-red-500 animate-bounce mt-10 font-semibold p-3">No history..</h1>}
        {
            vedios?.map((data,i)=>(
                <History_Video key={i} vedio={data} deleteHistory={deleteHistory}/>
            ))
        }
       </div>
      {/* end //vedios */}


       </div>
    </div>
  )
}

export default Watch_History
