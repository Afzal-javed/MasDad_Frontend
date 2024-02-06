import React from 'react'

const SelectCard = ({ divStyle, label, labelFor, labelStyle, selectStyle, value, onChange, list, id }) => {
    return (
        <div className={`${divStyle} flex mb-8`}>
            <label htmlFor={labelFor} className={`${labelStyle} text-lg font-semibold mx-2`}>{label}</label>
            <select id={id} value={value} onChange={onChange} className={`${selectStyle} p-2 outline-none shadow-lg `}>
                {
                    list.map((item, index) => (
                        <option className='text-lg p-2' value={item.key} key={index}>{item.value}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default SelectCard