"use server"
import GearDetailsPage from "@/components/gearDetilsPage/gearDetails"


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

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/${id}`)
  const data = await res.json()
  const gear = data.data.result as GearItem
  

  return <div>
    <GearDetailsPage gear={gear}/>
  </div>
}