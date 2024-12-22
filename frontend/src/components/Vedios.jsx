/* eslint-disable react/prop-types */

import VedioCard from "./VedioCard"
import img from '../assets/clipart2883707.png'

const Vedios = ({vedios}) => {
 // console.log(vedios)
 
  return (
    <>
    <div className="h-[92%]  w-full flex flex-wrap gap-x-3 gap-y-3  overflow-scroll p-2 justify-center  ">
    {vedios.length==0&&<div className="text-red-500 animate-bounce mx-auto text-xl mt-56 font-semibold p-3"><img src={img} className="h-52" alt="" /></div>}
      {
        vedios.map((data,i)=>(
          <VedioCard vedio={data} key={i}/>
        ))
      }
    </div>
    </>
  )
}

export default Vedios
