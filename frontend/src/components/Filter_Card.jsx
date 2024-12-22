/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"



const Filter_Card = ({vedio,search}) => {
  //console.log(vedio,search)
  return (
    <>
   {vedio?.playlists? <div className="md:w-[80rem]  p-2 border border-zinc-700 rounded-md shadow-md bg-zinc-800 flex w-full h-60" >
         <Link to={`/Playlist/Videos/${vedio?._id}`} className=" relative h-full w-60 md:w-[40rem] ">
           { vedio?.image? <img src={vedio?.image?.url} alt=""className="w-full h-full object-cover object-center" />:<img src={"https://cdn.pixabay.com/photo/2015/06/24/02/12/the-blurred-819388_1280.jpg"} alt=""className="w-full h-full object-cover object-center" />}
           <div className="absolute  border border-zinc-700 rounded z-20 bottom-0 left-0 bg-zinc-800 flex justify-center items-center gap-x-2 text-zinc-200 lg:text-xl w-full h-20">
                <h1><ion-icon name="play"></ion-icon></h1>
                <h1>Playlist</h1>
            </div>
       </Link>
       <div className="w-full h-full text-zinc-300 font-semibold   px-3">
             {
              vedio?.isimage? <h3 className="text-sm md:text-xl">{vedio?.text}</h3>: <Link to={`/single/vedio/${vedio?._id}?q=${search}`} className="text-sm md:text-xl">{vedio?.name}</Link>
             }
              <Link to={`/Channel/${vedio?.user}`} className="p-1 mt-3 flex flex-col  justify-start gap-x-2 text-zinc-400">
            <h3 className="flex  items-center gap-x-2 text-sm">{vedio?.username} <ion-icon name="checkmark-circle-outline"></ion-icon></h3>
           <div className="flex  gap-x-4 text-sm">
           playList
           <h1>{vedio?.createdAt?.split("T")[0]}</h1>
           </div>
        </Link>
        
       </div>

    </div>: <div className="md:w-[80rem]  p-2 border border-zinc-700 rounded-md shadow-md bg-zinc-800 flex w-full h-60" >
         <Link to={`${vedio?.isimage?"":`/single/vedio/${vedio?._id}?q=${search}`}`} className=" h-full w-60 md:w-[40rem] ">
           { vedio?.image? <img src={vedio?.image?.url} alt=""className="w-full h-full object-cover object-center" />:<video className="w-full h-full object-cover object-center" src={vedio?.vedio?.url} ></video>}

       </Link>
       <div className="w-full h-full text-zinc-300 font-semibold   px-3">
             {
              vedio?.isimage? <h3 className="text-sm md:text-xl">{vedio?.text}</h3>: <Link to={`/single/vedio/${vedio?._id}?q=${search}`} className="text-sm md:text-xl">{vedio?.name}</Link>
             }
              <Link to={`/Channel/${vedio?.user}`} className="p-1 mt-3 flex flex-col  justify-start gap-x-2 text-zinc-400">
            <h3 className="flex  items-center gap-x-2 text-sm">{vedio?.username} <ion-icon name="checkmark-circle-outline"></ion-icon></h3>
           <div className="flex  gap-x-4 text-sm">
           {vedio?.isimage?<h1>image</h1>:<h1>{vedio?.view?.length} Views</h1>}
           <h1>{vedio?.createdAt?.split("T")[0]}</h1>
           </div>
        </Link>
        
       </div>

    </div>}
    </>
  )
}

export default Filter_Card
