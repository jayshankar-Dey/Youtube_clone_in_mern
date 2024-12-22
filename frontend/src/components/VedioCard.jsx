/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {setChange} from '../redux/ChangeSlice'
import {toast} from 'react-toastify'
import axios from "axios"
import { useState } from "react"
import { Drawer } from "@mui/material"
import Share from "./Share"


const VedioCard = ({vedio}) => {
 console.log(vedio)
  const dispatch=useDispatch() 
  const{user}=useSelector(state=>state.user)
  // eslint-disable-next-line no-unused-vars
    const{change}=useSelector(state=>state.change)
     const token=localStorage.getItem("yo")
    const base="http://localhost:8000/api"
   const[Like,setLiKe]=useState(vedio?.Like?vedio?.Like:[])
   const[disLike,setdLiKe]=useState(vedio?.disLike?vedio?.disLike:[])
const[share,setShare]=useState(false)

    ///like image
    const likeImage=async()=>{
        try {
          if(!localStorage.getItem("yo") && !user)return toast.warning("login is required")
          // eslint-disable-next-line no-unused-vars
         if(Like.includes(user?._id)){
          setLiKe((prev)=>[prev!=user?._id])
          setdLiKe((prev)=>[prev!=user?._id])
         }else{
          setLiKe((prev)=>[...prev,user?._id])
          setdLiKe((prev)=>[prev!=user?._id])
         }
          const id=vedio?._id
            const res=await axios.post(`${base}/Like/${id}`,{token},{
              headers:{
                Authorization:`Bearer ${token}`
              }
            })
            
            if(res.data.success){
                //toast.success(res.data.message)
                //dispatch(setChange(res.data))
               // console.log(res.data)
            }
            //console.log(res.data)
        } catch (error) {
            toast.error(error.response?.data.message)
        }
    }

     ///like image
     const dislikeImage=async()=>{
      try {
        if(!localStorage.getItem("yo") && !user)return toast.warning("login is required")
          if(disLike.includes(user?._id)){
            setLiKe((prev)=>[prev!=user?._id])
            setdLiKe((prev)=>[prev!=user?._id])
          }else{
            setLiKe((prev)=>[prev!=user?._id])
            setdLiKe((prev)=>[...prev,user?._id])
          }
                
        const id=vedio?._id
          const res=await axios.post(`${base}/disLike/${id}`,{token},{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
          
          if(res.data.success){
             // toast.success(res.data.message)
             // dispatch(setChange(res.data))
          }
          //console.log(res.data)
      } catch (error) {
          toast.error(error.response?.data.message)
      }
  }
  return (
    <div>
    {vedio?.isimage?<div className="sm:w-96 h-fit cursor-pointer  p-1 border border-zinc-900  rounded shadow">
       
       <div  className=" h-80 md:h-52 w-full p-1">
            <img className="w-full h-full object-cover object-center" src={vedio?.image?.url} ></img>
       </div>
     
       <div>

        <div className="flex pt-3 gap-x-2 ">
            <Link to={`${localStorage.getItem("yo")?`/Channel/${vedio?.user}`:""}`}>
            <img src={vedio?.profile} alt="" className=" w-10 h-10 rounded-full object-center"/>
            </Link>
            <span className="ml-2 text-zinc-200 font-semibold  text-lg  w-72"> {vedio?.text}</span>
        </div>
        <div className="p-1 pl-12 flex flex-col justify-start gap-x-2 text-zinc-400">
            <Link to={`${localStorage.getItem("yo")?`/Channel/${vedio?.user}`:""}`} className="flex  items-center gap-x-2 text-sm">{vedio?.username}<ion-icon name="checkmark-circle-outline"></ion-icon></Link>
           <div className="flex  gap-x-4 text-sm">
           <h1 className="mt-2">{vedio?.createdAt.split("T")[0]}</h1>
           </div>
           <div className="text-white py-2 flex  gap-x-3 text-xl items-center ">
           {Like?.includes(user?._id)?<button  onClick={likeImage} className="py-1 relative px-2 rounded text-blue-600"><ion-icon name="thumbs-up"></ion-icon></button> :<button onClick={likeImage} className="py-1 px-2 relative rounded"><ion-icon name="thumbs-up-outline"></ion-icon></button>
            }
            {disLike?.includes(user?._id)?<button onClick={dislikeImage} className={`text-red-600 py-1 relative px-2 rounded `}><ion-icon name="thumbs-down"></ion-icon></button>:<button onClick={dislikeImage} className=" relative py-1 px-2 rounded"><ion-icon name="thumbs-down-outline"></ion-icon></button>}
            
            {/* <button className=" py-1 px-2 rounded"><ion-icon name="chatbox-ellipses-outline"></ion-icon></button> */}

            <button onClick={()=>setShare(!share)} className=" py-1 px-2 rounded"><ion-icon name="arrow-redo-outline"></ion-icon></button>
    
           </div>
        </div>

        <Drawer onClose={()=>setShare(!share)} open={share} anchor="bottom">
              <div className="w-full flex justify-center *:gap-x-4  p-2 bg-[#252525] h-52">
                   <div className="p-2  text-white h-fit flex text-lg">
                      <Share url={window.location.href}/>
                   </div>
              </div>
              </Drawer>
       </div>
      {/* //////playlist /////////////////////////////////////////////*/}
    </div>:<>
    {vedio?.playlists?<div className="md:w-96 w-full overflow-hidden h-fit cursor-pointer  p-1    rounded shadow">
       <Link  to={`/Playlist/Videos/${vedio?._id}`} >
       <div  className="h-52 relative  w-full p-1">
            {
              vedio?.image?<img className="w-full h-full object-cover object-center" src={vedio?.image?.url} ></img>:<img className="w-full h-full rounded-tl-3xl  rounded-tr-3xl object-cover object-center" src={"https://cdn.pixabay.com/photo/2015/06/24/02/12/the-blurred-819388_1280.jpg"} ></img>
            }
            <div className="absolute  border border-zinc-700 rounded z-20 bottom-0 left-0 bg-zinc-800 flex justify-center items-center gap-x-2 text-zinc-200 lg:text-xl w-full h-20">
                <h1><ion-icon name="play"></ion-icon></h1>
                <h1>Playlist</h1>
            </div>
       </div>
       </Link>
       <div>

        <div className="flex pt-3 gap-x-2 ">
            <Link to={`${localStorage.getItem("yo")?`/Channel/${vedio?.user}`:`${vedio?.playlists?`/Playlist/Videos/${vedio?._id}`:`/single/vedio/${vedio?._id}`}`}`}>
            <img src={vedio?.profile} alt="" className=" w-10 h-10 rounded-full object-center"/>
            </Link>
            <span className="ml-2 text-zinc-200 font-semibold  text-lg  w-72"> {vedio?.name}</span>
        </div>
        <div className="p-1 pl-12 flex flex-col justify-start gap-x-2 text-zinc-400">
            <Link to={`${localStorage.getItem("yo")?`/Channel/${vedio?.user}`:`/single/vedio/${vedio?._id}`}`} className="flex  items-center gap-x-2 text-sm">{vedio?.username} <ion-icon name="checkmark-circle-outline"></ion-icon></Link>
           <div className="flex  gap-x-4 text-sm">
           <h1>120k Views</h1>
           <h1>{vedio?.createdAt.split("T")[0]}</h1>
           </div>
        </div>

       </div>
       {/* //////vedios /////////////////////////////////////////////*/}
    </div>:<div className="md:w-96 w-full h-fit cursor-pointer  p-1  border-zinc-200  rounded shadow">
       <Link  to={`/single/vedio/${vedio?._id}`} >
       <div  className="h-52  w-full p-1">
            {
              vedio?.image?<img className="w-full h-full object-cover object-center" src={vedio?.image?.url} ></img>:<video    className="w-full h-full object-cover object-center" src={vedio?.vedio?.url}  muted></video>
            }
       </div>
       </Link>
       <div>

        <div className="flex pt-3 gap-x-2 ">
            <Link to={`${localStorage.getItem("yo")?`/Channel/${vedio?.user}`:`/single/vedio/${vedio?._id}`}`}>
            <img src={vedio?.profile} alt="" className=" w-10 h-10 rounded-full object-center"/>
            </Link>
            <span className="ml-2 text-zinc-200 font-semibold  text-lg  w-72"> {vedio?.name}</span>
        </div>
        <div className="p-1 pl-12 flex flex-col justify-start gap-x-2 text-zinc-400">
            <Link to={`${localStorage.getItem("yo")?`/Channel/${vedio?.user}`:`/single/vedio/${vedio?._id}`}`} className="flex  items-center gap-x-2 text-sm">{vedio?.username} <ion-icon name="checkmark-circle-outline"></ion-icon></Link>
           <div className="flex  gap-x-4 text-sm">
           <h1>120k Views</h1>
           <h1>{vedio?.createdAt.split("T")[0]}</h1>
           </div>
        </div>

       </div>
      
    </div>}</>}
    </div>
  )
}

export default VedioCard
