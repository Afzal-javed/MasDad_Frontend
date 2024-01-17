import React from 'react'
import Footer from '../components/Footer'
import RightCol from '../components/RightCol'
import LeftCol from '../components/LeftCol'

const Home = () => {

    return (
        <>
            <div className='flex items-center p-4 gap-4 w-full h-screen  bg-[lightblue]'>
                <div className='w-[50%]'>
                    <LeftCol />
                </div>
                <div className='w-[50%]'>
                    <RightCol />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home