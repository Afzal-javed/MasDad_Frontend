import React from 'react'
import CardPackageHeading from './CardPackageHeading';
import CardLists from './CardLists';

const BasicCard = ({ amount, constructPlan, arrDetails }) => {
    return (
        <div className='w-full flex flex-col items-center mt-4 rounded-t-2xl shadow-lg'>
            <CardPackageHeading
                packagePlan={constructPlan}
                perFeet={amount}
            />
            {
                arrDetails.map((val, index) => (
                    <div className='w-full border-b-2' key={index}>
                        <CardLists
                            title={val.title}
                            lists={val.list}
                            id={val.id}
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default BasicCard