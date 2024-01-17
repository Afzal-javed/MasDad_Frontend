import React from 'react'
import jpgLogo from "../assets/logos/jpgLogo.png";
import pdfLogo from "../assets/logos/pdf-uploader.png";
import { IoMdDownload } from "react-icons/io";
const Card = ({ docName, length, breadth, totalArea, category }) => {
    return (
        <div className='w-[10rem] bg-white rounded-xl cursor-pointer'>
            <div className=' flex flex-col items-center'>
                {
                    category === "jpg" ?
                        <img src={jpgLogo} alt='pdf' />
                        :
                        <img src={pdfLogo} className='p-2' alt='pdf' />
                }
                <span className='flex items-center text-3xl gap-4 '>
                    <p className='text-lg font-semibold'>{docName}</p>
                    <IoMdDownload />
                </span>
                <p className='text-lg'>{length} X {breadth}</p>
                <p className='text-lg mb-2'>{totalArea}</p>
                <span> </span>
            </div>

        </div>
    )
}

export default Card