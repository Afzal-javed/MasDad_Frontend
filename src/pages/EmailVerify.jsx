import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { auth } from '../config/firebase_config';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import { register } from '../redux/userSlice';

const EmailVerify = () => {
    const navigate = useNavigate();
    const [isVerified, setIsVerified] = useState(false);
    const [uid, setUid] = useState("");
    const data = useSelector((state) => state.user)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((userData) => {
            setUid(userData.uid);
            setIsVerified(userData?.emailVerified || false);
        });
        return () => unsubscribe();
    }, []);
    const handleVerification = async () => {
        if (isVerified) {
            try {
                const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/user/register`, {
                    fullName: data.fullName,
                    email: data.email,
                    password: data.password,
                    uid: uid
                });
                if (res.status === 200) {
                    toast(res?.data);
                    navigate("/login");
                }
            } catch (error) {
                if (error?.response?.status === 400) {
                    toast(error?.response?.data)
                }
                if (error?.response?.status === 500) {
                    toast(error?.res?.data)
                }
            }

        } else {
            toast("Please verify first and refresh the Page")
        }
    }
    // useEffect(() => {
    //     function isVerify() {
    //         auth.onAuthStateChanged((userData) => {
    //             console.log(userData);
    //             setIsVerified(userData.emailVerified);
    //         })
    //     }
    //     isVerify();
    // }, [handleVerification])
    return (
        <div className='w-full flex items-center justify-center p-2'>
            <div className='w-[45%] m-auto  p-2 rounded-2xl shadow-lg'>
                <div className='p-3 gap-2 flex flex-col items-center justify-center'>
                    <p className='text-lg my-1 font-semibold '>We have send the verification link on this email <span>{data.email}</span></p>
                    <button className='w-[10rem] my-2 text-lg p-2 bg-black text-white cursor-pointer transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-200 rounded-lg' onClick={handleVerification}>Back to login</button>
                </div>
            </div>
        </div>
    )
}

export default EmailVerify