'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-linear-to-br from-background via-background to-accent/5 pt-20 pb-32 px-4">
            {/* Decorative blurred elements */}
            <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto max-w-5xl">
                {/* Badge */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                        <Zap className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Ready for your next adventure?</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-8 text-center mb-12">
                    {/* Headline */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                        <span className="text-foreground">Gear up for</span>
                        <br />
                        <span className="relative">
                            <span className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                                Any Adventure
                            </span>
                            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-linear-to-r from-primary via-accent to-primary opacity-20 blur" />
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Rent premium sports equipment and outdoor gear on your terms. From skiing to surfing, camping to climbing — we&apos;ve got everything you need.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                    <Link href="/browse">
                        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                            Browse Gear
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Link href="/how-it-works">
                        <Button
                            size="lg"
                            variant="outline"
                            className="px-8 border-primary/20 hover:bg-primary/5"
                        >
                            How It Works
                        </Button>
                    </Link>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                    {[
                        { label: 'Easy Booking', description: 'Reserve gear in minutes' },
                        { label: 'Quality Assured', description: 'Well-maintained equipment' },
                        { label: 'Flexible Returns', description: 'Return anytime, hassle-free' },
                    ].map((feature, index) => (
                        <div
                            key={index}
                            className="rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 text-center hover:border-primary/30 transition-colors"
                        >
                            <h3 className="font-semibold text-foreground mb-2">{feature.label}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>

                {/* Hero Image Placeholder */}
                <div className="mt-16 rounded-2xl border border-border overflow-hidden bg-linear-to-br from-primary/5 to-accent/5 backdrop-blur-sm">
                    {/* <div className="aspect-video flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-6xl mb-4">🏔️</div>
                            <p className="text-muted-foreground">Your adventure awaits</p>
                        </div>
                    </div> */}
                    <Image
                        src="/hero-image.png"
                        alt="Sports and gear rental equipment"
                        width={1200}
                        height={675}
                        className="w-full h-auto object-cover"
                        priority
                    />
                </div>
            </div>
        </section>
    )
}
