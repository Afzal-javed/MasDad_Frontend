import React from 'react'
import { IoLogoWhatsapp } from "react-icons/io"
import { BiSolidPhoneCall } from "react-icons/bi"
const LeftCol = () => {
    const handleWhatsappClick = () => {
        const whatsappNumber = '8009205951';
        const whatsappUrl = `https://wa.me/${whatsappNumber}`;
        window.open(whatsappUrl, '_blank');
    };
    const handlePhoneCallClick = () => {
        const phoneNumber = '8009205951';
        const telUrl = `tel:${phoneNumber}`;
        window.open(telUrl, '_blank');
    };
    return (
        <div className='w-full'>
            <p className=' text-lg text-justify'><span className='text-3xl font-bold serif'>T</span>he MAS-DAD , MAS drawing and design helping you to plan you dream home with our experienced services.</p>
            <p className=' text-lg text-justify'>
                Want to build your dream home ,start now with us feel free to discuss with us about your ideas we try to build your dream home as per your requirement
                No need to visit daily on site you can monitor your construction work through e monitoring medium , daily progress report (image , video , chart ) is being shared with you.
            </p>
            <div className='grid grid-cols-2 p-3'>
                <p className='text-lg font-semibold'>1-DRAWING</p>
                <p className='text-lg font-semibold'>2-DESIGN</p>
                <p className='text-lg font-semibold'>3-CUNSTRUCTION</p>
                <p className='text-lg font-semibold'>4-RENOVATION</p>
                <p className='text-lg font-semibold'>5-INTERIOR DESIGN</p>
                <p className='text-lg font-semibold'>6-BUILDING MATERIAL & FITTING</p>
            </div>
            <div className='mt-3 flex items-center gap-4'>
                <p className='text-lg font-semibold '>Book a free consultation :-</p>
                <span className='text-3xl cursor-pointer text-blue-800' onClick={handlePhoneCallClick}><BiSolidPhoneCall /></span>
                <span className='text-3xl cursor-pointer text-green-700' onClick={handleWhatsappClick}><IoLogoWhatsapp /></span>
            </div>
        </div>
    )
}

export default LeftCol