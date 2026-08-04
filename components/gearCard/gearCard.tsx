
"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import Link from "next/link";
import Image from "next/image";


export interface GearCard {
    id: string
    name: string
    image?: string
    price: number
    category: string
    brand: string
    available: boolean

}
interface GearCardProps {
    gear: GearCard
}

const GearCard = ({ gear }: GearCardProps) => {

    return (

        <Link href={`/gears/${gear.id}`}>
            <Card className="overflow-hidden transition-all hover:shadow-lg">
                
                <div className="h-48 relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                    {gear.image ? (
                        <Image
                            src={gear?.image}
                            alt={gear.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-linear-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                            <div className="text-slate-400 dark:text-slate-600 text-sm font-medium">
                                {gear.category}
                            </div>
                        </div>
                    )}
                </div>

                <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 space-y-1">
                            <h3 className="font-semibold text-sm truncate">{gear.name || 'Unnamed Gear'}</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{gear.brand}

                            </p>
                        </div>
                        <Badge variant={gear.available ? 'default' : 'secondary'} className="whitespace-nowrap">
                            {gear.available ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">${gear.price.toFixed(2)}</span>
                        <Badge variant="outline" className="text-xs">
                            {gear.category}
                        </Badge>
                    </div>

                </CardContent>
            </Card>
        </Link>
    );
};

export default GearCard;