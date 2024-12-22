/* eslint-disable no-unused-vars */

import {Button, Drawer} from '@mui/material';
import { useEffect, useState } from 'react';
import SideVedio from '../components/SideVedios'
import { useDispatch, useSelector } from "react-redux"
import {setChange} from '../redux/ChangeSlice'
import {toast} from 'react-toastify'
import axios from "axios"
import { Link, useParams } from 'react-router-dom';
const Playlist = () => {
   const{id}=useParams()
   const[open,setOpen]=useState(false)
   const[vedios,setVedios]=useState([])
   const[select,setSelect]=useState([])
   const[data,setData]=useState()
   const dispatch=useDispatch() 
   const [playlistVedio,setPlaylistvedios]=useState([])
   const{user}=useSelector(state=>state.user)
   // eslint-disable-next-line no-unused-vars
     const{change}=useSelector(state=>state.change)
      const token=localStorage.getItem("yo")
     const base="http://localhost:8000/api"
     const[sort,setSort]=useState(false)
   //get/vedio/photo/playlist
   const getVediosAndPhotos=async()=>{
      try {
          const res=await axios.get(`${base}/get/vedio/photo/playlist`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
          setVedios(res.data.data)
      } catch (error) {
           console.log(error)
           toast.error("somthing wait wrong")
      }
   }

   useEffect(()=>{
     if(user&&token){
      getVediosAndPhotos()
     }
   },[change])


   ///get selected vedios and photos
   const getValue=async(value)=>{
      if(select.includes(value)){
         setSelect(select.filter(data=>data!=value))
        }else{
         setSelect((prev)=>[...prev,value])
        }
   }

   //add vedios and photos in play
   const addVediosAndPhotos=async()=>{
      try {
        const res= await axios.post(`${base}/add/vedio/photo/playlist`,{id,vedios:select},{
             headers:{
               Authorization:`Bearer ${token}`
             }
         })
         setSelect([])
         console.log(res.data)
         toast.success("successfully")
         setOpen(false)
         dispatch(setChange(!change))
      } catch (error) {
          console.log(error)
          toast.error("Failed to add vedios and photos")
      }
    }
    ///get playlist
    const getPlaylist=async()=>{
      try {
        const res=await axios.get(`${base}/get/playlist/data/${id}/${sort}`,{
             headers:{
               Authorization:`Bearer ${token}`
             }
         })
         setData(res.data.data)
         setPlaylistvedios(res.data.vedio)
      } catch (error) {
          console.log(error)
          toast.error("Failed to get playlist")
      }
    }
    useEffect(()=>{
      getPlaylist()
    },[change,sort])
  // console.log(data)
  const deleteVedos=async(vedioId,playlistId)=>{
     try {
        const res=await axios.delete(`${base}/delete/vedio/playlist/${vedioId}/${playlistId}`,{
             headers:{
               Authorization:`Bearer ${token}`
             }
         })
         //console.log(res.data)
         if(res.data.success){
          toast.success(res.data.message)
          setSelect([])
          dispatch(setChange(res.data))
         }else{
          toast.warning(res.data.message)
           setSelect([])
           dispatch(setChange(res.data))
         }
      } catch (error) {
          console.log(error)
          toast.error("Failed to delete vedios and photos")
      }
    }
    //delete selected vedios and photos
   const handleDelete=async()=>{
  }
  return (
    <>
      <div className="flex lg:gap-1 overflow-scroll h-full items-center justify-start p-1 gap-x-10  flex-col lg:flex-row">
       


<div  className="border border-zinc-700 hidden xl:block  lg:h-[91vh] lg:w-[30rem]  w-full p-3  bg-zinc-900 rounded-tr-3xl rounded-tl-3xl relative">
    <div className=" w-full overflow-hidden blur-sm ">
             {
              data?.image? <img src={data?.image?.url} alt=""  className="  object-cover"/>: <img src={playlistVedio[0]?.id?.image?.url} alt=""  className="  object-cover"/>
             }
    </div>
{/* ////body */}
    <div className="absolute h-fit z-30  text-white  w-full top-0 left-0 bottom-0  flex flex-col gap-y-2">

             <div className="w-80  border rounded shadow-lg shadow-zinc-900  border-zinc-700 p-1 md:w-96 mx-auto my-10">
             {
              data?.image? <img src={data?.image?.url} alt=""  className="  object-cover"/>: <img src={playlistVedio[0]?.id?.image?.url} alt=""  />
             }
             </div>
              <div className="flex bg-zinc-900 p-2 items-center justify-between px-4">
                 <h3 className="font-bold  underline lg:text-3xl text-xl">
                    playlist
                 </h3>
                 {data?.user?.toString() == user?._id?.toString()&& <button onClick={()=>setOpen(!open)} className="w-32 h-11 bg-zinc-800 rounded font-semibold border border-zinc-600 shadow-lg">
                    Add vedio
                 </button>}
                 <Drawer anchor="bottom" open={open} onClose={()=>setOpen(!open)}>
              <div className="w-full overflow-scroll flex *:gap-x-4  p-4 bg-[#252525] h-[35rem] flex-col items-center gap-y-3  relative ">
                 { select.length>0&&<div className='w-full fixed my-4  top-20 left-3 md:left-[35%]'>
                      <Button onClick={addVediosAndPhotos} variant='contained' color='success'>Add</Button>
                     </div>}
                       <div className='mt-14'>
               
                         {
                           vedios.map((data,i)=>(
                              <div key={i} className='flex justify-center md:flex-row flex-col items-center  gap-x-2'>
                          <label htmlFor={i}  className='flex justify-start w-full py-2'>
                               <input type="checkbox" value={data?._id} onChange={(e)=>getValue(e.target.value.toString())} id={i} className='  rounded-full h-8 w-8 cursor-pointer bg-red-100 border-red-300 text-red-600 focus:ring-red-200' />
                              
                          </label>
                          <SideVedio video={data}/>
                         </div>
                           ))
                         }

                        


                       </div>
              </div>
              </Drawer>
              </div>
              <div className="text-white bg-zinc-900 p-2">
                  <h1 className="text-lg  text-zinc-300">{data?.name}</h1>

                 <div className="flex gap-x-5 mt-4 items-center text-zinc-200">
                 <Link to={`/Channel/${data?.user}`} className="flex cursor-pointer gap-x-3 items-center text-lg font-semibold">
                 {
                      data?.profile?<img className="h-10 w-10 rounded-full" src={data?.profile} alt="" />:<img className="h-10 w-10 rounded-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
                    }
                    <h1>{data?.username}</h1>
                 </Link>
                 <h1 className="text-sm my-2">{playlistVedio?.length} Vedios.</h1>
                 </div>
              </div>


    </div>


</div>

{/* //////vedios */}
<div className="lg:h-[91vh]      lg:ml-10 lg:overflow-auto lg:w-[37rem] bg-zinc-900 p-3 w-full">
                       <div className='block xl:hidden'>
                       <div className="w-full   border rounded shadow-lg shadow-zinc-900  border-zinc-700 p-1 md:w-96 mx-auto my-10">
                       {
              data?.image? <img src={data?.image?.url} alt=""  className="  object-cover"/>: <img src={playlistVedio[0]?.id?.image?.url} alt=""  className="  object-cover"/>
             }
                   </div>
                   <div className="text-white bg-zinc-900 p-2">
                  <h1 className="text-lg  text-zinc-300">{data?.name}</h1>

                 <div className="flex gap-x-5 mt-4 items-center text-zinc-200">
                 <Link to={`/Channel/${data?.user}`} className="flex gap-x-3 items-center text-lg font-semibold">
                    {
                      data?.profile?<img className="h-10 w-10 rounded-full" src={data?.profile} alt="" />:<img className="h-10 w-10 rounded-full" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
                    }
                    <h1>{data?.username}</h1>
                 </Link>
                 <h1 className="text-sm my-2">{playlistVedio?.length} Vedios.</h1>
                 </div>
              </div>

                       </div>
                  <div>
                    <div className='text-white'>
                                <button onClick={()=>setSort(!sort)} className='bg-gray-800 p-3 my-3'>Sort <button className='-rotate-90'><ion-icon name="code-outline"></ion-icon></button></button>
                    </div>
                  {
                           playlistVedio?.map((data,i)=>(
                            <div key={i}>
                              {
                                data?.id?.user?.toString() == user?._id?.toString()&& <button onClick={()=>deleteVedos(data?._id,id)} className='text-red-600 my-1  lg:float-start mx-1 text-sm bg-zinc-700   rounded-full flex j'><ion-icon name="close-circle-outline"></ion-icon></button>
                              }
                              <SideVedio video={data?.id} />
                             
                            </div>
                           ))
                         }
                  </div>

</div>














      </div>
    </>
  )
}

export default Playlist
