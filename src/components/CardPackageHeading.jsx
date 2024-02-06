import React from 'react'

const CardPackageHeading = ({ packagePlan, perFeet }) => {
    return (
        <div className='w-full h-[8rem] flex flex-col items-center justify-center text-white gap-3 bg-black  rounded-t-xl'>
            <h1 className='text-3xl font-semibold cursor-default'>{packagePlan}</h1>
            <p className='text-2xl font-semibold'>{perFeet}/Sqft</p>
        </div>
    )
}

export default CardPackageHeading