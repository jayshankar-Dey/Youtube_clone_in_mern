/* eslint-disable react/prop-types */

import Filter_Card from "./Filter_Card"
import img from '../assets/clipart2883707.png'


const AllFilter = ({vedio,search,length}) => {
  //console.log(vedio,search)
 
  return (
    <>
    <div className="h-[92%]  w-full flex gap-y-3 flex-wrap  overflow-scroll p-2   ">
      {
        length==0&&<div className="text-red-500 animate-bounce mx-auto text-xl mt-56 font-semibold p-3"><img src={img} className="h-52" alt="" /></div>  //if no videos found display message.
        
 
      }
      {
        vedio?.map((data,i)=>(
          <Filter_Card key={i} vedio={data} search={search}/>
        ))
      }
      </div>
    </>
  )
}

export default AllFilter
