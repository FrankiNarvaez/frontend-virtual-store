import { FormEvent, useState } from "react";
import { api } from "../lib/api";
import { responseLogin } from "../types/types";
import { toast } from "sonner";

export default function Login({ cancelAction, registerAction }: { cancelAction: () => void, registerAction: () => void}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [invalidCredential, setInvalidCredentials] = useState(false)
  const [invalidUser, setInvalidUser] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const { data }: { data: responseLogin }= await api.post('auth/login', {
        email,
        password
      })
  
      if (data) {
        const timeNow = new Date()
        const item = {
          access_token: data.access_token,
          expiry: timeNow.getTime() + 1 * 60 * 60 * 1000,
        }
        localStorage.setItem("access_token", JSON.stringify(item));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("user_id", data.user.id);
  
        toast.success(
          <aside className="p-4">Login successfull</aside>, {
          position: "top-right"
        })

        cancelAction()
      } 
    } catch (error: any) {
      if (error.response.status === 401) {
        setInvalidCredentials(true)
      } else if (error.response.status === 400) {
        setInvalidUser(true)
      } else {
        console.log("Error: ", error)
      }
    }
  }

  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <section className="w-80 bg-white rounded-lg overflow-hidden shadow-md p-5">
        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-bold">Email</label>
            <input 
              type="email"
              name="email"
              required 
              className="w-full p-2 border text-sm rounded-md"
              onChange={(e) => { setEmail(e.target.value)}}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-1 font-bold">Password</label>
            <input 
              type="password" 
              name="password" 
              required 
              className="w-full p-2 border text-sm rounded-md"
              onChange={(e) => { setPassword(e.target.value)}}
            />
          </div>
          <button type="submit" className="block w-full p-3 bg-sky-500 hover:bg-sky-700 text-center text-base border-none rounded cursor-pointer my-3 text-white font-semibold">Login</button>
          <button 
            type="button" 
            className="block w-full p-2 border-2 border-sky-500 text-center text-base rounded cursor-pointer my-3 font-semibold"
            onClick={cancelAction}
          >
            Cancel
          </button>
        </form>
        {invalidCredential && <span className="text-red-500 text-base font-medium">Invalid credentials</span>}
        {invalidUser && <span className="text-red-500 text-base font-medium">User not found</span>}
        <div className="text-center mt-4">
          <p>Don't have an account? <button onClick={() => { cancelAction(); registerAction(); }} className="text-[#007bff] hover:underline">Register</button></p>
        </div>
      </section>
    </section>
  )
}