'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ShoppingCart, Heart, Truck, Shield, Clock, Star } from 'lucide-react'

interface GearItem {
    image?: string
    id: string
    name: string
    description: string
    price: number
    category: string
    brand: string
    available: boolean
    stock: number
}
interface GearDetailsPageProps{
    gear: GearItem
}


export default function GearDetailsPage({gear}:GearDetailsPageProps) {
    const {image, name, description, price, category, brand, available, stock} = gear;
    const [isRenting, setIsRenting] = useState(false)
    const [isFavorited, setIsFavorited] = useState(false)
    const [rentalDays, setRentalDays] = useState(1)

    const handleRent = async () => {
        setIsRenting(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            alert(
                `Successfully rented ${name} for ${rentalDays} day(s)!\nTotal: $${(price * rentalDays).toFixed(2)}`
            )
        } finally {
            setIsRenting(false)
        }
    }

    return (
        <main className="min-h-screen bg-linear-to-br from-background via-background to-muted/30 px-4 py-12">
            <div className="mx-auto max-w-4xl">
                {/* Header with navigation */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Gear Details</h1>
                        <p className="mt-1 text-muted-foreground">Premium rental equipment</p>
                    </div>
                    
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Image Section */}
                    <div className="lg:col-span-1">
                        <Card className="overflow-hidden">
                            <div className="relative aspect-square bg-white flex items-center justify-center overflow-hidden">
                                {image && 
                                <Image
                                    src={image}
                                    alt={name}
                                    width={400}
                                    height={400}
                                    priority
                                    className="h-full w-full object-cover"
                                />}
                                {available && (
                                    <Badge className="absolute right-4 top-4 bg-green-500">In Stock</Badge>
                                )}
                            </div>
                            <CardContent className="pt-6">
                                <Button
                                    variant={isFavorited ? 'default' : 'outline'}
                                    className="w-full gap-2"
                                    onClick={() => setIsFavorited(!isFavorited)}
                                >
                                    <Heart className="h-4 w-4" />
                                    {isFavorited ? 'Favorited' : 'Add to Favorites'}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Details Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Product Info Card */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <CardTitle className="text-3xl">{name}</CardTitle>
                                        <CardDescription className="mt-2 text-base">
                                            {brand} • {category}
                                        </CardDescription>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-3xl font-bold text-primary">${price}</p>
                                        <p className="text-sm text-muted-foreground">per day</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Description */}
                                <div>
                                    <h3 className="mb-2 font-semibold text-foreground">Description</h3>
                                    <p className="text-muted-foreground leading-relaxed">{description}</p>
                                </div>

                                {/* Key Features */}
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-lg bg-muted/50 p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Truck className="h-5 w-5 text-primary" />
                                            <h4 className="font-semibold">Free Delivery</h4>
                                        </div>
                                        <p className="text-sm text-muted-foreground">Delivery included in rental</p>
                                    </div>
                                    <div className="rounded-lg bg-muted/50 p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Shield className="h-5 w-5 text-primary" />
                                            <h4 className="font-semibold">Insured</h4>
                                        </div>
                                        <p className="text-sm text-muted-foreground">Protection included</p>
                                    </div>
                                    <div className="rounded-lg bg-muted/50 p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Clock className="h-5 w-5 text-primary" />
                                            <h4 className="font-semibold">Quick Pickup</h4>
                                        </div>
                                        <p className="text-sm text-muted-foreground">Ready in 24 hours</p>
                                    </div>
                                    <div className="rounded-lg bg-muted/50 p-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Star className="h-5 w-5 text-primary" />
                                            <h4 className="font-semibold">Top Rated</h4>
                                        </div>
                                        <p className="text-sm text-muted-foreground">4.8/5 from 120 reviews</p>
                                    </div>
                                </div>

                                {/* Stock Info */}
                                <div className="rounded-lg border border-border bg-muted/30 p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-foreground">Items in Stock</p>
                                            <p className="text-sm text-muted-foreground">
                                                {stock} unit{stock !== 1 ? 's' : ''} available
                                            </p>
                                        </div>
                                        <Badge variant={stock > 3 ? 'default' : 'secondary'}>
                                            {stock} available
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Rental Options Card */}
                        <Card className="border-primary/20 bg-linear-to-br from-primary/5 to-primary/0">
                            <CardHeader>
                                <CardTitle>Rental Options</CardTitle>
                                <CardDescription>Choose your rental duration</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Duration Selector */}
                                <div>
                                    <label className="mb-3 block text-sm font-semibold text-foreground">
                                        Rental Duration
                                    </label>
                                    <div className="flex gap-2">
                                        {[1, 3, 7].map((days) => (
                                            <Button
                                                key={days}
                                                variant={rentalDays === days ? 'default' : 'outline'}
                                                onClick={() => setRentalDays(days)}
                                                className="flex-1"
                                            >
                                                {days} {days === 1 ? 'Day' : 'Days'}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Price Breakdown */}
                                <div className="space-y-2 border-t border-border pt-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">
                                            ${price} × {rentalDays} day{rentalDays !== 1 ? 's' : ''}
                                        </span>
                                        <span className="font-semibold">${(price * rentalDays).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Delivery Fee</span>
                                        <span className="text-green-500 font-semibold">Free</span>
                                    </div>
                                    <div className="flex justify-between border-t border-border pt-3 text-base font-bold">
                                        <span>Total</span>
                                        <span className="text-primary">${(price * rentalDays).toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Rent Button */}
                                <Button
                                    onClick={handleRent}
                                    disabled={isRenting || !available}
                                    size="lg"
                                    className="w-full gap-2"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    {isRenting ? 'Processing...' : 'Rent This Gear'}
                                </Button>

                                <p className="text-xs text-muted-foreground text-center">
                                    By clicking Rent This Gear you agree to our rental terms and conditions
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    )
}