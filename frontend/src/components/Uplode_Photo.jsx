/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react"
import {toast} from 'react-toastify'
import axios from 'axios'
import { useSelector ,useDispatch} from "react-redux"
import {setChange} from '../redux/ChangeSlice'
import {LinearProgress} from '@mui/material'
// eslint-disable-next-line no-unused-vars
const Uplode_Photo = ({setphotoPopup}) => {
    const token=localStorage.getItem("yo")
    const base="http://localhost:8000/api"
    const{user}=useSelector(state=>state.user)
    const{socket}=useSelector(state=>state.socket)
    const dispatch=useDispatch()
    const [file,setFile]=useState("")
    const [text,setText]=useState("")
    const[prevw,setPrevw]=useState("")
    const[loading,setLoading]=useState(false)
    console.log(socket)
    ////uplode image
    const imageUplode=async(e)=>{
        e.preventDefault()
        if(!user)return toast.error("Login is required")
        if(!file)return toast.error("please select image")
       try {
        const formdata=new FormData()
       formdata.append("file",file)
       formdata.append("text",text)
       setLoading(true)
       const res=await axios.post(`${base}/upload_img`,formdata,{
         headers:{
             Authorization:`Bearer ${token}`,
             'Content-Type':'multipart/form-data'
         }
       })
       setLoading(false)
       if(res.data.success){
      if(socket && user){
        const data={
          name:user?.name,
          id:user?._id,
          subscribers:user?.subscribers,
          text:text,
          user,
          type:'image'
        }
        socket.emit('Notice',data)
      }


        toast.success(res.data.message)
        dispatch(setChange(res.data))
        setphotoPopup(false)
       }else{
        toast.error(res.data.message)
       }
       } catch (error) {
        setLoading(false)
       }
       
    }
  return (
    <form onSubmit={imageUplode} className="w-80 md:w-96 p-4 bg-zinc-900 text-zinc-300 border border-zinc-700 rounded shadow-md">
        <div>
            <button type="button" className="float-end text-red-500" onClick={()=>setphotoPopup(false)}><ion-icon name="close-circle-outline"></ion-icon></button>
        </div>
     <div className="flex gap-x-1 ">
     <input type="file" name="" accept="image/*" id="" onChange={(e)=>{
        setFile(e.target.files[0])
        setPrevw(URL.createObjectURL(e.target.files[0]))
      }} className="w-full border border-zinc-700" />
      {prevw&&<img src={prevw} alt=""  className="h-20 max-w-32 p-1 bg-zinc-950 border border-zinc-800"/>}
     </div>
      <textarea name="" id="" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Text...." className="w-full border border-zinc-700 mt-3 outline-none  p-3 bg-transparent" rows={6}></textarea>
     {
        loading?<LinearProgress color="success" />: <button type="submit" className="float-end font-semibold w-28 h-10 p-2 text-zinc-300 bg-zinc-800 border border-zinc-700 rounded shadow-md">Upload</button>
     }
    </form>
  )
}

export default Uplode_Photo
