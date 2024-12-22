/* eslint-disable react/prop-types */

import axios from "axios"


const Notification = ({data,change,setopen}) => {
 const base="http://localhost:8000/api"
  const token=localStorage.getItem("yo")
 // console.log(data)
 const deleteNotifications=async(id)=>{
  try {
    const res=await axios.delete(`${base}/delete/Notice/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })
   // console.log(res.data)
    change(res.data)
    setopen(true)
  } catch (error) {
    console.log(error)
  }
 }

  return (
    <div className="w-64 bg-zinc-900  mx-auto border border-zinc-700 rounded shadow-lg">
        <div className="border border-green-400 bg-green-400 mb-2">

        </div>
      <div className="flex justify-between p-2">
        <span className="text-blue-500  text-sm"><ion-icon name="notifications-outline"></ion-icon></span>
      <div className="w-48 text-left text-sm">
        <div className="flex gap-x-2 mb-1 items-center">
        <img className="h-7 w-7 rounded-full" src={data?.senderId?.profile?.url} alt="" />
        <h1 className="font-semibold">{data?.senderId?.name}</h1>
        </div>
        <p className="ml-2">{data?.text}
        </p>
      </div>
      <span onClick={()=>deleteNotifications(data?._id)} className="text-red-400 text-sm"><ion-icon name="close-circle-outline"></ion-icon></span>
      </div>
    </div>
  )
}

export default Notification
