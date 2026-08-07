

import GearDetailsPage from "@/components/gearDetilsPage/gearDetails"


export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/gear/${id}`)
  const data = await res.json()
  const gear = data.data.result
  

  return <div className="container mx-auto">
    <GearDetailsPage gear={gear}/>
  </div>
}