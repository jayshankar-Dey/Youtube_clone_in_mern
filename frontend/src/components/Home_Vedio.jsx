/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"


const Home_Vedio = ({home}) => {
    console.log(home)
  return (
    <div className="p-5 flex gap-x-3  justify-center  items-center gap-y-3 flex-wrap">
     {
          home.length==0&&<h1>No video and photo found..</h1>
     }
   {
     home?.map((data,i)=>(
          <div key={i}>
                         {/* ///vedios and photos   */}

                         {
                       data.isimage? <div className="sm:w-72 h-60 sm:h-52 w-full p-1 border border-zinc-800 rounded bg-zinc-900 shadow">
                       <div className="h-full border-b border-zinc-800">
                       <img className="w-full h-full object-cover object-center" src={data?.image?.url}></img>
                       </div>
                  </div>: <>{data?.playlists? <Link to={`/Playlist/Videos/${data?._id}`}>
                  
                  <div className="sm:w-80 cursor-pointer overflow-hidden group relative w-full p-1 border border-zinc-800 rounded bg-zinc-900 shadow">
          <div className="h-56 relative border-b border-zinc-800">
          {
            data?.image? <img className="w-full h-full object-cover object-center" src={data?.image?.url}></img>: <img className="w-full h-full object-cover object-center" src={"https://cdn.pixabay.com/photo/2015/06/24/02/12/the-blurred-819388_1280.jpg"}></img>
          }
           <div className="absolute  border border-zinc-700 rounded z-20 bottom-0 left-0 bg-zinc-800 flex justify-center items-center gap-x-2 text-zinc-200 lg:text-xl w-full h-20">
                <h1><ion-icon name="play"></ion-icon></h1>
                <h1>Playlist</h1>
            </div>
          </div>
         <div className="absolute bg-[#36353581] duration-300 group-hover:translate-x-0 translate-x-96 z-30 top-0 left-0 h-full w-full  flex justify-center items-center ">
         <h1 className="text-lg p-2 leading-6 ">{data?.name}</h1>
         </div>
     </div>
                  </Link>:<Link to={`/single/vedio/${data?._id}`}>
                  
                  <div className="sm:w-80 cursor-pointer overflow-hidden group relative w-full p-1 border border-zinc-800 rounded bg-zinc-900 shadow">
          <div className="h-56 border-b border-zinc-800">
          <video className="w-full h-full object-cover object-center" src={data?.vedio.url} ></video>
          </div>
         <div className="absolute bg-[#36353581] duration-300 group-hover:translate-x-0 translate-x-96 z-30 top-0 left-0 h-full w-full  flex justify-center items-center ">
         <h1 className="text-lg p-2 leading-6 ">{data?.name}</h1>
         </div>
     </div>
                  </Link>}</>
                         }
    
          </div>
     ))
   }
       {/* ///vedios and photos   */}

      






      </div>
  )
}

export default Home_Vedio
