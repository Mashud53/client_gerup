import React from 'react';
import GearTable from './_components/gearTable';

const AllGears = async () => {
     const response = await fetch(`${process.env.BACKEND_API_URL}/api/gear`);
    const data = await response.json();
    const gears = data.data.result
    console.log(gears);
    return (
        <div>
            <GearTable gears={gears}/>
            
        </div>
    );
};

export default AllGears;