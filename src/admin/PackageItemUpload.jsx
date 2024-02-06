import React, { useState } from 'react'
import Button from '../components/Button';
import { FaPlus } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import axiox from "axios"
import Input from '../components/Input';

const PackageItemUpload = () => {
    const [formData, setFormData] = useState({
        title: '',
        planPackage: '',
        list: [{ subTitle: '', subList: '' }],
    });

    const handleChange = (index, field, value) => {
        const updatedList = [...formData.list];
        updatedList[index][field] = value;

        setFormData({
            ...formData,
            list: updatedList,
        });
    };
    const addListItem = () => {
        if (!formData.list[0].subList && !formData.list[0].subTitle) {
            return toast("Atleast Enter the one value")
        }
        setFormData({
            ...formData,
            list: [...formData.list, { subTitle: '', subList: '' }],
        });
    };

    const handleSubmit = async () => {
        try {
            if (!formData.title || !formData.planPackage || !formData.list) {
                return toast("Please filled all required field")
            } else {
                const res = await axiox.post(`${import.meta.env.VITE_SERVER_URL}/api/package/details`, formData)
                if (res.status === 200) {
                    toast(res.data);
                    setFormData({
                        title: '',
                        planPackage: '',
                        list: [{ subTitle: '', subList: '' }],
                    });
                }
            }
        } catch (error) {
            if (error?.response?.status === 500) {
                toast(error?.response?.data);
            }
        }
    };
    return (
        <div className='w-full p-2 m-auto'>
            <div className='w-[70%]  m-auto flex flex-col gap-2 items-center justify-center shadow-xl rounded-xl mt-5'>
                <h1 className='w-full p-4 flex items-center justify-center bg-black text-white text-3xl font-semibold rounded-t-xl'>Add Item</h1>
                <Input
                    label={"Title:-"}
                    labelFor={"title"}
                    labelStyle={'w-[90%]'}
                    type={"text"}
                    divStyle={'flex-col'}
                    name={"title"}
                    placeholder={"Enter the Title..."}
                    inputStyle={'w-[90%]'}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <div className='w-[90%] my-2 flex flex-col items-start'>
                    <label htmlFor='package' className='text-lg items-start'>Package:-</label>
                    <select id='package' onChange={(e) => setFormData({ ...formData, planPackage: e.target.value })} className='w-full p-1 outline-none'>
                        <option>Select Package</option>
                        <option value={"basic-package"}>Basic Package</option>
                        <option value={"premium-package"}>Premium Package</option>
                        <option value={"luxury-package"}>Luxury Package</option>
                    </select>
                </div>
                <div className='w-full flex flex-col mb-10 items-center relative'>
                    {formData.list.map((item, index) => (
                        <>
                            <Input key={index} label={"Sub-Title:-"} labelFor={"subTitle"} labelStyle={'w-[90%]'} divStyle={'flex-col'} type={"text"} value={item.subTitle} name={"subTitle"} onChange={(e) => handleChange(index, 'subTitle', e.target.value)} placeholder={"Enter subTitle"} inputStyle={'w-[90%]'} />
                            <Input key={index} label={"Sub-List:-"} labelFor={"subList"} labelStyle={'w-[90%]'} divStyle={'flex-col'} type={"text"} value={item.subList} name={"subList"} onChange={(e) => handleChange(index, 'subList', e.target.value)} placeholder={"Enter subList"} inputStyle={'w-[90%]'} />
                        </>
                    ))}
                    <Button
                        type={"button"}
                        buttonName={<FaPlus className='inline-block' />}
                        onClick={addListItem}
                        style={'w-[5rem] item-center absolute -bottom-14 right-10'}
                    />
                </div>
                <Button
                    type={"button"}
                    buttonName={"Submit"}
                    onClick={handleSubmit}
                    style={'w-[10rem] p-3 mb-4'}
                />
            </div>
        </div>
    )
}

export default PackageItemUpload