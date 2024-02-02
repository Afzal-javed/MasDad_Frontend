import React from 'react'

const PlanCard = ({ plan, newArea, amount, basicCost }) => {
    return (
        <div className='my-4 w-[32%]  shadow-lg flex flex-col items-center rounded-xl bg-slate-300'>
            <h1 className='w-full h-[3rem] bg-slate-700 text-xl rounded-t-xl flex items-center justify-center mb-3 text-white font-semibold text-center p-2' >{plan}</h1>
            <div className='w-full flex my-2'>
                <p className='w-[50%] text-lg ml-5 font-semibold'>Total Buildup Area :-</p>
                <span className='text-xl font-bold text-red-700 ml-auto mr-4'>{newArea}<span className='text-black'>sqft</span></span>
            </div>
            <div className='w-full flex my-2'>
                <p className='w-[40%] text-lg ml-5 font-semibold'>Total Amount :-</p>
                <span className='text-xl font-bold text-red-700 ml-auto mr-4'><span className='text-black'>₹ :</span>{amount}</span>
            </div>
            <div className='w-full mb-4 flex'>
                <p className='w-[40%] text-lg ml-5 font-semibold'>Cost Calculated :-</p>
                <span className='text-xl font-bold text-red-700 ml-auto mr-4'><span className='text-black'>Rs : </span>{basicCost}/sqft</span>
            </div>
        </div>
    )
}

export default PlanCard