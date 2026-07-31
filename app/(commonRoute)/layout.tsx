import { Navbar } from "@/components/shared/navbar"
import { getMe } from "@/service/getme"

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const user = await getMe()
  console.log(user);
  return (
   
      <div>
        <Navbar user={user}/>
        {children}
        </div>
   
  )
}