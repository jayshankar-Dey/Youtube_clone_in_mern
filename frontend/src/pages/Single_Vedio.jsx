import { useState } from "react"
import Navbar from "../Navbar/Navbar"
import SideBar from "../Navbar/SideBar"
import {Drawer} from "@mui/material"
import SingleVedio from "../components/SingleVedio"
import { useParams } from "react-router-dom"


const Single_Vedio = () => {
    const {id}=useParams()
    
    const[sidebar,setSidebar]=useState(false)
   
  
    //console.log(query)
  return (
    <div className="h-screen flex flex-col w-full bg-zinc-950 overflow-scroll">
       <Navbar single={true}   setSidebar={setSidebar} sidebar={sidebar}/>
       
       <div className="h-[92vh] w-full flex gap-x-2">
       <Drawer  open={sidebar} onClose={()=>{setSidebar(!sidebar)}}>
       <div className=" h-full ">
       <SideBar open={open}/>
       </div>
       </Drawer>
     {/* //vedios */}
       <div className="w-full ">
         <SingleVedio id={id}/>
       </div>
      {/* end //vedios */}


       </div>
    </div>
  )
}

export default Single_Vedio
