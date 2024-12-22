/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import SideVedios from "./SideVedios"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Link, useSearchParams } from "react-router-dom"
import {toast} from 'react-toastify'
import {setChange} from '../redux/ChangeSlice'
import {islogin} from '../redux/LoginSlice'
import {Drawer} from '@mui/material'

import Share from "./Share"
const SingleVedio = ({id}) => {
  
  const [search]=useSearchParams()
    const value=String(search.get("q"))
  //console.log(value)
    const[readMore,setReadMore]=useState(false)
    const[video,setVideo]=useState({})
    const[sideVedio,setSideVedio]=useState([])
    const dispatch=useDispatch() 
    const{user}=useSelector(state=>state.user)
    const[share,setShare]=useState(false)
    // eslint-disable-next-line no-unused-vars
      const{change}=useSelector(state=>state.change)
       const token=localStorage.getItem("yo")
      const base="http://localhost:8000/api"
    useEffect(()=>{
      const fetchVideo=async()=>{
        try {
          const res=await axios.get(`${base}/home/${id}?value=${value !='null'?value:""}`)
          setVideo(res.data.vedio)
          setSideVedio(res.data.search)
        } catch (error) {
          console.error(error)
        }
      }
      fetchVideo()
    },[id,change,value])
   // console.log(user,video)


    ////Subscribe
    const SubscribeChennal=async(id)=>{
      if(!localStorage.getItem("yo") && user) return toast.warning("Login is required")
      try {
        const res=await axios.post(`${base}/Subscribe/${id}`,{token},
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )
      if(res.data.success){
        toast.success(res.data.message)
        dispatch(setChange(res.data))
      }else{
        toast.error(res.data.message)
      }
      } catch (error) {
        toast.error("Unable to subscribe")
      }
    }

    
    ////Un subscribe
    const UnsubscribeChennal=async(id)=>{
      if(!localStorage.getItem("yo") && user) return toast.warning("Login is required")
      try {
        const res=await axios.post(`${base}/Unsubscribe/${id}`,{token},
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )
      if(res.data.success){
        toast.success(res.data.message)
        dispatch(setChange(res.data))
      }else{
        toast.error(res.data.message)
      }
      } catch (error) {
        toast.error("Unable to Un subscribe")
      }
    }

    const likeVedio=async()=>{
      try {
        if(!localStorage.getItem("yo") && !user)return toast.warning("login is required")
        // eslint-disable-next-line no-unused-vars
          const res=await axios.post(`${base}/Like/${id}`,{token},{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
          
          if(res.data.success){
             // toast.success(res.data.message)
              dispatch(setChange(res.data))
          }
          //console.log(res.data)
      } catch (error) {
          toast.error(error.response?.data.message)
      }
  }

   ///like image
   const dislikeVedio=async()=>{
    try {
      if(!localStorage.getItem("yo") && !user)return toast.warning("login is required")

        const res=await axios.post(`${base}/disLike/${id}`,{token},{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        
        if(res.data.success){
           // toast.success(res.data.message)
            dispatch(setChange(res.data))
        }
        //console.log(res.data)
    } catch (error) {
        toast.error(error.response?.data.message)
    }
}

///views user
    const viewUser=async()=>{
      try {
        if(localStorage.getItem("yo") &&user){
          const res=await axios.post(`${base}/views/${id}`,{
            token
          },{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
          //console.log(res.data)
          if(res.data.success){
            dispatch(setChange(res.data))
           // console.log(res.data)
          }
        }
        
      } catch (error) {
        toast.error(error.response?.data.message)
      }
    }
//console.log(video)

/////watchlater
    const addToWatchlater=async()=>{
      if(!localStorage.getItem("yo") && !user) return toast.warning("Login is required")
      try {
        const res=await axios.post(`${base}/watchlater/${id}`,{token},
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )
      if(res.data.success){
        console.log(res.data)
        toast.success(res.data.message)
        dispatch(setChange(res.data))
      }else{
        toast.error(res.data.message)
      }
      } catch (error) {
        toast.error("Unable to add to watchlater")
      }
    }
    /////delete watchlater
    const DeleteToWatchlater=async()=>{
      if(!localStorage.getItem("yo") && !user) return toast.warning("Login is required")
      try {
        const res=await axios.post(`${base}/delete/watchlater/${id}`,{token},
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      )
      if(res.data.success){
        console.log(res.data)
        toast.success(res.data.message)
        dispatch(setChange(res.data))
      }else{
        toast.error(res.data.message)
      }
      } catch (error) {
        toast.error("Unable to delete to watchlater")
      }
    }
  return (
    <div className=' h-[91vh] overflow-scroll flex lg:flex-row flex-col'>
  
  <div className='lg:w-[70%] h-fit border  border-b md:border-r border-zinc-800 flex flex-col p-3 bg-zinc-900'>
     <div className='md:h-[40rem] w-full '>
     <video onPlay={()=>{
      setTimeout(() => {
        viewUser()
      }, 2000);
     }} src={video?.vedio?.url} className="w-full h-full object-cover object-center" controls>
   </video>
     </div>
      <div className='p-2 md:pl-6 md:pr-14 text-zinc-300 font-semibold text-lg md:text-2xl'>
          <h1>{video?.name}</h1>
         <div className='flex lg:flex-row gap-y-5 flex-col items-baseline justify-between'>
         <div className='flex gap-x-3 pt-4 items-center'>
                {
                  video?.user?.profile? <img src={video?.user.profile.url} alt=""  className='h-12 rounded-full w-12'/>: <img src="https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg" alt=""  className='h-12 rounded-full w-12'/>
                }
                 <Link to={`${user && localStorage.getItem("yo")?`/Channel/${video?.user?._id}`:""}`} >
                   <h3 className='text-sm m-0'>{video?.user?.name}</h3>
                   <samp className='font-normal m-0 text-sm'>{video?.user?.subscribers?.length} Subscribus</samp>
                 </Link>
                 <div>
                   { video?.user?._id !== user?._id&&<>

                   {video?.user?.subscribers?.includes(user?._id)?<button className='bg-zinc-800 duration-300 hover:bg-zinc-700 shadow-md  shadow-zinc-700  w-32 h-10 p-2 text-sm px-5 rounded-full' onClick={()=>UnsubscribeChennal(video?.user?._id)} >Subscribed</button>:<button className='bg-red-600 duration-300 hover:bg-red-700 shadow-lg  shadow-zinc-700  w-32 h-10 p-2 text-sm px-5 rounded-full' onClick={()=>SubscribeChennal(video?.user?._id)}>Subscribe</button>}

                   </>}
                 </div>
          </div>

          <div className='flex gap-x-3'>
                <div className='bg-zinc-950 flex w-fit rounded-full md:px-3 h-10 items-center gap-x-4'>
                    {
                     video?.Like?.includes(user?._id)?<button onClick={likeVedio}  className='flex items-center text-blue-500  gap-x-2 border-r pr-3 border-zinc-500'><ion-icon name="thumbs-up"></ion-icon> <samp className='text-sm font-normal'>{video?.Like?.length}</samp></button>:<button onClick={likeVedio} className='flex items-center  gap-x-2 border-r pr-3 border-zinc-500'><ion-icon name="thumbs-up-outline"></ion-icon> <samp className='text-sm font-normal'>{video?.Like?.length}</samp></button>
                    }
                   {video?.disLike?.includes(user?._id)?<button onClick={dislikeVedio} className='flex text-red-500 gap-x-2'> <samp className='text-sm font-normal'>{video?.disLike?.length}</samp><ion-icon name="thumbs-down"></ion-icon></button>: <button onClick={dislikeVedio} className='flex  gap-x-2'> <samp className='text-sm font-normal'>{video?.disLike?.length}</samp><ion-icon name="thumbs-down-outline"></ion-icon></button>}
                </div>

                <div className='bg-zinc-950 flex w-fit rounded-full px-3 h-10 items-center gap-x-4'>
                    <button onClick={()=>setShare(!share)} className='flex items-center  gap-x-2'><ion-icon name="arrow-redo-outline"></ion-icon> <samp className='text-sm font-normal'>Share</samp></button>
                </div>
                {/* ///share//////////////////////////////// */}
                <Drawer onClose={()=>setShare(!share)} open={share} anchor="bottom">
              

              <div className="w-full flex justify-center *:gap-x-4  p-2 bg-[#252525] h-52">
                   <div className="p-2  text-white h-fit flex text-lg">
                      <Share url={window.location.href}/>
                   </div>
              </div>
              </Drawer>

                <div className='bg-zinc-950 flex w-fit rounded-full px-3 h-10 items-center gap-x-4'>
                 
                   {user?.Watch_Later?.includes(id)? <button onClick={DeleteToWatchlater}  className='flex items-center text-green-500  gap-x-2'><ion-icon name="save-outline"></ion-icon> <samp className='text-sm font-normal'>Watch later added</samp></button>:<button onClick={addToWatchlater} className='flex items-center  gap-x-2'><ion-icon name="save-outline"></ion-icon> <samp className='text-sm font-normal'>Watch later</samp></button>}
                </div>
          </div>
         </div>

         <div className={`p-2 mt-4 overflow-hidden bg-zinc-800 rounded flex flex-col gap-y-2 ${readMore?"h-fit":"h-26"} `}>
        
        <div className='flex gap-x-4 text-white text-sm'>
            <h1>{video?.view?.length} views</h1>
            <h1>3 Month ego</h1>
        </div>
        <div className='text-sm  text-zinc-300'>
            <p>{video?.text}</p>
            <div>
            <button onClick={()=>setReadMore(!readMore)} className={`text-blue-500 ${readMore&&"hidden"} float-end underline`}>Read more</button>
            </div>
        </div>
      </div>
    {/* ///comments */}
    <div className="w-full mt-2 p-2 flex flex-col gap-y-2">
      <h1 className="text-sm underline my-2 ">51 Comments</h1>

      <div className="flex gap-x-4 items-center">
      <img src="https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg" alt=""  className='h-12 rounded-full w-12'/>
      <input type="text" placeholder="Add comment.."  className="bg-transparent border-b w-full text-sm outline-none placeholder:text-sm border-zinc-600"/>
      <button><ion-icon name="send-outline"></ion-icon></button>
      </div>
    </div>


      </div>
  </div>
  <div className='lg:w-[30%]  flex-col gap-y-2 p-3   '>
    {
      sideVedio.length==0&&<h1>No vedio found...</h1>
    }
    {
      sideVedio.map((vedio)=>(
        <SideVedios key={vedio._id} video={vedio}/>
      ))
    }
    
  </div>
    </div>
  )
}

export default SingleVedio
