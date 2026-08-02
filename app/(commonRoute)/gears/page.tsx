

import GearCard from "@/components/gearCard/gearCard";

export interface GearProps {
    id:string
    name: string
    price: number
    category: string
    brand: string
    available: boolean
    
}
const GearsPage = async () => {
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/gear`);
    const data = await response.json();
    const gears = data.data.result
    // console.log(gears);
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {
                gears?.map((gear: GearProps) => (
                    <GearCard key={gear.id} gear={gear}/>
                        
                    
                ))
            }
        </div>
    );
};

export default GearsPage;