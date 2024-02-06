import React, { useState } from 'react'
import toast from 'react-hot-toast'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState('');
    const [resetPassword, setResetPassword] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [showOtpButton, setShowOtpButton] = useState(false)
    const [showPasswordInput, setShowPasswordInput] = useState(false);

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            if (!resetPassword.newPassword || !resetPassword.confirmPassword) {
                return toast("Please enter the Password")
            } else {
                if (resetPassword.newPassword !== resetPassword.confirmPassword) {
                    return toast("Confirm Password does not match with new Password")
                } else {
                    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/confirm-password`, {
                        email: email,
                        newPassword: resetPassword.newPassword
                    })
                    if (res.status === 200) {
                        toast(res?.data)
                        navigate("/login")
                    }
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
    const handlePasswordChange = (e) => {
        const { name, value } = e.target
        setResetPassword((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const generateOTP = async () => {
        try {
            if (!email) {
                return toast("Please enter the email")
            }
            else {
                const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/otp`, { email })
                if (res.status === 200) {
                    toast(res.data)
                    setShowOtpButton(true)
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
    const resendOTP = () => {
        setShowOtpButton(false);
        setShowPasswordInput(false);
    }
    const verifyOtp = async () => {
        try {
            if (!otp) {
                return toast("Please enter the otp first")
            } else {
                const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/verify-otp`, { email: email, otp: otp })
                if (res.status === 200) {
                    toast(res.data)
                    setShowPasswordInput(true)
                }
            }
        } catch (error) {
            if (error.response.status === 400) {
                toast(error?.response?.data)
            }
            if (error?.response?.status === 500) {
                toast(error?.response?.data)
            }
        }
    }

    return (
        <div className='w-full h-full mt-5 center p-2'>
            <div className='w-[60%] m-auto flex flex-col items-center justify-center p-2 rounded-2xl shadow-lg'>
                <h1 className='w-full text-center my-5 text-3xl font-bold text-slate-800'>Reset Password</h1>
                <form className='w-full flex flex-col items-center' onSubmit={handlePasswordReset}>
                    <div className='w-full flex flex-col items-center gap-0.5 my-2'>
                        <label htmlFor='email' className='w-[90%] text-lg items-start'>Email</label>
                        <input type='email' id='email' autoComplete='off' name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-[90%] bg-white  p-1 border-b-2  outline-none ' placeholder='Enter Your Email...' />
                    </div>
                    <div className='p-3 gap-2 flex flex-col items-center justify-center'>
                        <button type='button' onClick={generateOTP} className={`w-[10rem] my-2 text-lg p-2 bg-black text-white cursor-pointer transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-200 rounded-lg ${showOtpButton && 'hidden'}`}>Sent OTP</button>
                    </div>
                    {
                        showOtpButton && <>
                            <div className='w-full flex flex-col items-center gap-0.5 my-2'>
                                <label htmlFor='otp' className='w-[90%] text-lg items-start'>OTP</label>
                                <input type='text' id='otp' autoComplete='off' name='otp' value={otp} onChange={(e) => setOtp(e.target.value)} className='w-[90%] bg-white  p-1 border-b-2  outline-none ' placeholder='Enter OTP...' />
                            </div>
                            <div className='p-3 gap-2 flex flex-col items-center justify-center'>
                                <button type='button' onClick={verifyOtp} className={`w-[10rem] my-2 text-lg p-2 bg-black text-white cursor-pointer transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-200 rounded-lg ${showPasswordInput && 'hidden'}`}>Verify OTP</button>
                            </div>
                            {
                                (showPasswordInput && showOtpButton) &&
                                <>
                                    <div className='w-full flex flex-col items-center gap-0.5 my-2'>
                                        <label htmlFor='newPassword' className='w-[90%] text-lg items-start'>New Password</label>
                                        <input type='password' id='newPassword' autoComplete='off' name='newPassword' onChange={handlePasswordChange} className='w-[90%] bg-white  p-1 border-b-2  outline-none ' placeholder='Enter Your New Password...' />
                                    </div>
                                    <div className='w-full flex flex-col items-center gap-0.5 my-2'>
                                        <label htmlFor='confirmPassword' className='w-[90%] text-lg items-start'>Confirm Password</label>
                                        <input type='password' id='confirmPassword' autoComplete='off' name='confirmPassword' onChange={handlePasswordChange} className='w-[90%] bg-white  p-1 border-b-2  outline-none ' placeholder='Enter Your Confirm Password...' />
                                    </div>
                                    <div className='p-3 gap-2 flex flex-col items-center justify-center'>
                                        <button type='' className='w-[10rem] my-2 text-lg p-2 bg-black text-white cursor-pointer transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-200 rounded-lg'>Update Password</button>
                                    </div>
                                </>
                            }
                        </>
                    }
                </form>
                {showOtpButton &&

                    <div className='w-full flex items-center justify-center my-4'>
                        <p className='text-lg text-blue-700 cursor-pointer' onClick={resendOTP}>Resend OTP</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default PasswordReset