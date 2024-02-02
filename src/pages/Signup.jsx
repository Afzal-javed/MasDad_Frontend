import React, { useState } from 'react'
import loginImage from "../assets/logos/loginImage.jpg";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../config/firebase_config';
import { useDispatch } from 'react-redux';
import { register } from '../redux/userSlice';


const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        fullName: "",
        email: "",
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
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if (!data.fullName || !data.email || !data.password) {
                return toast("Please fill all the required filled");
            }
            const createdUser = await createUserWithEmailAndPassword(auth, data.email, data.password);
            const user = createdUser.user;
            await sendEmailVerification(user)
            dispatch(register(data))
            navigate(`/email-verify`);
        }
        catch (error) {
            console.log("kuch gadbad hai")
            toast("Server Issue try after some time");
        }
    }
    return (
        <div className='w-full bg-slate-300 h-screen flex items-center justify-center'>
            <div className='bg-white w-[70%] p-4 rounded-3xl shadow-xl flex'>
                <div className='w-[50%] overflow-hidden'>
                    <img className='object-cover' src={loginImage} alt='images' />
                </div>
                <div className='flex flex-col w-[50%]'>
                    <h1 className='w-full text-center my-3 text-3xl font-bold text-slate-800'>Welcome</h1>
                    <form className='flex flex-col w-full' onSubmit={handleRegister}>
                        <div className='flex flex-col gap-0.5 my-2'>
                            <label htmlFor='fullName' className='text-lg items-start'>FullName</label>
                            <input type='text' id='fullName' name='fullName' required value={data.fullName} onChange={handleChange} className='w-[90%] bg-white  p-1 border-b-2 capitalize outline-none ' placeholder='Enter Your fullName...' />
                        </div>
                        <div className='flex flex-col gap-0.5 my-2'>
                            <label htmlFor='email' className='text-lg items-start'>Email</label>
                            <input type='email' id='email' name='email' required value={data.email} onChange={handleChange} className='w-[90%] bg-white  p-1 border-b-2  outline-none ' placeholder='Enter Your Email...' />
                        </div>
                        <div className='flex flex-col gap-0.5 my-2'>
                            <label htmlFor='password' className='text-lg items-start'>Password</label>
                            <input type='password' id='password' name='password' required value={data.password} onChange={handleChange} className='w-[90%] bg-white  p-1 border-b-2  outline-none ' placeholder='Enter Your Password...' />
                        </div>
                        {data.password.length > 0 &&
                            <div className='w-full flex flex-col items-start justify-center'>
                                <p className='text-sm font-semibold text-slate-500'>Password length atleast 8</p>
                                <p className='text-sm font-semibold text-slate-500'>Password must be contain one uppercase</p>
                                <p className='text-sm font-semibold text-slate-500'>Password must be contain one lowercase</p>
                            </div>}
                        <div className='w-full flex items-center justify-center mt-5'>
                            <button type='submit' className='w-[10rem] p-2  transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-blue-950 duration-300  rounded-full text-center text-white text-lg font-semibold'>Register</button>
                        </div>
                    </form>
                    <div className='w-full flex items-center justify-center mt-3'>
                        <p className='text-lg'>Already have an account ? <span className='text-blue-700 cursor-pointer' onClick={() => navigate("/login")}>Login</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup