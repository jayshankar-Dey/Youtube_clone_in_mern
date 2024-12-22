/* eslint-disable react/prop-types */

import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { setChange } from "../redux/ChangeSlice"


const Photo = ({photo,setchange}) => {
  //console.log(photo)
  const token=localStorage.getItem("yo")
    const base="http://localhost:8000/api"
    const{user}=useSelector(state=>state.user)
   // const{change}=useSelector(state=>state.change)
    const dispatch=useDispatch()
    ///delete image
    const deleteImage=async(id)=>{
        try {
            const res=await axios.delete(`${base}/delete_image/${id}`,{
                headers:{
                  Authorization:`Bearer ${token}`
                }
            })
            console.log(res.data)
            toast.success(res.data.message)
            dispatch(setChange(res.data))
            setchange(res.data)
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div className="lg:w-96 md:w-80 w-full border border-zinc-800 bg-zinc-900 h-fit p-1">
     <div className="h-80 overflow-hidden relative">
        <img src={photo?.image?.url} alt="" className=" h-full w-full object-cover "/>
       {photo?.user?._id==user?._id&&<button onClick={()=>{deleteImage(photo?._id)}} className="absolute top-4 right-4 bg-red-500
         px-2 p-1 rounded-full"><ion-icon name="trash-outline"></ion-icon></button>}
     </div>
     <h1 className="p-2 ">{photo?.text}</h1>
            <h3 className="flex  items-center gap-x-2 px-3 text-zinc-400 text-sm">{photo?.user?.name}<ion-icon name="checkmark-circle-outline"></ion-icon></h3>
           <div className="flex px-3 text-zinc-400  gap-x-4 text-sm">
           
           <h1 className="mt-3">{photo?.createdAt.split("T")[0]}</h1>
           </div>
    </div>
  )
}

export default Photo
