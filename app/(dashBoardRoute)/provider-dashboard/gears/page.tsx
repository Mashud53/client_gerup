import React from 'react';
import GearTable from '../../admin-dashboard/gears/_components/gearTable';

const AllGears = async () => {
     const response = await fetch(`${process.env.BACKEND_API_URL}/api/gear`);
    const data = await response.json();
    const gears = data.data.result
    console.log(gears);
    return (
        <div className='overflow-x-scroll'>
            <GearTable gears={gears}/>
            
        </div>
    );
};

export default AllGears;