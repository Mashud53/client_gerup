"use server"

export async function getCategory (){
const res = await fetch(`${process.env.BACKEND_API_URL}/api/categories`);
const result = await res.json()

return result
}