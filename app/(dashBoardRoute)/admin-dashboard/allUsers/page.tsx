"use server"

import { cookies } from "next/headers";
import UserTable from "../_components/userTable";


const Allusers = async () => {
  const cookieStore = await cookies()

  const accessToken = cookieStore.get("accessToken")?.value;
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/users`, {
    headers: {
      Authorization: `${accessToken}`
    },
  })
  const result = await res.json()
  const users = result.data;
  // console.log(result.data);

  return (
    <div>
       <h1 className="mb-6 text-2xl font-bold">All Users</h1>
      <UserTable users ={users}/>

    </div>
  );
};

export default Allusers;