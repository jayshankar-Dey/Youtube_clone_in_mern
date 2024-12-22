/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import Navbar from "../Navbar/Navbar"
import SideBar from "../Navbar/SideBar"
import {Drawer} from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import {setChange} from '../redux/ChangeSlice'
import {toast} from 'react-toastify'
import axios from "axios"

import { Link } from "react-router-dom"
import Watch_later_Video from "../components/Watch_later_Video"
const Watch_Later = () => {
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
          const res=await axios.get(`${base}/get/watchlater`,{
            headers:{
                Authorization:`Bearer ${token}`
              }
          })
          setVedios(res.data.Vedio)
         // console.log(res.data)
        } catch (error) {
          toast.error("error fetching history")
        }
      }
      fetchVedios()
    },[change])
  ///delete vedio
  const delete_watch_later=async(id)=>{
    try {
       // console.log(id)
      const res=await axios.post(`${base}/delete/watchlater/${id}`,{token},{
        headers:{
            Authorization:`Bearer ${token}`
        }
      })
      if(res.data.success){
        //toast.success("Like video deleted successfully")
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
      <div className="text-zinc-300 flex lg:justify-between p-2 lg:gap-x-4 lg:flex-row    flex-col">
     {vedios?.length>0&& <div style={{backgroundColor: "#acabb0",
backgroundImage: "linear-gradient(315deg, #acabb0 0%, #e01c34 74%)"}} className="lg:w-96 lg:border rounded-tl-xl rounded-tr-xl border-zinc-800 ">

<div className="w-44 md:w-52  min-h-52 bg-zinc-900   rounded overflow-hidden mx-auto mt-2">
          {
           <Link to={`/single/vedio/${vedios[0]?._id}`}>
            {
                 vedios[0]?.image?<img className="h-full w-full object-cover" src={vedios[0]?.image?.url}></img>:<video src={vedios[0]?.vedio?.url} ></video>
            }
            </Link>
          }
    </div>
    <h1 className="text-2xl text-white font-bold mt-4 px-2">Watch Later</h1>
   <h1 className="px-2 text-white font-semibold ">{vedios[0]?.name}</h1>
    <div className="flex flex-col p-3">
    <Link to={`/Channel`} className="font-semibold text-white">{user?.name}</Link>
   <span className="text-sm"> {vedios?.length} videos </span>
    </div>
</div>}
      <div className=" flex flex-col gap-y-2 md:p-3  p-1 lg:w-[50rem] overflow-scroll">
        {vedios.length==0&&<h1 className="text-red-500 animate-bounce mt-10 font-semibold p-3">No Videos..</h1>}
        {
            vedios?.map((data,i)=>(
                <Watch_later_Video key={i} vedio={data} delete_watch_later={delete_watch_later}/>
            ))
        }
       </div>
      </div>
      {/* end //vedios */}


       </div>
    </div>
  )
}

export default Watch_Later
