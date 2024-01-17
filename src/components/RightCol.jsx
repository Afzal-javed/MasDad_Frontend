import React, { useEffect, useState } from 'react'
import image1 from "../assets/images/image1.jpg";
import image2 from "../assets/images/image2.jpg";
import image3 from "../assets/images/image3.jpg";
import image4 from "../assets/images/image4.jpg";
import image5 from "../assets/images/image5.jpg";
import image6 from "../assets/images/image6.jpg";
import image7 from "../assets/images/image7.jpg";
import image8 from "../assets/images/image8.jpg";
import image9 from "../assets/images/image9.jpg";
import image11 from "../assets/images/image11.jpg";
import image12 from "../assets/images/image12.jpg";
import image13 from "../assets/images/image13.jpg";
import image14 from "../assets/images/image14.jpg";
import image15 from "../assets/images/image15.jpg";
import image16 from "../assets/images/image16.jpg";
import image17 from "../assets/images/image17.jpg";
import image18 from "../assets/images/image18.jpg";
import image19 from "../assets/images/image19.jpg";
import image20 from "../assets/images/image20.jpg";
import image21 from "../assets/images/image21.jpg";
import image22 from "../assets/images/image22.jpg";
import image23 from "../assets/images/image23.jpg";
import image24 from "../assets/images/image24.jpg";
import image25 from "../assets/images/image25.jpg";
import image26 from "../assets/images/image26.jpg";
const RightCol = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image11, image12, image13, image14, image15, image16, image17, image18, image19, image20, image21, image22, image23, image24, image25, image26];

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 2000);
        return () => clearInterval(intervalId);
    }, [images.length]);
    return (
        <>
            <div className='flex items-center justify-center mb-4'>
                <p className='text-lg font-semibold '>You can see your plan here soon</p>
            </div>
            <div className='w-full h-[28rem] overflow-hidden rounded-2xl'>
                <img className='object-cover rounded-2xl' src={images[currentImageIndex]} alt='images' />
            </div>
        </>
    )
}

export default RightCol