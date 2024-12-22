/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Dialog } from "@mui/material"
import {  useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import Uplode_Photo from "../components/Uplode_Photo"
import Uplode_Vedio from "../components/Uplode_Vedio"
import { toast } from "react-toastify"
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import sound from '../assets/warning-notification-call-184996.mp3'
import Notification from "../components/Notification"
import axios from "axios"
import { setChange } from "../redux/ChangeSlice"
const Navbar = ({setOpen,open,setSidebar,sidebar,single}) => {
   
  const {
    transcript,
    listening,
    resetTranscript,
  } = useSpeechRecognition();
  const base="http://localhost:8000/api"

    const [Notice,setNotice]=useState([])
    ///console.log(listening,transcript)
    const{socket}=useSelector(state=>state.socket)
    const[searchBar,setSearchBar]=useState(false)
    const{user}=useSelector(state=>state.user)
    const navigate=useNavigate()
    const[speetch,setspeetch]=useState(false)
    const [search,setSearch]=useState("")
    const[popup,setpopup]=useState(false)
    const[photoPopup,setphotoPopup]=useState(false)
    const[vedioPopup,setvedioPopup]=useState(false)
    const [Notificationopen,setNotificationopen]=useState(false)
    const[count,setCount]=useState(0)
    const[change,setchange]=useState("")
    const stopListining=()=> SpeechRecognition.stopListening()
    const startListening=()=>SpeechRecognition.startListening()
    const dispatch=useDispatch()
    const token=localStorage.getItem("yo")
    useEffect(()=>{
       
        if(listening==false){
          setspeetch(false)
          setspeetch(false)
  
        }else{
          setSearch(transcript)
          setspeetch(true)
         
        }
        if(speetch==false &&listening==false && search.length >2){
          navigate(`/search?q=${search}`)
        }
    },[listening,transcript,speetch])
    
    const music=new Audio(sound)
    // console.log(socket)
     useEffect(() => {
      if(socket &&user){
        socket.on('NoticeSend',data=>{
          setNotice(prev=>[...prev,data])
          //console.log(data)
          music.play()
          setchange(data)
         // dispatch(setChange(data))
        })
      }
      return () => {
        if(socket && user){
          socket.off('NoticeSend')
        }
      };
     }, [socket,change])

     const getNotifications=async()=>{
      try {
        const res=await axios.get(`${base}/get/Notice`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        //console.log(res.data)
       setNotice(res.data.Notice)
       setCount(res.data.count)
      } catch (error) {
        console.log(error)
      }
     }

     useEffect(()=>{
        if(user){
          getNotifications()
        }
     },[user,change])

     const seenNotification=async()=>{
      try {
       await axios.put(`${base}/seen/Notice`,{token},{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        //console.log(res.data)
      } catch (error) {
        console.log(error)
      }
     }

  return (
    <div className=" sm:w-full bg-zinc-900 h-20 flex  items-center justify-between  border-zinc-700 text-zinc-50 relative ">
       <div className={`flex p-3 gap-x-5 text-2xl  ${searchBar&&"hidden"}  md:text-3xl font-sans  font-bold`}>
         

          {single?<button onClick={()=>setSidebar(!sidebar)} className="mt-2  block"><ion-icon name="menu-outline"></ion-icon></button>: <button onClick={()=>setOpen(!open)} className="mt-2 hidden lg:block"><ion-icon name="menu-outline"></ion-icon></button>}

          <button onClick={()=>setSidebar(!sidebar)} className={`mt-2 ${single&&"hidden"} lg:hidden block`}><ion-icon name="menu-outline"></ion-icon></button>
          <div onClick={()=>{navigate('/')}} className=" cursor-pointer items-center  gap-x-2  flex justify-center">
          <h3 className="text-[#ff0000] mt-2"><ion-icon name="logo-youtube"></ion-icon></h3>
          <h2>YouTube</h2>
          </div>
       </div>

     <div className="flex gap-x-4 justify-center items-center w-full"> 
        <button  onClick={()=>setSearchBar(!searchBar)} className={`text-2xl  ${searchBar?"block":"hidden"} `}><ion-icon name="arrow-back-outline"></ion-icon></button> 
      <form onSubmit={(e)=>{
        e.preventDefault()
        if(search =="") return toast.warning("please enter valide search")
          navigate(`/search?q=${search}`)
          setSearch("")
         }} className={`w-[40rem] ${searchBar?"  flex top-4 left-0 z-20 w-fit  sm:w-[34rem] h-full":"lg:flex hidden"}  overflow-hidden h-12 border border-zinc-600 rounded-full`}>
         <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} className="w-full p-2 outline-none border-none bg-transparent placeholder:text-zinc-400 px-5"  placeholder="Search"/>
         <button type="submit" className="w-16 flex justify-center items-center text-2xl bg-zinc-700"><ion-icon name="search-outline"></ion-icon></button>
       </form>
      {
        speetch? <button onClick={()=>{
         stopListining()
          setspeetch(false),
          toast.success("voice search deactivated")
        
        }} className="text-2xl hidden lg:block"><ion-icon name="mic-outline"></ion-icon></button>: <button onClick={()=>{
         startListening()
          setspeetch(true),
          toast.success("voice search activated"),
          resetTranscript()
        }} className="text-2xl hidden lg:block"><ion-icon name="mic-off-outline"></ion-icon></button>
      }
     </div>
     

       <div className={`md:w-fit relative  flex md:gap-x-5 gap-x-2 pr-5 md:pr-3 md:text-2xl ${searchBar&&"hidden"} `}>
        <button onClick={()=>setSearchBar(!searchBar)} className="block lg:hidden"><ion-icon name="search-outline"></ion-icon></button>
        {
        speetch? <button onClick={()=>{
         stopListining()
          setspeetch(false),
          toast.success("voice search deactivated")
        
        }} className="md:hidden block"><ion-icon name="mic-outline"></ion-icon></button>: <button onClick={()=>{
         startListening()
          setspeetch(true),
          toast.success("voice search activated"),
          resetTranscript()
        }} className="md:hidden block"><ion-icon name="mic-off-outline"></ion-icon></button>
      }
        <button onClick={()=>setpopup(!popup)}><ion-icon name="videocam-off-outline"></ion-icon></button>
        <div className={`absolute ${popup?"block":"hidden"} text-sm w-36 p-3 rounded-md z-20 bg-zinc-800 h-20 top-14 text-blue-500 justify-between flex flex-col `}>
           <button onClick={()=>setphotoPopup(!photoPopup)} className="flex justify-center items-center gap-x-3"><ion-icon name="image-outline"></ion-icon>Uplode photo</button>
           <button onClick={()=>setvedioPopup(!vedioPopup)} className="flex justify-center items-center gap-x-3"><ion-icon name="videocam-outline"></ion-icon>Uplode video</button>
        </div>
        {/* <audio src={sound}> </audio> */}
        <button onClick={()=>{
          setNotificationopen(!Notificationopen)
          seenNotification()
          setchange("change notification")
        }} className="relative"><ion-icon name="notifications-outline"></ion-icon> <span className="text-sm absolute left-1 md:left-2 -bottom-1">{count}</span> 
        <div className={`w-72 -left-64  ${Notificationopen?"top-12 md:top-14":"-translate-y-96 duration-300"} rounded shadow-lg absolute bg-zinc-800 z-30 max-h-80 flex flex-col gap-y-2 overflow-scroll p-2`}>
        {/* <Notification/> */}
        {Notice?.length==0&&<h1 className="text-sm p-1">No Notificat ion found..</h1>}
         {
          Notice?.map((data,i)=>(
            <Notification data={data} key={i} change={setchange} setopen={setNotificationopen}/>
          ))
         }
          </div>
          </button>
        <Link to={'/Channel'} className="md:h-12 md:w-12 w-10 h-10 overflow-hidden  rounded-full">
  
            {
              user?.profile? <img src={ user?.profile?.url} alt="" className="h-full w-full object-center object-cover" />: <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" className="h-full w-full object-center object-cover" />
            }
        </Link>
       </div>

{/* ////uplode photo */}
<Dialog open={photoPopup}>
<Uplode_Photo setphotoPopup={setphotoPopup}/>
</Dialog>
{/* ///vedio uplode */}
<Dialog open={vedioPopup}>
<Uplode_Vedio setvedioPopup={setvedioPopup}/>
</Dialog>

    </div>
  )
}

export default Navbar
