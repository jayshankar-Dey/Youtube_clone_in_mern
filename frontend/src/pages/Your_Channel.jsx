import { useState } from "react"
import Navbar from "../Navbar/Navbar"
import SideBar from "../Navbar/SideBar"
import {Drawer} from "@mui/material"
import Channel from "../components/Channel"




const Your_Channel = () => {
    const [open,setOpen]=useState(true)
    const[sidebar,setSidebar]=useState(false)
   
    //console.log(query)
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
       <div >
       </div> 
       <Channel/>
       </div>
    </div>
  )
}

export default Your_Channel
