import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

const UploadDoc = () => {
    const [file, setFile] = useState(null);
    const [base64String, setBase64String] = useState('');
    const [data, setData] = useState({
        name: "",
        category: "",
        length: "",
        breadth: "",
    })
    const totalArea = (data.length * data.breadth).toString();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile instanceof Blob) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64String(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(selectedFile);
        }
    };
    const handleUpload = async (e) => {
        e.preventDefault();
        if (!data.name || !data.category || !data.length || !data.breadth) {
            return toast("Please fill all the required field");
        }
        try {
            const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/pdf/upload`, {
                name: data.name,
                category: data.category,
                length: data.length,
                breadth: data.breadth,
                totalArea: totalArea,
                pdf: base64String,
            })
            if (res?.status === 200) {
                toast("Document uploaded Successfully")
                setData(() => {
                    return {
                        name: "",
                        length: "",
                        category: "",
                        breadth: "",
                    }
                });
                setFile(null);
            }
        } catch (error) {
            if (error?.response?.statue === 404) {
                toast(error?.response?.data)
            }
            if (error?.response?.statue === 500) {
                toast(error?.response?.data)
            }
        }
    }
    return (
        <div className='w-full bg-yellow-700 h-screen p-4 flex items-center justify-center'>
            <div className='w-[60%] bg-white rounded-3xl p-3 flex flex-col items-center'>
                <h1 className='my-4 text-3xl font-bold'>Upload PDF</h1>
                <form className='w-full flex flex-col items-center rounded-xl' onSubmit={handleUpload}>
                    <div className='w-full flex items-center justify-between p-2 gap-1'>
                        <div className='w-[40%] flex flex-col gap-1'>
                            <label htmlFor='name' className='item-start text-lg'>Name</label>
                            <input type='text' id='name' name='name' value={data.name} onChange={handleChange} className='p-1.5 w-full rounded-lg outline-none border-b-2 capitalize' placeholder='Enter the document name...' />
                        </div>
                        <div className='w-[40%] flex flex-col gap-1'>
                            <label htmlFor='category' className='item-start text-lg'>Category</label>
                            <select className='p-1.5 outline-none border-b-2 rounded-lg ' id='category' name='category' value={data.category} onChange={handleChange}>
                                <option>SELECT</option>
                                <option value={"jpg"}>JPG</option>
                                <option value={"pdf"}>PDF</option>
                            </select>
                        </div>
                    </div>
                    <div className='w-full flex items-center justify-between p-2 gap-1'>
                        <div className='w-[40%]'>
                            <label htmlFor='length' className='item-start text-lg'>Length</label>
                            <input type='number' id='length' name='length' value={data.length} onChange={handleChange} className='p-1.5 w-full rounded-lg outline-none border-b-2 capitalize' placeholder='Enter the length...' />
                        </div>
                        <div className='w-[40%]'>
                            <label htmlFor='breadth' className='item-start text-lg'>Breadth</label>
                            <input type='number' id='breadth' name='breadth' value={data.breadth} onChange={handleChange} className='p-1.5 w-full rounded-lg outline-none border-b-2 capitalize' placeholder='Enter the breadth...' />
                        </div>
                    </div>
                    <div className='mt-3'>
                        <input className='my-4' type='file' accept='.pdf,.jpg' onChange={handleFileChange} />
                    </div>
                    <div className='w-full flex items-center justify-center my-5'>
                        <button type='submit' className='w-[10rem] p-2  hover:bg-yellow-900  bg-yellow-700 rounded-full text-center text-white text-lg font-semibold'>Upload</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default UploadDoc