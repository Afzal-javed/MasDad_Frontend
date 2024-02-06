import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCalculator } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { packageDetail } from '../redux/packageDataSlice';
import Button from '../components/Button';
import RightCol from '../components/RightCol'
import BasicCard from '../components/BasicCard';
import PlanCard from '../components/PlanCard';
import Input from '../components/Input';
import SelectCard from '../components/SelectCard';
import priceWithLocation, { locationList } from '../data/LocationPrice';
import { floorList, materialList, othersList, renovationList, workList } from '../data/WorkList';
import Footer from '../components/Footer';

const Estimate = () => {
    const navigate = useNavigate();
    const userData = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const arrDetails = useSelector((state) => state.packageData)
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const [showWorkList, setShowWorkList] = useState(false);
    const [showMaterialList, setShowMaterialList] = useState(false);
    const [location, setLocation] = useState(0);
    const [showWork, setShowWork] = useState(false);
    const [buildArea, setBuildArea] = useState(0);
    const [floor, setFloor] = useState(1);
    const [category, setCategory] = useState()
    const [calculatedBuildUpArea, setCalculatedBuildUpArea] = useState(1000);
    const [newArea, setNewArea] = useState(1000);
    const [amount, setAmount] = useState({
        basic: ((calculatedBuildUpArea * priceWithLocation[location].basicCost) * floor),
        premium: ((calculatedBuildUpArea * priceWithLocation[location].premiumCost) * floor),
        luxury: ((calculatedBuildUpArea * priceWithLocation[location].luxuryCost) * floor)
    })
    const basicArrDetails = arrDetails.allData.filter((item) => item.planPackage === "basic-package")
    const premiumArrDetails = arrDetails.allData.filter((item) => item.planPackage === "premium-package")
    const luxuryArrDetails = arrDetails.allData.filter((item) => item.planPackage === "luxury-package")
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/package/getAllData`);
                if (res.status === 200) {
                    dispatch(packageDetail(res?.data));
                }
            } catch (error) {
                if (error?.response?.status === 500) {
                    toast(error?.response?.data);
                }
            }
        }
        fetchDetail();
    }, [])
    const handleCalculation = (e) => {
        let buildupArea = (buildArea * 80) / 100;
        setCalculatedBuildUpArea(buildupArea);
        setAmount((curr) => ({
            ...curr,
            basic: (Math.round(calculatedBuildUpArea * priceWithLocation[location].basicCost) * floor),
            premium: (Math.round(calculatedBuildUpArea * priceWithLocation[location].premiumCost) * floor),
            luxury: (Math.round(calculatedBuildUpArea * priceWithLocation[location].luxuryCost) * floor)
        }))
        setNewArea(buildArea);
    }
    const handleLocation = (e) => {
        setLocation(e.target.value)
        setAmount((curr) => ({
            ...curr,
            basic: (Math.round(calculatedBuildUpArea * priceWithLocation[location].basicCost) * floor),
            premium: (Math.round(calculatedBuildUpArea * priceWithLocation[location].premiumCost) * floor),
            luxury: (Math.round(calculatedBuildUpArea * priceWithLocation[location].luxuryCost) * floor)
        }))
    }
    const handleCheckboxChange = (id) => {
        if (id === 'work') {
            setCategory(null)
            setShowWork(true)
            setShowMaterialList(false)
        } else {
            setShowWork(false)
            setShowWorkList(false);
        }
        setSelectedCheckbox(id === selectedCheckbox ? null : id);
    };
    return (
        <>
            <div className='w-full flex flex-col'>
                <div className='w-full h-[85vh] flex  justify-evenly overflow-y-scroll'>
                    <div className='w-[50%]  flex flex-col items-center overflow-y-scroll'>
                        <div className='w-full  rounded-2xl shadow-xl flex flex-col items-center mt-4' >
                            <h1 className='w-full h-[4rem] bg-black text-xl flex items-center justify-center mb-3 text-white font-semibold rounded-t-lg text-center p-3' ><span><FaCalculator /></span>Construction and Material Cost</h1>
                            <SelectCard label={"Location"} labelFor={"location"} divStyle={'w-[70%] mt-5 items-center gap-x-4'} id={'location'}
                                value={location} onChange={handleLocation} selectStyle={'w-[20rem]'} list={locationList} />
                            <div className='w-full flex items-center justify-evenly my-4'>
                                <div className='flex items-center gap-3'>
                                    <input type='checkbox' checked={selectedCheckbox === 'work'} onClick={() => setShowWorkList(prev => !prev)} onChange={() => handleCheckboxChange("work")} className='w-5 h-5 cursor-pointer' id='work' />
                                    <label htmlFor='work' className='text-xl font-semibold'>Work</label>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input type='checkbox' checked={selectedCheckbox === 'material'} onClick={() => setShowMaterialList(prev => !prev)} onChange={() => handleCheckboxChange("material")} className='w-5 h-5 cursor-pointer' id='material' />
                                    <label htmlFor='material' className='text-xl font-semibold'>Material</label>
                                </div>
                            </div>
                            {
                                showWorkList &&
                                <SelectCard
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    divStyle={'my-3'}
                                    selectStyle={'w-[20rem]'}
                                    list={workList}
                                />
                            }
                            {showMaterialList &&
                                <SelectCard
                                    divStyle={'my-3'}
                                    selectStyle={'w-[20rem]'}
                                    list={materialList}
                                />
                            }
                            {
                                showWork && (
                                    category === "newconstruction" ?
                                        <div className='w-full my-4 flex flex-col items-center'>
                                            <div className='p-2 flex items-center my-3 '>
                                                <Input label={"Plot Area"} labelFor={"area"} type={"number"} name={"buildArea"} divStyle={'flex-row'} value={buildArea} onChange={(e) => setBuildArea(e.target.value)} placeholder={"Enter the plot area"} inputStyle={'w-[11rem] shadow-lg'} />
                                                <SelectCard
                                                    label={"Floor:"}
                                                    labelFor={'floor'}
                                                    value={floor}
                                                    onChange={(e) => setFloor(e.target.value)}
                                                    divStyle={'my-3 '}
                                                    id={'floor'}
                                                    selectStyle={'w-[10rem]'}
                                                    list={floorList}
                                                />
                                            </div>
                                            <Button
                                                type={"button"}
                                                buttonName={"Calculate"}
                                                onClick={handleCalculation}
                                                style={'w-[10rem]'}
                                            />
                                        </div> :
                                        category === "renovation" ?
                                            <div className='my-3 flex items-center gap-3'>
                                                <SelectCard
                                                    label={"Type of Renovation"}
                                                    labelFor={'renovate'}
                                                    divStyle={'my-3 '}
                                                    selectStyle={'w-[20rem]'}
                                                    list={renovationList}
                                                />
                                            </div>
                                            :
                                            category === "others" ?
                                                <div className='my-3 flex items-center gap-3'>
                                                    <SelectCard
                                                        label={"Type of Work"}
                                                        labelFor={'other'}
                                                        divStyle={'my-3 '}
                                                        selectStyle={'w-[20rem]'}
                                                        list={othersList}
                                                    />
                                                </div> : <div className='display-none'></div>
                                )
                            }
                        </div>
                        <div className='w-full p-3 flex flex-col items-center justify-center gap-3'>
                            <PlanCard
                                plan={"Basic PLan"}
                                newArea={newArea}
                                amount={amount.basic}
                                basicCost={priceWithLocation[location].basicCost}
                            />
                            <PlanCard
                                plan={"Premium PLan"}
                                newArea={newArea}
                                amount={amount.premium}
                                basicCost={priceWithLocation[location].premiumCost}
                            />
                            <PlanCard
                                plan={"Luxury PLan"}
                                newArea={newArea}
                                amount={amount.luxury}
                                basicCost={priceWithLocation[location].luxuryCost}
                            />
                        </div>
                    </div>
                    <div className='w-[45%] flex flex-col items-center mt-4 overflow-y-scroll'>
                        <div>
                            <RightCol
                                style={'h-[30rem]'}
                            />
                        </div>
                        <div className='w-full flex flex-col items-center p-3 rounded-t-xl'>
                            <BasicCard
                                arrDetails={basicArrDetails}
                                constructPlan={"Basic Package"}
                                amount={priceWithLocation[location].basicCost}
                            />
                            <BasicCard
                                arrDetails={premiumArrDetails}
                                constructPlan={"Premium Package"}
                                amount={priceWithLocation[location].premiumCost}
                            />
                            <BasicCard
                                arrDetails={luxuryArrDetails}
                                constructPlan={"Luxury Package"}
                                amount={priceWithLocation[location].luxuryCost}
                            />
                        </div>
                        <Button
                            type={"button"}
                            buttonName={"Add Item"}
                            style={`${userData.email !== import.meta.env.VITE_EMAIL_ID ? 'hidden' : 'w-[10rem]'}`}
                            onClick={() => navigate("/upload-package-item")}
                        />
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default Estimate