"use server"

import { cookies } from "next/headers";
import UserTable from "../_components/userTable";

type Role = "USER" | "ADMIN" | "PROVIDER";
interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: string;
  createdAt: string;
  updatedAt: string;
}
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
      <UserTable users ={users}/>

    </div>
  );
};

export default Allusers;