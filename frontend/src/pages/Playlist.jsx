/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import Navbar from "../Navbar/Navbar"
import SideBar from "../Navbar/SideBar"
import {CircularProgress, Dialog, Drawer} from "@mui/material"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {setChange} from '../redux/ChangeSlice'
import {toast} from 'react-toastify'
import axios from "axios"
const Playlist = () => {
    const [open,setOpen]=useState(true)
    const[sidebar,setSidebar]=useState(false)
    const [Playlist,setPlaylist]=useState([])
    const [openPlaylist,setopenPlaylist]=useState(false)
    const dispatch=useDispatch() 
    const[name,setName]=useState("")
  const{user}=useSelector(state=>state.user)
  const[loading,setLoading]=useState(false)
  // eslint-disable-next-line no-unused-vars
    const{change}=useSelector(state=>state.change)
     const token=localStorage.getItem("yo")
    const base="http://localhost:8000/api"
    //console.log(query)

    ////get vedio and photo

    useEffect(() => {
      const getVedio_And_Photo=async()=>{
        try {
           
            const res=await axios.get(`${base}/get/playlist`,{
              headers:{
                Authorization:`Bearer ${token}`
              }
            })
            setPlaylist(res.data.data)
              // console.log(res.data)
      
        } catch (error) {
          toast.error("Failed to get vedios and photos")
          console.log(error)
        }
      }
      getVedio_And_Photo()
    }, [change])

    ////create playlist
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const name=e.target[0].value
        try {
            const res=await axios.post(`${base}/create/playlist`,{name},{
              headers:{
                Authorization:`Bearer ${token}`
              }
            })
            //console.log(res.data)
            toast.success("Playlist created successfully")
            setopenPlaylist(false)
            dispatch(setChange(res.data))
        } catch (error) {
            toast.error("Failed to create playlist")
            console.log(error)
        }
    }

    ////change image
    const handleImageChange=async(e,id)=>{
        const file=e.target.files[0]
        try {
          setLoading(true)
            const formData=new FormData()
            formData.append("file",file)
            formData.append("id",id)
            const res=await axios.post(`${base}/playlist/image/update`,formData,{
              headers:{
                Authorization:`Bearer ${token}`,
                'Content-Type':'multipart/form-data'
              }
            })
            console.log(res.data)
            toast.success("Image uploaded successfully")
            dispatch(setChange(res.data))
            setLoading(false)
        } catch (error) {
            toast.error("please enter valide image")
            console.log(error)
            setLoading(false)
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
       <div className="w-full">

          <div className="flex justify-start p-3 text-zinc-200">
                 <button onClick={()=>setopenPlaylist(!openPlaylist)} className="bg-zinc-900 p-3  border border-zinc-800 rounded shadow-lg shadow-zinc-800">create playlist</button>
          </div>
          <Dialog  open={openPlaylist} onClose={()=>setopenPlaylist(!openPlaylist)}>
              <form onSubmit={handleSubmit} className="h-32 text-zinc-200 w-96 gap-x-3 bg-zinc-900 flex justify-center items-center border border-zinc-800 ">
              <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Playlist name.."  className="bg-transparent p-3 rounded-full b border border-zinc-700"/>
              <button type="submit" className="bg-zinc-900 p-3 px-7 duration-300  hover:bg-green-700 border border-zinc-700 rounded-full shadow-lg shadow-zinc-800">Create </button>
              </form>
          </Dialog>

          <div className="p-2 flex flex-wrap gap-x-2 md:justify-start justify-center gap-y-2">
         
{
  Playlist?.map((data,i)=>(
    <div key={i}   >
       <div  className="h-52 cursor-pointer relative group md:w-96 w-52 p-1">
            {
              data?.image?<img className="w-full h-full object-cover object-center" src={data?.image?.url} ></img>:<img className="w-full h-full rounded-tl-3xl  rounded-tr-3xl object-cover object-center" src={"https://cdn.pixabay.com/photo/2015/06/24/02/12/the-blurred-819388_1280.jpg"} ></img>
            }
           
            <div className="h-[80%]  absolute flex justify-center items-center text-lg md:text-xl z-20 top-0 left-0 p-1  w-full">
                 {
                  loading?<CircularProgress/>:<>
                   <label htmlFor="playlist" className="cursor-pointer"><ion-icon name="camera"></ion-icon></label>
                   <input type="file" onChange={(e)=>handleImageChange(e,data?._id)} name="" id="playlist" className="hidden" />
                  </>
                 }
            </div>
            <Link to={`/Playlist/Videos/${data?._id}`} className="absolute  border border-zinc-700 rounded z-20 bottom-0 left-0 bg-zinc-800 flex justify-center flex-col items-center gap-x-2 text-zinc-200 lg:text-xl w-full h-20 lg:h-24">
                <div className="flex gap-x-2">
                <h1><ion-icon name="play"></ion-icon></h1>
                <h1 >Playlist</h1>
                </div>
                <div>
                <h1 className="text-blue-500 text-sm">{data?.name}</h1>
                </div>
            </Link>
           
       </div>
       </div> 
  ))
}
          </div>

       </div>
      {/* end //vedios */}


       </div>
    </div>
  )
}

export default Playlist
