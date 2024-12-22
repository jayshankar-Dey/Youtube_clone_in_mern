/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"


const Watch_later_Video = ({vedio,delete_watch_later}) => {
  return (
    <div className="flex text-zinc-300 border gap-x-2 border-zinc-700 lg:h-52 h-40 px-2 bg-zinc-900 rounded">
       <Link to={`/single/vedio/${vedio?._id}`} className="h-full  md:w-56 ">
        {vedio?.image?<img src={vedio?.image?.url} className="h-full object-cover object-center w-full"></img>:<video src={vedio?.vedio.url} className="h-full object-cover object-center w-full"></video>}
       </Link>

       <div>
        <div className="flex justify-between gap-x-3 ">
            <Link to={`/single/vedio/${vedio?._id}`} className="md:text-lg font-semibold lg:w-[30rem] sm:w-96">{vedio?.name}</Link>
            <button onClick={()=>delete_watch_later(vedio?._id)} className="text-3xl w-7 "><ion-icon name="close"></ion-icon></button>
        </div>
        <Link to={`/Channel/${vedio?.user}`} className="p-1 mt-3 flex flex-col  justify-start gap-x-2 text-zinc-400">
            <h3 className="flex  items-center gap-x-2 text-sm">{vedio?.username} <ion-icon name="checkmark-circle-outline"></ion-icon></h3>
           <div className="flex  gap-x-4 text-sm">
           <h1>{vedio?.view?.length} Views</h1>
           <h1>{vedio?.createdAt.split("T")[0]}</h1>
           </div>
        </Link>
       </div>
    </div>
  )
}

export default Watch_later_Video
