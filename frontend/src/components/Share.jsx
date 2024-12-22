/* eslint-disable react/prop-types */
import {  FacebookShareButton, TelegramShareButton, TwitterShareButton, WhatsappShareButton } from "react-share"


const Share = ({url}) => {
  return (
    <>
       <WhatsappShareButton  url={url}>
                       <div title="Whatsapp" className="w-10 h-10 border shadow-lg shadow-green-500 border-zinc-300 bg-green-500 flex items-center justify-center rounded-full">
                       <ion-icon name="logo-whatsapp"></ion-icon>
                       </div>
    </WhatsappShareButton>

    <FacebookShareButton  url={url}>
                       <div title="FaceBook" className="w-10 h-10 border shadow-lg shadow-blue-500 border-zinc-300 bg-blue-600 flex items-center justify-center rounded-full">
                       <ion-icon name="logo-facebook"></ion-icon>
                       </div>
    </FacebookShareButton>

    <TwitterShareButton  url={url}>
                       <div title="Twitter" className="w-10 text-blue-500 h-10 border shadow-lg shadow-zinc-500 border-zinc-300 bg-white flex items-center justify-center rounded-full">
                       <ion-icon name="logo-twitter"></ion-icon>
                       </div>
    </TwitterShareButton>

    <TelegramShareButton  url={url}>
                       <div title="telegram" className="w-10 text-red-500 h-10 border shadow-lg shadow-zinc-600 border-zinc-600 bg-zinc-950 flex items-center justify-center rounded-full">
                       <img src="https://cdn-icons-png.flaticon.com/512/4926/4926616.png" alt="" />
                       </div>
    </TelegramShareButton>
    </>
  )
}

export default Share
