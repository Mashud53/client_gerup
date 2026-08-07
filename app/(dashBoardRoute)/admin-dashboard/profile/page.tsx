
import MyProfile from "@/components/shared/profile/myProfile";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function Profile () {
    const cookieStore = await cookies()
    
        const accessToken = cookieStore.get("accessToken")?.value;
    
        if (!accessToken) {
            redirect("/login")
        }
    
        const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
            headers: {
                Authorization: `${accessToken}`
            },
            cache: "force-cache",
            next: {
                revalidate: 60 * 60 * 24,
                tags: ["my-profile"]
            }
        });
    
        const result =await res.json()
        const profileData = result.data;
        
    return (
        <div>
            <MyProfile profileData={profileData}/>
            
        </div>
    );
};

