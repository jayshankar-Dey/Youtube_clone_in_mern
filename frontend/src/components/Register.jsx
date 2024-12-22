import { useDispatch } from "react-redux"
import { islogin } from "../redux/LoginSlice"
import { useEffect, useState } from "react"
import {  toast } from 'react-toastify';
import axios from 'axios'
import { setChange } from "../redux/ChangeSlice";

// eslint-disable-next-line no-unused-vars
const Register = () => {
  const base="http://localhost:8000/api"
 
    const dispatch=useDispatch()
    const [Otp,setOtp]=useState(false)
    const [otp,setotp]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const [name,setName]=useState("")
    const[token,setToken]=useState("")
    const[time,setTime]=useState("0")


    const handleRegistration=async(e)=>{
          e.preventDefault()
          if(!name)return toast.warn("please enter your name")
            if(!email)return toast.warn("please enter your email")
              if(!password)return toast.warn("please enter your Password")

                ///axios
                const res=await axios.post(`${base}/register`,{name,email,password})
                if(res.data.success){
                  toast.success(res.data.message)
                  setOtp(true)
                  setToken(res.data.token)
                }else{
                  toast.error(res.data.message)
                }
    }
  ///verify otp
  const verifyOtp=async(e)=>{
    e.preventDefault()
    if(!otp)return toast.warn("please enter otp")
        ///axios
    const res=await axios.post(`${base}/verify/otp`,{email, otp, token })
    if(res.data.success){
      toast.success(res.data.message)
      setOtp(false)
      setToken(res.data.token)
      localStorage.setItem("yo",res.data.Token)
      dispatch(islogin(false))
      dispatch(setChange(res.data))
      setTime("")
    }else{
      toast.error(res.data.message)
    }
   // console.log(res.data)

  }

  useEffect(() => {
    let data=0
    const intervalId = setInterval(() => {
      data+=1
      setTime(data)
      if(Number(data)===120){
        setTime(120)
      }
     
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  //console.log(time)
  return (
    <>
        {/* ////otp */}
        {
            Otp?<form onSubmit={verifyOtp} className="text-zinc-300 py-4 w-72 flex flex-col gap-y-2  mx-auto">
            <div className="flex justify-between p-1 py-2">
                <h2 className="font-semibold">Otp</h2>
                <button type="button" onClick={()=>{setOtp(false)}} className="rounded-full px-2 bg-red-500">x</button>
            </div>
           <input type="password" value={otp} onChange={(e)=>setotp(e.target.value)} className="p-3 border placeholder:text-sm border-zinc-600 bg-transparent rounded-md w-full outline-none" placeholder="Enter otp" />
         <div className="flex justify-between items-center">
         <button type="submit" className="w-32 h-10 p-1 border border-zinc-700 rounded-md bg-zinc-950 shadow-lg shadow-zinc-900">Verify</button>
         <p className="text-green-600 text-sm"> <span className="text-red-500">With in 2 min: </span>  {time}s</p>
         </div>
         <div>
          <button type="button" onClick={handleRegistration} className="w-32 h-10 p-1 border border-zinc-700 rounded-md bg-zinc-950 shadow-lg shadow-zinc-900">resend</button>
         </div>
        </form>:<form onSubmit={handleRegistration} className="text-zinc-300 py-4 w-72 flex flex-col gap-y-2  mx-auto">
            {/* /////Register */}
            <div className="flex justify-between p-1 py-2">
                <h2 className="font-semibold">Registar</h2>
                <button type="button" onClick={()=>{dispatch(islogin(false))}} className="rounded-full px-2 bg-red-500">x</button>
            </div>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="p-3 border placeholder:text-sm border-zinc-600 bg-transparent rounded-md w-full outline-none" placeholder="Name" />
           <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  className="p-3 border placeholder:text-sm border-zinc-600 bg-transparent rounded-md w-full outline-none" placeholder="Email" />
           <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  className="p-3 bg-transparent border placeholder:text-sm border-zinc-600 rounded-md w-full outline-none" placeholder="Password" />
          <button type="submit"  className="w-32 h-10 p-1 border border-zinc-700 rounded-md bg-zinc-950 shadow-lg shadow-zinc-900">Otp</button>
         
        </form>
        }
    </>
  )
}

export default Register
