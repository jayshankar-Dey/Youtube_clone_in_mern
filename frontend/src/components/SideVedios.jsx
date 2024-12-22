/* eslint-disable react/prop-types */

import { Link } from "react-router-dom"



// eslint-disable-next-line react/prop-types
const SideVedios = ({video}) => {
  console.log(video)
  return (
    <Link to={`${video?.playlists?`/Playlist/Videos/${video?._id}`:`${video?.isimage?"":`/single/vedio/${video?._id}`}`}`} className={`${video?.isimage==false&&"cursor-pointer"} rounded border border-zinc-700 p-2 mb-2 bg-zinc-900 flex lg:flex-row flex-col gap-x-2 justify-between`}>
         <div className='lg:h-32 h-60 w-full lg:w-52  relative  '>
     {
      video?.image?<img className="w-full h-full  object-cover object-center " src={video?.image?.url}  ></img>:<>
      {video?.playlists?<img className="w-full cursor-pointer h-full object-cover object-center " src={"https://cdn.pixabay.com/photo/2015/06/24/02/12/the-blurred-819388_1280.jpg"}></img>:<video className="w-full cursor-pointer h-full object-cover object-center " src={video?.vedio.url} muted ></video>}
      </>

     }
      {video?.playlists&&<div className="absolute  border border-zinc-700 rounded z-20 bottom-0 left-0 bg-zinc-800 flex justify-center items-center gap-x-2 text-zinc-200 lg:text-xl w-full h-14">
                <h1><ion-icon name="play"></ion-icon></h1>
                <h1>Playlist</h1>
       </div>}

     </div>
     <div className="w-full lg:w-72 flex flex-col gap-y-2 justify-start px-1 lg:text-sm text-lg pt-2 text-zinc-200">
        {
          video?.isimage?<h1>{video?.text}</h1>:<h1>{video?.name}</h1>
        }
       <div className="flex gap-x-4">
       <span className="text-sm text-zinc-500">2k vews</span>
       <span className="text-sm text-zinc-500">25k Like</span>
       </div>
       <Link to={`/Channel/${video?.user}`} className='flex gap-x-3 lg:pt-1 pt-3 items-center'>
                {
                  video?.profile? <img src={video?.profile} alt=""  className='h-7 rounded-full w-7'/>: <img src="https://static.vecteezy.com/system/resources/previews/003/715/527/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-vector.jpg" alt=""  className='h-7 rounded-full w-7'/>
                }
                 <div >
                   <h3 className='text-sm m-0'>{video?.username}</h3>
                 </div>
          </Link>
     </div>
      
    </Link>
  )
}

export default SideVedios
