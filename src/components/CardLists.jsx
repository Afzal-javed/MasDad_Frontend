import React, { useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import CardSubLists from './CardSubLists';
import { useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import toast from 'react-hot-toast';
import axios from 'axios';

const CardLists = ({ title, lists, id }) => {
    const [showlists, setShowlists] = useState(false);
    const data = useSelector((state) => state.packageData)
    const userData = useSelector((state) => state.user);
    const handleDelete = async () => {
        try {
            let confirmDel = confirm(`Are you sure want to Delete ${title}`)
            if (confirmDel) {
                const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/package/delete/${id}`)
                if (res?.status === 200) {
                    toast(res?.data);
                }
            }
        } catch (error) {
            if (error?.response?.status === 404) {
                toast(error?.response?.data)
            }
            if (error?.response?.status === 500) {
                toast(error?.response?.data)
            }
        }

    }
    return (
        <div className='w-full p-2 flex flex-col items-start justify-center'>
            <div className='w-full p-2 flex items-center justify-between'>
                <span className='text-xl font-semibold'>{title}</span>
                <div className='flex items-center justify-center gap-6'>
                    {
                        import.meta.env.VITE_EMAIL_ID === userData.email &&
                        <span className='text-3xl text-red-600 font-semibold cursor-pointer' onClick={handleDelete}><MdDelete className='inline-block' /></span>}
                    <span className='text-xl font-semibold cursor-pointer' onClick={() => setShowlists(prev => !prev)}>{showlists ? <FaMinus /> : <FaPlus />}</span>
                </div>

            </div>
            {
                showlists &&
                lists.map((subList, index) => (
                    <CardSubLists
                        key={index}
                        subLists={subList}
                    />
                ))
            }
        </div>
    )
}

export default CardLists