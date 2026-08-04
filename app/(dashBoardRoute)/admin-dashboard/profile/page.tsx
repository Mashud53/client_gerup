"use server"


import MyProfile from "@/components/shared/profile/myProfile";
import { cookies } from "next/headers";

const Profile = async() => {
    const cookieStore = await cookies()
    
        const accessToken = cookieStore.get("accessToken")?.value;
    
        if (!accessToken) {
            return {
                success: false,
                message: "user not logged in!"
            }
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
        console.log(result);
    return (
        <div>
            <MyProfile profileData={profileData}/>
            
        </div>
    );
};

export default Profile;