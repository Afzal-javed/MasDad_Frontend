import React from 'react'

const Button = ({ type, buttonName, style, onClick }) => {
    return (

        <button type={type} onClick={onClick} className={`my-2 text-lg p-2 bg-black text-white cursor-pointer transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-200 rounded-lg ${style}`}>{buttonName}</button>

    )
}

export default Button