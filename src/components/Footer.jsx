import React from 'react'
import { BsYoutube } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { AiFillInstagram, AiFillFacebook } from "react-icons/ai";
const Footer = () => {
    return (
        <div className=' w-full p-2 bg-black flex flex-col items-center justify-center'>
            <div className='flex gap-3 text-white'>
                <span className='text-3xl cursor-pointer' onClick={() => window.open('https://youtube.com/@masdrawingdesign5582?si=degYS48u9Y8qqQtJ')}> <BsYoutube /></span>
                <span className='text-3xl cursor-pointer' onClick={() => window.open('mailto:imashelp@gmail.com')}> <MdEmail /></span>
                <span className='text-3xl cursor-pointer' onClick={() => window.open('https://instagram.com/masdrawingdesign?igshid=MmVlMjlkMTBhMg==')}> <AiFillInstagram /></span>
                <span className='text-3xl cursor-pointer' onClick={() => window.open('https://www.facebook.com/masdrawingndesign?mibextid=ZbWKwL')}> <AiFillFacebook /></span>
            </div>
            <div className='text-white'>
                <p className='text-xs'>Shaikh_Afzal 2023 @all right reserved</p>
            </div>
        </div>
    )
}

export default Footer