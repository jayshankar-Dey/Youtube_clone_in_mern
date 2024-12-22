/* eslint-disable react/prop-types */
import Photo from "./Photo"


const Community = ({community,setchange}) => {
  //console.log(community)
  return (
    <div className="p-5 flex flex-wrap justify-center gap-x-2 gap-y-2 ">
       {
        community.length==0&&<h1 className="text-zinc-300">No photo found..</h1>
       }
      {
        community.map((photo) => (
          <Photo key={photo._id} photo={photo} setchange={setchange} />
        ))

         // <Photo/>
      }
      </div>
  )
}

export default Community
