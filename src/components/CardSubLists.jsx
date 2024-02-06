import React from 'react'

const CardSubLists = ({ subLists }) => {
    return (
        <div className='w-full p-0.5 ml-10'>
            <ul className='text-lg list-disc cursor-default'>
                {
                    typeof subLists === 'string' ? <li>{subLists}</li>
                        : (
                            <li className='w-[90%] font-semibold'>{subLists.subTitle}<span className='list-none font-light'>{subLists.subList}</span></li>
                        )
                }
            </ul>
        </div>
    )
}

export default CardSubLists