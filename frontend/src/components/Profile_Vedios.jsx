/* eslint-disable react/prop-types */
import Your_Vedio from "./Your_Vedio"


const Profile_Vedios = ({vedios}) => {
  // console.log(vedios)
  return (
    <div className="p-5   flex flex-col gap-y-2  md:w-[70%] mx-auto">
        
        {
        vedios.length==0&&<h1 className="text-zinc-300">No video found..</h1>
       }
          {
            vedios?.map((vedio,i)=>(
              <Your_Vedio key={i} vedioid={vedio?._id} vedio={vedio}/>
            ))
          }


      </div>
  )
}

export default Profile_Vedios
