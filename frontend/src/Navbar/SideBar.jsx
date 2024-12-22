/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {useDispatch, useSelector,} from "react-redux"
import {islogin} from "../redux/LoginSlice"
import {Dialog} from '@mui/material';
import Loginform from "../components/Login"
import Register from "../components/Register";
import {  toast } from 'react-toastify';
import { setChange } from "../redux/ChangeSlice";
import {setData} from '../redux/UserSlice'
import axios from "axios";
const SideBar = ({open}) => {
  const dispatch=useDispatch()
  const{login}=useSelector(state=>state.login)
  const{user}=useSelector(state=>state.user)
  const{change}=useSelector(state=>state.change)
  const token=localStorage.getItem("yo")
  const[Login,setLogin]=useState(true)
  const navigate=useNavigate()
  const socket=useSelector(state=>state.socket.socket)
  const [Change,setchange]=useState("")
  const[onlineUser,setOnlineuser]=useState([])
  // console.log(socket)
  // console.log(user)
   const base="http://localhost:8000/api"


   const get_Online_User=async()=>{
    try {
      if(token){
       const res=await axios.get(`${base}/get_online_user`,{
         headers:{
           Authorization:`Bearer ${token}`
         }
     })
    setOnlineuser(res.data.onlineUsers)
      }
      //console.log(res.data)
    } catch (error) {
       localStorage.removeItem("yo")
    }
    }

   useEffect(()=>{
    if(socket&&user){
       socket.emit("online",user)
       socket.on("getOnline",(data)=>{
        setchange(data)
       })
       socket.on('ofline',data=>{
        setchange(data)
       })
       return ()=>{
        socket.off("online")
        socket.off("getOnline")
      }
    }

   },[user,socket])
   
   const logoutUser=async()=>{

    if(socket){
      socket.emit('ofline','user Ofline')
    }

   }
    
    useEffect(() => {
      get_Online_User()
    }, [Change,change])
  return (
    <>
    <div className={`${open?"w-72  ":"w-fit"} duration-300 text-zinc-100 bg-zinc-900 h-full overflow-scroll`}>

      <div className="w-full flex flex-col gap-y-3 h-40 border-b border-zinc-700 p-4">
       <Link to={'/'} className="flex items-center  bg-zinc-800 gap-x-6 lg:text-lg p-3 rounded-xl">
       <span><ion-icon name="home"></ion-icon></span>
       <h2 className={`${open?"block":"hidden"}`} >Home</h2>
       </Link>
      
       <Link to={`/Subscription/Videos`} className="flex items-center  hover:bg-zinc-800 duration-300   gap-x-6 lg:text-lg p-3 rounded-xl">
       <span><ion-icon name="albums-outline"></ion-icon></span>
       <h2 className={`${open?"":"hidden"}`}>Subscriptions</h2>
       </Link>
      </div>


      <div className={`h-32 border-b ${open?"":"hidden"} border-zinc-700 text-zinc-300 text-sm flex flex-col justify-center items-center px-7 gap-y-3`}>
             <h3>Sign in to like videis, comment and subscribe </h3>
             <div className="flex justify-start  w-full">
             {
              localStorage.getItem("yo")?<button onClick={()=>{
                localStorage.removeItem("yo")
                dispatch(islogin(false))
                dispatch(setData(null))
                dispatch(setChange("logdi mano gi he yo oradi qiudk"))
                logoutUser()
                toast.success("Logout Succesfully")
                navigate('/')
               }} className="border px-5 flex justify-center items-center gap-x-2 text-red-500 font-semibold p-2 border-zinc-500 rounded-full"><ion-icon name="log-out-outline"></ion-icon> <span>Log out</span></button>:<button onClick={()=>{
                dispatch(islogin(true))
               }} className="border px-5 flex justify-center items-center gap-x-2 text-blue-500 font-semibold p-2 border-zinc-500 rounded-full"><ion-icon name="person-circle-outline"></ion-icon> <span>Sign in</span></button>
             }
             </div>
            <Dialog open={login}>
                 <div className="p-2 bg-zinc-900 w-96 border border-zinc-800 rounded shadow">
                  {
                    Login?<Loginform setLogin={setLogin} Login={Login}/>:<Register setLogin={setLogin} Login={Login}/>
                  }
                  <div className="w-72 mx-auto text-zinc-300">
                  {
                    Login?<button onClick={()=>{setLogin(!Login)}}>Not have any account please <span className="text-blue-500 underline">Register</span></button>:<button onClick={()=>{setLogin(!Login)}}>have any account please <span className="text-blue-500 underline">Login</span></button>
                  }
                  </div>
                 </div>
            </Dialog>
      </div>

      <div className={`p-5  border-b ${open?"":"hidden"} border-zinc-700`}>
         <h3>You <ion-icon name="chevron-forward-outline"></ion-icon></h3>

         <Link to={'/Channel'} className="flex items-center hover:bg-zinc-800  gap-x-6 lg:text-lg p-3 rounded-xl">
       <span><ion-icon name="cash-outline"></ion-icon></span>
       <h2 className={`${open?"block":"hidden"}`} >Your channal</h2>
       </Link>
       <Link to={`/Watch/history`} className="flex hover:bg-zinc-800 duration-300 items-center   gap-x-6 lg:text-lg p-3 rounded-xl">
       <span><ion-icon name="time-outline"></ion-icon></span>
       <h2 className={`${open?"":"hidden"}`}>History</h2>
       </Link>
       <Link to={`/Playlist`} className="flex items-center hover:bg-zinc-800  gap-x-6 lg:text-lg p-3 rounded-xl">
       <span><ion-icon name="filter-outline"></ion-icon></span>
       <h2 className={`${open?"block":"hidden"}`} >Playlist</h2>
       </Link>
      
       <Link to={`/Watch_later/Videos`} className="flex hover:bg-zinc-800 duration-300 items-center   gap-x-6 lg:text-lg p-3 rounded-xl">
       <span><ion-icon name="stopwatch-outline"></ion-icon></span>
       <h2 className={`${open?"":"hidden"}`}>Watch later</h2>
       </Link>
       <Link to={`/Like/Videos`} className="flex hover:bg-zinc-800 duration-300 items-center   gap-x-6 lg:text-lg p-3 rounded-xl">
       <span><ion-icon name="thumbs-up-outline"></ion-icon></span>
       <h2 className={`${open?"":"hidden"}`}>Liked videos</h2>
       </Link>
      </div>
{console.log(onlineUser)}
      {onlineUser&&<div className={`p-5 border-b mx-h-96 overflow-scroll text-zinc-200 ${open?"":"hidden"} flex flex-col gap-y-3 border-zinc-600`}>
        <h1>Subscription</h1>

       
        {
          onlineUser?.map((user,i)=>(
            <div key={i} className="flex gap-x-3  items-center">
            {user?.profile?<img src={user.profile.url} alt=""  className="h-12 w-12 object-center object-cover rounded-full"/>:<img src="https://cc-prod.scene7.com/is/image/CCProdAuthor/mascot-logo-design_P1_900x420?$pjpeg$&jpegSize=200&wid=900" alt=""  className="h-12 w-12 object-center object-cover rounded-full"/>}
            <div>
            <h3>{user?.name}</h3>
            {
              user?.online&&<span className="text-sm text-green-500">online</span>
            }
            </div>
        </div>
          ))
        }

       
        
        
      </div>}

      <div className={`p-5 ${open?"block":"hidden"}`}>
        <h2 className="font-semibold ">Explore</h2>

        <Link to={`/search?q=trending`} className="flex items-center hover:bg-zinc-800  gap-x-6 lg:text-lg p-3 rounded-xl">
       <span><ion-icon name="flame-outline"></ion-icon></span>
       <h2 className={`${open?"block":"hidden"}`} >Trending</h2>
       </Link>
       <Link to={`/search?q=music`} className="flex hover:bg-zinc-800 duration-300 items-center   gap-x-6 lg:text-lg p-3 rounded-xl">
       <span><ion-icon name="musical-notes-outline"></ion-icon></span>
       <h2 className={`${open?"":"hidden"}`}>Music</h2>
       </Link>
       <Link to={`/search?q=movies`} className="flex items-center hover:bg-zinc-800  gap-x-6 lg:text-lg p-3 rounded-xl">
       <span><ion-icon name="tv-outline"></ion-icon></span>
       <h2 className={`${open?"block":"hidden"}`} >Movies & Tv</h2>
       </Link>
      
       <Link to={`/search?q=gaming`} className="flex hover:bg-zinc-800 duration-300 items-center   gap-x-6 lg:text-lg p-3 rounded-xl">
       <span><ion-icon name="game-controller-outline"></ion-icon></span>
       <h2 className={`${open?"":"hidden"}`}>Gaming</h2>
       </Link>
       <Link to={`/search?q=news`}  className="flex items-center hover:bg-zinc-800  gap-x-6 lg:text-lg p-3 rounded-xl">
       <span><ion-icon name="newspaper-outline"></ion-icon></span>
       <h2 className={`${open?"block":"hidden"}`} >News</h2>
       </Link>
       <Link to={`/search?q=sports`}  className="flex hover:bg-zinc-800 duration-300 items-center   gap-x-6 lg:text-lg p-3 rounded-xl">
       <span><ion-icon name="trophy-outline"></ion-icon></span>
       <h2 className={`${open?"":"hidden"}`}>Sports</h2>
       </Link>

       <Link to={`/search?q=learning`} className="flex items-center hover:bg-zinc-800  gap-x-6 lg:text-lg p-3 rounded-xl">
       <span><ion-icon name="ellipse-outline"></ion-icon></span>
       <h2 className={`${open?"block":"hidden"}`} >Learning</h2>
       </Link>
       <Link to={`/search?q=fashion`} className="flex hover:bg-zinc-800 duration-300 items-center   gap-x-6 lg:text-lg p-3 rounded-xl">
       <span><ion-icon name="ribbon-outline"></ion-icon></span>
       <h2 className={`${open?"":"hidden"}`}>Fashion & beauty</h2>
       </Link>
       <Link to={`/search?q=podcasts`} className="flex items-center hover:bg-zinc-800  gap-x-6 lg:text-lg p-3 rounded-xl">
       <span><ion-icon name="watch-outline"></ion-icon></span>
       <h2 className={`${open?"block":"hidden"}`} >Podcasts</h2>
       </Link>
      </div>

    </div>
      
    </>
  )
}

export default SideBar
