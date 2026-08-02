
import { getMe } from "@/service/getme"
import { DashboardSidebar } from "./_components/dashboardSidebar"
import { DashboardHeader } from "./_components/dashboardHeader"


export default async function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const user = await getMe()
    
      

    return (

        <div className="flex min-h-screen">
            <DashboardSidebar role ={user?.data.role} />

            <div className="flex flex-1 flex-col">
                <DashboardHeader user={user} />

                <main className="flex-1 p-6 overflow-x-scroll">
                    {children}
                </main>
            </div>
        </div>

    )
}