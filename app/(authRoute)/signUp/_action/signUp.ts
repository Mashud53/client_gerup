"use server";

type State = {
  success: boolean;
  message: string;
};

export async function signupAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  

  if (!name || !email || !password) {
    return {
      success: false,
      message: "All fields are required.",
    };
  }

   
  const res = await fetch(`${process.env.BACKEND_API_URL}//api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: data.message,
    };
  }

 

 
  return {
    success: true,
    message: "Account created successfully!",
  };
}