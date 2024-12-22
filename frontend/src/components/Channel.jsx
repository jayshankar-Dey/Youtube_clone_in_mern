/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import Home from "../components/Home_Vedio"
import Vedios from "../components/Profile_Vedios"
import Community from "../components/Community"
import axios from "axios"
import {useParams} from 'react-router-dom'
import {Button, CircularProgress, Dialog, LinearProgress, TextField} from "@mui/material"
import{useDispatch,useSelector} from "react-redux"
import {setChange} from '../redux/ChangeSlice'
import {toast} from 'react-toastify'
const Channel = () => {
  const dispatch=useDispatch() 
  const{id}=useParams()
  const{user}=useSelector(state=>state.user)
  const{change}=useSelector(state=>state.change)
  const[loading,setLoading]=useState(false)
  const[num,setNum]=useState(1)
  const[open,setopen]=useState(false)
  const[name,setName]=useState("")
  const [des,setDes]=useState("")
  const[profile,setProfile]=useState({})
  const[community,setCommunity]=useState([])
  const[Change,setchange]=useState("")
  const[vedios,setVedios]=useState([])
  const[home,setHome]=useState([])
  dispatch(setChange(id))
 // const [file,setFile]=useState("")
    const list=[
        {
            name:"Home"
        },
        {
            name:"Videos"
        },
        {
            name:"Community"
        }
    ]

    const token=localStorage.getItem("yo")
    const base="http://localhost:8000/api"

    ///get user profile
   const getUser=async()=>{
   try {
      let res;
      if(id){
        res=await axios.get(`${base}/get_user/${id}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
      })
      }else{
        res=await axios.get(`${base}/get_user`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
      })
      }
     
      setProfile(res.data.user)
   } catch (error) {
      localStorage.removeItem("yo")
   }
   }
  
  useEffect(()=>{
      getUser()
  },[change,id])

  //add value
  const addValue=async()=>{
  setName(profile?.name)
  setDes(profile?.des)
  }

  
  ///update profile
  const updateProfile=async(e)=>{
    e.preventDefault()
  try {
    //const id=profile?._id
    setLoading(true)
      const res=await axios.put(`${base}/update`,{
          name,
          des
      },{
          headers:{
            Authorization:`Bearer ${token}`
          }
      })
      dispatch(setChange(res.data))
      if(res.data.success){
        toast.success(res.data.message)
        setopen(false)
        setLoading(false)
      }
      //console.log(res.data)
   } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
   }
  }

  //handleProfile_pic
  const handleProfile_pic=async(e)=>{
    const file=e.target.files[0]
   // console.log(file)
    setLoading(true)
    try {
      const formData=new FormData()
      formData.append("file",file)
      const res=await axios.put(`${base}/updatePic`,formData,{
          headers:{
            Authorization:`Bearer ${token}`,
            'Content-Type':'multipart/form-data'
          }
      })
      dispatch(setChange(res.data))
      toast.success(res.data.message)
      setLoading(false)
   } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
   }
  }

  console.log(user)

  ///get Comunity photo
  const getCommunityPhoto=async()=>{
    try {
      let res;
      if(id){
       res =await axios.get(`${base}/getImage/${id}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
      }else{
        res =await axios.get(`${base}/getImage`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
      }
      setCommunity(res.data.data)
   } catch (error) {
      toast.error(error.response.data.message)
   }
  }

  ///get vedios 
  const getVedios=async()=>{
    try {
      let res;
      if(id){
       res =await axios.get(`${base}/get_Profile_Vedio/${id}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
      }else{
       res =await axios.get(`${base}/get_Profile_Vedio`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
      }
   setVedios(res.data.data)
   } catch (error) {
      toast.error(error.response.data.message)
   }
  }
  ///get video and image
  const get_Vedios_and_image=async()=>{
    try {
      let res;
      if(id){
       res =await axios.get(`${base}/profile_Video_Photo/${id}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
      }else{
       res =await axios.get(`${base}/profile_Video_Photo`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
      }
   setHome(res.data.vedio)
   } catch (error) {
      toast.error(error.response.data.message)
   }
  }
  useEffect(() => {
   getCommunityPhoto()
   getVedios()
   get_Vedios_and_image()
  }, [Change,change,id,num])
 // console.log(profile)

  ////Subscribe
  const SubscribeChennal=async(id)=>{
    if(!localStorage.getItem("yo") && user)return toast.warning("Login is required")
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
    if(!localStorage.getItem("yo") && user)return toast.warning("Login is required")
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
  return (
    <>

    <div className="w-full text-zinc-200 h-full overflow-scroll">

      <div className="flex sm:flex-row flex-col justify-center  items-center gap-x-5 gap-y-2 sm:px-16 p-5">
         <div className="rounded-full cursor-pointer group relative overflow-hidden md:h-52 md:w-52 h-28 w-28">

         {
          profile?.profile?<img src={profile?.profile?.url} alt="" className=" md:h-52 md:w-52 h-28 w-28 object-cover object-center" />:<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCvFCNx3XOOU9GirFqWfVMedEN_EIzJS-aKg&s" alt="" className=" md:h-52 md:w-52 h-28 w-28" />
         }
         {loading&&<div className="absolute flex justify-center items-center top-0 left-0 h-full w-full z-30 bg-[#5050504f]">
          <CircularProgress/>
         </div>}
        {  profile?._id==user?._id&&<div className="absolute w-full hidden h-full group-hover:flex justify-center items-center z-20 bg-[#31313172] top-0 left-0">
            <label htmlFor="file" className="text-2xl cursor-pointer"><ion-icon name="camera-outline"></ion-icon></label>
            <input type="file" onChange={handleProfile_pic} className="hidden" id="file" />
         </div>}
         </div>
         <div className="flex flex-col gap-y-2 sm:w-[70%]">
           <div className="flex justify-between">
           <h1 className="text-2xl md:text-4xl font-bold">{profile?.name}</h1>
           <button type="button" onClick={()=>{
            setopen(!open)
            addValue()
           }}><ion-icon name="create-outline"></ion-icon></button>
           <Dialog open={open}>
              <form onSubmit={updateProfile} className="bg-zinc-900 *:text-zinc-300 *:border-zinc-400 p-3 border border-zinc-800 rounded w-96 shadow">
                <div>
                  <button type="button" onClick={()=>setopen(!open)} className="float-end text-red-500"><ion-icon name="close-circle-outline"></ion-icon></button>
                </div>
                 <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" className="bg-transparent outline-none p-2 border-b w-full  "/>
                 <textarea value={des} onChange={(e)=>setDes(e.target.value)}  placeholder="Description.." rows={8} className="bg-transparent outline-none rounded my-3 p-2 border w-full">
                 </textarea>
                {
                  loading?  <LinearProgress color="success" />: <Button type="submit" variant="contained" color="success" className="float-end">Update</Button>
                }
              </form>
           </Dialog>
           </div>
            <h3 className="text-sm text-zinc-400"><span>@{profile?.name}</span> <span>subscribers</span><span>•{vedios?.length} videos</span></h3>

            <h3 className="text-sm text-zinc-300">{profile?.des}</h3>

           { profile?._id==user?._id?<button className="bg-zinc-900 p-2 rounded-full border border-zinc-800 sm:w-44" >{user?.subscribers?.length} subscribers</button>:<>

           {profile?.subscribers?.includes(user?._id)?<button onClick={()=>UnsubscribeChennal(profile?._id)} className="md:w-44 md:h-12 font-semibold  mt-3 p-2 px-5 bg-zinc-900 border border-zinc-800 rounded-full shadow-md shadow-zinc-800">Subscribed</button>:<button onClick={()=>SubscribeChennal(profile?._id)} className="md:w-44 md:h-12 font-semibold  mt-3 p-2 px-5 bg-red-600 border border-zinc-800 rounded-full shadow-lg shadow-zinc-800">Subscribe</button>}

           </>}
         </div>
      </div>
      <div className="border-b border-zinc-700 md:pt-14 ">
        <div className=" sm:w-[60%] mx-auto flex gap-x-7 *:p-3">
           {
                list.map((name,i)=>(
                    <div key={i} className={`${num==i+1&&"border-b-2"}`}>
                        <button onClick={()=>{
                            setNum(i+1)
                        }}>{name.name}</button>
                    </div>
                ))
           }
        </div>
      </div>
      
      
     {(()=>{

                switch(num){
                    case 1:
                    return <Home home={home}/>;
                    case 2:
                    return <Vedios vedios={vedios}/>;
                    case 3:
                    return <Community community={community} setchange={setchange}/>;
                    default: return "Not return"
                }

     })()}



















    </div>
      
    </>
  )
}

export default Channel
