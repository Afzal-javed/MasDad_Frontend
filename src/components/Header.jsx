import React, { useState } from 'react'
import logo from "../assets/logos/logo.png";
import { BiSolidUser } from "react-icons/bi"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { logout } from '../redux/userSlice';
const Header = () => {
    const userData = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const [isShowLogin, setIsShowLogin] = useState(false);
    const [isShowDrawing, setIsShowDrawing] = useState(false);
    const navigate = useNavigate();
    const handleLogout = async () => {
        const userId = userData.id;


        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/logout/${userId}`)
            if (res.status === 200) {
                toast("User Logout successfully");
                dispatch(logout(res.data));
                navigate("/login");
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
        <div className='bg-teal-700 w-full h-14 flex items-center shadow-lg'>
            <div className='ml-4'>
                <img src={logo} className='object-cover overflow-hidden rounded-full' alt='logo' width={45} height={45} />
            </div>
            <div className='ml-6  flex flex-col items-center'>
                <p className='text-2xl font-semibold text-red-800'>MAS<span className='text-white'>-DAD</span></p>
                <p className='text-md italic text-white'>Design your Desire</p>
            </div>
            <nav className='flex gap-6 ml-auto'>
                <div className='list-none'>
                    <li className='text-white text-lg cursor-pointer' onClick={() => navigate("/")}>Home</li>
                </div>
                <div className='relative list-none' onClick={() => setIsShowDrawing(prev => !prev)}>
                    <li className='text-white text-lg cursor-pointer'>Drawing</li>
                    {
                        isShowDrawing &&
                        <div className='absolute right-0 top-10 p-1 bg-slate-300 text-center rounded-md w-[10rem]'>
                            {
                                userData.email === import.meta.env.VITE_EMAIL_ID &&
                                <>
                                    <p className='text-lg text-slate-900 cursor-pointer hover:bg-slate-900 hover:text-white' onClick={() => navigate("/upload-doc")}>UPLOAD FILE</p>
                                </>
                            }
                            <p className='text-lg text-slate-900 cursor-pointer hover:bg-slate-900 hover:text-white' onClick={() => navigate("/drawing")}>JPG</p>
                            <p className='text-lg text-slate-900 cursor-pointer hover:bg-slate-900 hover:text-white' onClick={() => userData.token ? navigate("/drawing") : navigate("/login")}>PDF</p>
                            <p className='text-lg text-slate-900 cursor-pointer hover:bg-slate-900 hover:text-white' onClick={() => userData.token ? navigate("/drawing") : navigate("/login")}>DWG</p>
                            <p className='text-lg text-slate-900 cursor-pointer hover:bg-slate-900 hover:text-white' onClick={() => userData.token ? navigate("/drawing") : navigate("/login")}>SKP</p>
                        </div>}
                </div>
                <div className='list-none'>
                    <li className='text-white text-lg cursor-pointer' onClick={() => navigate("/estimate")}>Estimate</li>
                </div>
                <div className='list-none'>
                    <li className='text-white text-lg cursor-pointer' onClick={() => navigate("/notes")}>Notes</li>
                </div>
                <div className='list-none'>
                    <li className='text-white text-lg cursor-pointer' onClick={() => navigate("/services")}>Services</li>
                </div>
            </nav>
            <div className=' relative mx-6 cursor-pointer' onClick={() => setIsShowLogin(prev => !prev)}>
                <span className='text-3xl text-white ' ><BiSolidUser /></span>
                {
                    isShowLogin &&
                    <div className='absolute -right-2 rounded-md top-10 w-[10rem] p-1 bg-slate-300 text-center'>
                        {
                            userData.token ?
                                <>
                                    <p className='text-lg text-slate-900 hover:bg-slate-900 hover:text-white'>{userData.fullName}</p>
                                    <p className='text-lg text-slate-900 hover:bg-slate-900 hover:text-white' onClick={handleLogout}>Logout</p>
                                </>
                                :
                                <p className='text-lg text-slate-900 hover:bg-slate-900 hover:text-white' onClick={() => navigate("/login")}>Login</p>}
                    </div>
                }
            </div>

        </div>
    )
}

export default Header