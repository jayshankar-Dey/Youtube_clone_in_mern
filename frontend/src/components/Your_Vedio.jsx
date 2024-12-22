/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { setChange } from "../redux/ChangeSlice"
import { CircularProgress, Dialog, LinearProgress, TextField } from "@mui/material"
import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const Your_Vedio = ({vedio,vedioid}) => {
    const[menu,setMenu]=useState(false)
    const token=localStorage.getItem("yo")
    const base="http://localhost:8000/api"
    const{user}=useSelector(state=>state.user)
    const[popup,setPopup]=useState(false)
    const[name,setName]=useState("")
    const[text,setText]=useState("")
    const[loading,setLoading]=useState(false)
   const [file,setFile]=useState("")
   const[prevw,setPrevew]=useState("")
   // const{change}=useSelector(state=>state.change)
    const dispatch=useDispatch()
  // console.log(vedio)
   const getValue=async()=>{
        setName(vedio?.name)
        setText(vedio?.text)
   }
   ///update vedio
   const handelSubmit=async(e)=>{
    e.preventDefault()
    try {
        setLoading(true)
        const id=vedio._id
        const res=await axios.put(`${base}/update_vedio_details/${id}`,{
            name,
            text
        },{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        if(res.data.success) {
        toast.success(res.data.message)
        setPopup(false)
        setMenu(false)
        dispatch(setChange(res.data))
        setLoading(false)
        }else{
          toast.error(res.data.message)
          setMenu(false)
          setLoading(false)
        }
    } catch (error) {
        toast.error("Failed to update vedio")
        setLoading(false)
    }
   }
   ///delete vedio
   const deleteVedio=async(id)=>{
    try {
        setLoading(true)
        const res=await axios.delete(`${base}/delete_Vedio/${id}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        })
        if(res.data.success) {
        toast.success(res.data.message)
        dispatch(setChange(res.data))
        setLoading(false)
        setMenu(false)
        }else{
          toast.error(res.data.message)
          setLoading(false)
        }
    } catch (error) {
        toast.error("Failed to delete vedio")
        setLoading(false)
    }
   }

   ///uplode vedios photo
   const handleChange_image_Change=async(id)=>{
   // console.log(file)
    setLoading(true)
  
    console.log(id)
    try {
      const formData=new FormData()
      formData.append("file",file)
      const res=await axios.put(`${base}/vedio_photo_uplode/${id}`,formData,{
        headers:{
          Authorization:`Bearer ${token}`,
          'Content-Type':'multipart/form-data'
        }
      })
      dispatch(setChange(res.data))
      toast.success(res.data.message)
      setPrevew("")
      setFile("")
      setLoading(false)
   } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
   }
   }
  return (
    <div className="flex border border-zinc-800 p-1 overflow-hidden gap-x-2 rounded shadow bg-zinc-900">
        <div className="w-40 md:w-60 h-36 cursor-pointer group relative overflow-hidden">
            {vedio?.image?<img src={vedio?.image?.url} alt="" className="h-full w-full object-cover"/>:<video className="h-full w-full object-cover" src={vedio?.vedio?.url} ></video>}
           {
            prevw?<div className="absolute h-full  w-full z-30 top-0 left-0 duration-300 bg-[#5c5c5c5a]  justify-center  flex items-center">
          <div className="w-full h-full relative  flex justify-center items-center">
               <img src={prevw} alt="" className="h-full w-full object-center object-cover" />
               {
                loading?<CircularProgress className="bg-zinc-800 p-1 absolute text-white"/>:<button onClick={()=>handleChange_image_Change(vedio?._id)} className="bg-zinc-800 p-1 absolute text-white"><ion-icon name="cloud-upload-outline"></ion-icon></button>
               }
          </div>
     </div>:<div className={`absolute ${user?._id==vedio?.user?._id?"block":"hidden"} h-full translate-x-96  group-hover:translate-x-0 w-full z-30 top-0 left-0 duration-300 bg-[#5c5c5c5a]  justify-center  flex items-center`}>
                   <input type="file" onChange={(e)=>{
                    setFile(e.target.files[0])
                    setPrevew(URL.createObjectURL(e.target.files[0]))
                   }} id={`${vedioid}`} className="hidden image"/>
                <label  className="text-lg text-white bg-zinc-950 p-1 cursor-pointer" htmlFor={`${vedioid}`}><ion-icon name="camera-outline"></ion-icon></label>
            </div>
           }
           
        </div>
        <Link to={`/single/vedio/${vedioid}`} className="flex  justify-start  flex-col gap-y-3 px-2">
            <h1>{vedio?.name}</h1>
            <div className="p-1 flex flex-col justify-start gap-x-2 text-zinc-400">
            <h3 className="flex  items-center gap-x-2 text-sm">{vedio?.username}<ion-icon name="checkmark-circle-outline"></ion-icon></h3>
           <div className="flex  gap-x-4 text-sm">
           <h1>120k Views</h1>
           <h1>{vedio?.createdAt.split("T")[0]}</h1>
           </div>
        </div>
        </Link>
       { user?._id==vedio?.user?._id&&<div className="w-3  ml-auto relative">
          <button onClick={()=>setMenu(!menu)}><ion-icon name="ellipsis-vertical-outline"></ion-icon></button>
          <div className={`absolute text-blue-500 text-lg bg-zinc-300 w-14 h-24 duration-300 rounded z-30 shadow-lg shadow-zinc-700 p-2 ${menu?"-translate-x-24 scale-100 -translate-y-7 ":"translate-x-96 -translate-y-96 scale-0"} flex flex-col justify-between `}>
             {
              loading?<CircularProgress/>:<button onClick={()=>{
                deleteVedio(vedio?._id)
               }}  className="text-red-600" ><ion-icon name="trash-outline"></ion-icon></button>
             }
             <button onClick={()=>{
              setPopup(!popup)
              getValue()
              }} className="text-green-600"><ion-icon name="create-outline"></ion-icon></button>
          </div>
        </div>}

        <Dialog open={popup}> 
              <form onSubmit={handelSubmit} className="bg-zinc-900 border border-zinc-700 flex flex-col md:w-96 w-80 *:border *:border-zinc-800 *:text-zinc-300 gap-y-3 *:placeholder:text-sm *:outline-none *:w-full *:rounded *:p-3  p-3 rounded shadow ">
                <div>
                <button type="button" onClick={()=>setPopup(!popup)} className="float-end text-red-500"><ion-icon name="close-circle-outline"></ion-icon></button>
                </div>
                   <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Video title and tags #" className="bg-transparent" />
                   <textarea value={text} onChange={(e)=>setText(e.target.value)} className="bg-transparent"  placeholder="Text..." rows={7} name="" id=""></textarea>
                  {
                    loading?<LinearProgress color="success" />: <button type="submit" className="bg-zinc-950">Update</button>
                  }
              </form>
        </Dialog>
    </div>
  )
}

export default Your_Vedio
