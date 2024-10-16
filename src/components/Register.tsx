import { FormEvent, useState } from "react";
import { api } from "../lib/api";
import { toast } from "sonner";

export default function Register({ cancelAction, loginAction }: { cancelAction: () => void, loginAction: () => void}) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("USER")
  const [invalidRegister, setInvalidRegister] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const { data } = await api.post("users/register", {
        name, email, password, role
      })
      if (data) {
        toast.success(
          <aside className="p-4">Register successful, now sign in</aside>, {
          position: "top-right"
        })

        cancelAction()
        loginAction()
      }
    } catch (error: any) {
      if (error.response.status === 400) {
        setInvalidRegister(true)
      } else {
        console.log("Error: ", error)
      }
    }
  }

  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <section className="w-80 bg-white rounded-lg overflow-hidden shadow-md p-5">
        <h2 className="text-2xl font-bold mb-5 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-1 font-bold">Name</label>
            <input 
              type="text" 
              name="email" 
              required 
              className="w-full p-2 border text-sm rounded-md" 
              onChange={(e) => { setName(e.target.value)}}
            />
          </div>
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
          <div className="mb-4">
            <label htmlFor="role" className="block mb-1 font-bold">Role</label>
            <select 
              name="role" 
              className="w-full p-2 border text-sm rounded-md"
              onChange={(e) => { setRole(e.target.value)}}
            >
              <option value="USER">user</option>
              <option value="ADMIN">admin</option>
            </select>
          </div>
          <button type="submit" className="block w-full p-3 bg-sky-500 hover:bg-sky-700 text-center text-base border-none rounded cursor-pointer my-3 text-white font-semibold">Register</button>
          <button 
            type="button" 
            className="block w-full p-2 border-2 border-sky-500 text-center text-base rounded cursor-pointer my-3 font-semibold"
            onClick={cancelAction}
          >
            Cancel
          </button>
        </form>
        {invalidRegister && <span className="text-red-500 text-base font-medium">Email already exists</span>}
        <div className="text-center mt-4">
          <p>have an account? <button onClick={() => { loginAction(); cancelAction();}} className="text-[#007bff] hover:underline">Login</button></p>
        </div>
      </section>
    </section>
  )
}