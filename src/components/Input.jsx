import React from 'react'

const Input = ({ label, labelStyle, inputStyle, labelFor, divStyle, type, value, onChange, key, name, placeholder }) => {
    return (
        <div className={`flex items-center gap-0.5 my-2 ${divStyle}`} key={key}>
            <label htmlFor={labelFor} className={`${labelStyle} text-lg items-start`}>{label}</label>
            <input type={type} id={labelFor} autoComplete='off' value={value} onChange={onChange} name={name} className={`${inputStyle}  p-1 border-b-2  outline-none`} placeholder={placeholder} />
        </div>
    )
}

export default Input