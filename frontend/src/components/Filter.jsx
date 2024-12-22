import { Link } from "react-router-dom"


const Filter = () => {
  return (
    <>
    <div className="flex text-white px-2 w-80 sm:w-full mx-auto lg:w-[70vw]  items-center mt-2">
    <button onClick={()=>{
        document.getElementById("list").scrollLeft = 0;
    }} className="bg-white text-black h-9 w-14 shadow-md border rounded font-semibold">All</button>
        <div id="list" className=" text-zinc-200 duration-200  gap-x-2 overflow-scroll px-3 flex items-center md:w-[40rem] w-96 lg:w-[60rem] mx-auto h-full *:bg-zinc-900  text-sm ">
        <Link to={`/search?q=Trending`} className="flex items-center hover:bg-zinc-800  gap-x-6 lg:text-lg p-2 rounded-xl">
       <span><ion-icon name="flame-outline"></ion-icon></span>
       <h2 className={`w-28`} >Trending</h2>
       </Link>
       <Link to={`/search?q=Music`} className="flex hover:bg-zinc-800 duration-300 items-center   gap-x-6 lg:text-lg p-2 rounded-xl">
       <span><ion-icon name="musical-notes-outline"></ion-icon></span>
       <h2 className={`w-28`}>Music</h2>
       </Link>
       <Link to={`/search?q=Movies`} className="flex items-center hover:bg-zinc-800  gap-x-6 lg:text-lg p-2 rounded-xl">
       <span><ion-icon name="tv-outline"></ion-icon></span>
       <h2 className={`w-40`} >Movies & Tv</h2>
       </Link>
      
       <Link to={`/search?q=Gaming`} className="flex hover:bg-zinc-800 duration-300 items-center   gap-x-6 lg:text-lg p-2 rounded-xl">
       <span><ion-icon name="game-controller-outline"></ion-icon></span>
       <h2 className={``}>Gaming</h2>
       </Link>
       <Link to={`/search?q=News`} className="flex items-center hover:bg-zinc-800  gap-x-6 lg:text-lg p-2 rounded-xl">
       <span><ion-icon name="newspaper-outline"></ion-icon></span>
       <h2 className={`w-28`} >News</h2>
       </Link>
       <Link to={`/search?q=Sports`} className="flex hover:bg-zinc-800 duration-300 items-center   gap-x-6 lg:text-lg p-2 rounded-xl">
       <span><ion-icon name="trophy-outline"></ion-icon></span>
       <h2 className={`w-28`}>Sports</h2>
       </Link>

       <Link to={`/search?q=learning`} className="flex items-center hover:bg-zinc-800  gap-x-6 lg:text-lg p-2 rounded-xl">
       <span><ion-icon name="ellipse-outline"></ion-icon></span>
       <h2 className={`w-28`} >Learning</h2>
       </Link>
       <Link to={`/search?q=Fashion`} className="flex hover:bg-zinc-800 duration-300 items-center   gap-x-6 lg:text-lg p-2 rounded-xl">
       <span><ion-icon name="ribbon-outline"></ion-icon></span>
       <h2 className={`w-52`}>Fashion & beauty</h2>
       </Link>
       <Link to={`/search?q=Podcasts`} className="flex items-center hover:bg-zinc-800  gap-x-6 lg:text-lg p-2 rounded-xl">
       <span><ion-icon name="watch-outline"></ion-icon></span>
       <h2 className={`w-28`} >Podcasts</h2>
       </Link>
        </div>
        <button onClick={()=>{
            const list = document.getElementById('list');
            list.scrollLeft +=50
        }} className=" text-white h-9 w-14 shadow-md  bg-zinc-800 rounded font-semibold"><ion-icon name="chevron-forward-outline"></ion-icon></button>
    </div>
    </>
  )
}

export default Filter
