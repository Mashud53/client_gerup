
import GearTable from '../../admin-dashboard/gears/_components/gearTable';

export default async function AllGears () {
     const response = await fetch(`${process.env.BACKEND_API_URL}/api/gear`);
    const data = await response.json();
    const gears = data.data.result
   
    return (
        <div className='overflow-x-scroll'>
            <h1 className="mb-6 text-2xl font-bold">Update Gears</h1>
            <GearTable gears={gears}/>
            
        </div>
    );
};

