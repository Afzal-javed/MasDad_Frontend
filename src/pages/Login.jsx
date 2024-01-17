import React, { useState } from 'react'
import signImage from "../assets/logos/signupImage.jpg";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { login } from '../redux/userSlice';
import { toast } from 'react-hot-toast';
const Login = () => {
    const userData = useSelector((state) => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: userData?.email || "",
        password: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (!data.email || !data.password) {
                return toast("Please fill all the required filled")
            }
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/login`, data);
            if (res.status === 200) {
                toast("User Login Successfully");
                dispatch(login(res?.data))
                navigate("/");
            }
        } catch (error) {
            console.log(error?.response?.status);
            if (error?.response?.status === 400) {
                toast(error?.response?.data)
            }
            if (error?.response?.status === 404) {
                toast(error?.response?.data)
            }
            if (error?.response?.status === 500) {
                toast(error?.response?.data)
            }
        }
    }
    return (
        <div className='w-full bg-slate-300 h-screen flex items-center justify-center'>
            <div className='bg-white w-[70%] p-4 rounded-3xl shadow-xl flex'>
                <div className='flex flex-col w-[50%]'>
                    <h1 className='w-full text-center my-5 text-3xl font-bold text-slate-800'>Login</h1>
                    <form className='flex flex-col w-full ml-4' onSubmit={handleLogin}>
                        <div className='flex flex-col gap-0.5 my-2'>
                            <label htmlFor='email' className='text-lg items-start'>Email</label>
                            <input type='email' id='email' autoComplete='off' name='email' value={data.email} onChange={handleChange} className='w-[90%] bg-white  p-1 border-b-2  outline-none ' placeholder='Enter Your Email...' />
                        </div>
                        <div className='flex flex-col gap-0.5 my-2'>
                            <label htmlFor='password' className='text-lg items-start'>Password</label>
                            <input type='password' id='password' name='password' value={data.password} onChange={handleChange} className='w-[90%] bg-white  p-1 border-b-2  outline-none ' placeholder='Enter Your Password...' />
                        </div>
                        <div className='w-full flex items-center justify-center mt-5'>
                            <button type='submit' className='w-[10rem] p-2  hover:bg-blue-950  bg-blue-700 rounded-full text-center text-white text-lg font-semibold'>Login</button>
                        </div>
                    </form>
                    <div className='w-full flex items-center justify-center mt-6'>
                        <p className='text-lg'>Do not have an account ? <span className='text-blue-700 cursor-pointer' onClick={() => navigate("/signup")}>Register</span></p>
                    </div>
                </div>
                <div className='w-[50%] overflow-hidden'>
                    <img className='object-cover' src={signImage} alt='images' />
                </div>
            </div>
        </div>
    )
}

export default Login