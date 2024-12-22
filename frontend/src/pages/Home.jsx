/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import Navbar from "../Navbar/Navbar"
import SideBar from "../Navbar/SideBar"
import {Drawer} from "@mui/material"
import Vedios from "../components/Vedios"
import Filter from "../components/Filter"
import { useSearchParams } from "react-router-dom"
import AllFilter from "../components/AllFilter"
import { useDispatch, useSelector } from "react-redux"
import {setChange} from '../redux/ChangeSlice'
import {toast} from 'react-toastify'
import axios from "axios"
const Home = () => {
    const [open,setOpen]=useState(true)
    const[sidebar,setSidebar]=useState(false)
    const [search]=useSearchParams()
    const query=String(search.get("q"))
    const [vedios,setVedios]=useState([])
    const [filtervedios,setFilterVedios]=useState([])
    const dispatch=useDispatch() 
  const{user}=useSelector(state=>state.user)
  // eslint-disable-next-line no-unused-vars
    const{change}=useSelector(state=>state.change)
     const token=localStorage.getItem("yo")
    const base="http://localhost:8000/api"
    //console.log(query)

    ////get vedio and photo
console.log(query)
    useEffect(() => {
      const getVedio_And_Photo=async()=>{
        try {
           
            const res=await axios.get(`${base}/home`,{
              headers:{
                Authorization:`Bearer ${token}`
              }
            })
            setVedios(res.data.vedio)
        
      
        } catch (error) {
          toast.error("Failed to get vedios and photos")
          console.log(error)
        }
      }
      getVedio_And_Photo()
    }, [change])

    useEffect(() => {
     const get_Search_vedio=async()=>{
      try {
        if(query !=='null'){
          const value=query
          const res=await axios.get(`${base}/search/vedio/${value}`,{
            headers:{
              Authorization:`Bearer ${token}`
            }
          })
         /// console.log(res.data)
          setFilterVedios(res.data.search)
        }
      } catch (error) {
        toast.error("Failed to get vedios and photos")
        console.log(error)
      }
     }
     get_Search_vedio()
    }, [change,query])
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
       <div className="h-14 flex">
        <Filter/>
        </div>
      {
        query !=='null'? <AllFilter length={Number(filtervedios.length)} vedio={filtervedios} search={query}/>: <Vedios vedios={vedios}/> // replace with actual component when API is ready.
      }
       </div>
      {/* end //vedios */}


       </div>
    </div>
  )
}

export default Home
