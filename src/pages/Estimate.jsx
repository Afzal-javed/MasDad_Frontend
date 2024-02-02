import React, { useState } from 'react'
import RightCol from '../components/RightCol'
import { FaCalculator } from "react-icons/fa6";
import PlanCard from '../components/PlanCard';
const Estimate = () => {
    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const [showWorkList, setShowWorkList] = useState(false);
    const [showMaterialList, setShowMaterialList] = useState(false);
    const [location, setLocation] = useState(0);
    const [showWork, setShowWork] = useState(false);
    const [buildArea, setBuildArea] = useState(0);
    const [floor, setFloor] = useState(1);
    const [category, setCategory] = useState("")
    const [calculatedBuildUpArea, setCalculatedBuildUpArea] = useState(1000);
    const [newArea, setNewArea] = useState(1000);
    const priceWithLocation = [{ basicCost: 1275, premiumCost: 1575, luxuryCost: 2190 }, { basicCost: 1350, premiumCost: 1600, luxuryCost: 22250 }, { basicCost: 1300, premiumCost: 1600, luxuryCost: 2200 }]
    const [amount, setAmount] = useState({
        basic: ((calculatedBuildUpArea * priceWithLocation[location].basicCost) * floor),
        premium: ((calculatedBuildUpArea * priceWithLocation[location].premiumCost) * floor),
        luxury: ((calculatedBuildUpArea * priceWithLocation[location].luxuryCost) * floor)
    })
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
    const handleFloorInput = (e) => {
        setFloor(e.target.value);
    }
    const handleBuildAreaInput = (e) => {
        setBuildArea(e.target.value);
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
        <div className='w-full flex flex-col items-center'>
            <div className='w-full flex items-center justify-evenly'>
                <div className='w-[45%]  bg-slate-200 rounded-2xl shadow-xl flex flex-col items-center'>
                    <h1 className='w-full h-[4rem] bg-blue-700 text-xl flex items-center justify-center mb-3 text-white font-semibold rounded-t-lg text-center p-3' ><span><FaCalculator /></span>Construction and Material Cost</h1>
                    <div className='w-[70%] my-3 flex items-center gap-x-4'>
                        <label htmlFor='loaction' className='my-3 text-lg font-semibold items-start'>Location</label>
                        <select id='location' name='location' value={location} onChange={handleLocation} className='w-[20rem] p-2 bg-slate-300 rounded-lg outline-none'>
                            <option>Select Location</option>
                            <option value={0}>Azamgarh</option>
                            <option value={1}>Lucknow</option>
                            <option value={2}>Gorakhpur</option>
                        </select>
                    </div>
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
                    {showWorkList && <div className='my-3'>
                        <select name='category' value={category} onChange={(e) => setCategory(e.target.value)} className='w-[20rem] p-2 outline-none bg-slate-300 rounded-lg'>
                            <option value={""}>Work</option>
                            <option value={'newconstruction'}>New Construction</option>
                            <option value={'renovation'}>Renovation</option>
                            <option value={'others'}>Others</option>

                        </select>
                    </div>}
                    {showMaterialList &&
                        <div className='my-3'>
                            <select className='w-[20rem] p-2 outline-none bg-slate-300 rounded-lg'>
                                <option>Material</option>
                                <option>Sand</option>
                                <option>Steel</option>
                                <option>Styrups</option>
                                <option>Rope</option>
                                <option>Frame Door</option>
                                <option>Septic Tanks</option>
                                <option>Bricks</option>
                                <option>RC Bricks</option>
                                <option>Pipe</option>
                                <option>Motor</option>
                                <option>Drainage Pipe</option>
                                <option>Plumbing Pipe</option>

                            </select>
                        </div>}
                    {
                        showWork && (
                            category === "newconstruction" ?
                                <div className='w-full my-4 flex flex-col items-center'>
                                    <div className='p-2 flex items-center my-3 '>
                                        <label htmlFor='area' className='text-lg font-semibold mx-2'>Plot Area</label>
                                        <input type='number' name='buildArea' value={buildArea} onChange={handleBuildAreaInput} className='w-[11rem] mx-4 p-1 outline-none text-lg bg-slate-300 rounded-lg' id='area' placeholder='Enter the plot area' />
                                        <label htmlFor='floor' className='text-lg font-semibold mx-2'>Floor</label>
                                        <select id='floor' name='floor' value={floor} onChange={handleFloorInput} className='text-lg w-[10rem] p-1 bg-slate-300 outline-none rounded-lg'>
                                            <option value={1}>G</option>
                                            <option value={2}>G+1</option>
                                            <option value={3}>G+2</option>
                                            <option value={4}>G+3</option>
                                        </select>
                                    </div>
                                    <button className='text-lg font-semibold bg-blue-700 text-white w-[40%] rounded-full p-1.5 my-4 hover:bg-blue-950' onClick={handleCalculation}>Calculate</button>
                                </div> :
                                category === "renovation" ?
                                    <div className='my-3 flex items-center gap-3'>
                                        <label htmlFor='renovate' className='text-lg font-semibold mx-2'>Type of Renovation</label>
                                        <select id='renovate' className='w-[20rem] p-2 outline-none bg-slate-300 rounded-lg'>
                                            <option>Plaster</option>
                                            <option>Paint</option>
                                            <option>Tile</option>
                                            <option>wiring</option>
                                            <option>Kitchen</option>
                                            <option>Bathroom</option>
                                            <option>Falselling</option>
                                            <option>Others</option>
                                        </select>
                                    </div>
                                    :
                                    category === "others" ?
                                        <div className='my-3 flex items-center gap-3'>
                                            <label htmlFor='renovate' className='text-lg font-semibold mx-2'>Type of work</label>
                                            <select id='renovate' className='w-[20rem] p-2 outline-none bg-slate-300 rounded-lg'>
                                                <option>PVC/CPVC/UPVC Fitting</option>
                                                <option>Door and Window</option>
                                                <option>Aluminium/Glass work</option>
                                                <option>Others</option>
                                            </select>
                                        </div> : <div className='display-none'></div>
                        )
                    }
                </div>
                <div className='w-[45%] h-[85vh] mt-4 overflow-y-scroll'>
                    <RightCol />
                </div>

            </div>
            <div className='w-full p-3 flex items-center justify-center gap-3'>
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
    )
}

export default Estimate