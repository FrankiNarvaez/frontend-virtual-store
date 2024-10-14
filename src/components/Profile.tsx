import React from 'react'
import { User, UserProfile } from '../interfaces/users.interface'
import { api } from '../lib/api'
import { toast } from 'sonner'

export default function Modaluser( { user, onClose }: UserProfile) {
  const userEdited: User = {}
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const token = JSON.parse(localStorage.getItem("access_token") as string).access_token
      const { data } = await api.patch(`users/${user?.id}`, {
        userEdited
      }, {
        headers: {
          access_token: token
        }
      })
      console.log("data", data)
      console.log("userE", userEdited)
      toast.success(
        <aside className="p-4">User has been updated</aside>, {
        position: "top-right"
      })
    } catch (error) {
      console.error(error)
      toast.error(
        <aside className="p-4">{user?.name} couldn't be updated</aside>, {
        position: "top-right"
      })
    }
    
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user?.name}
                onChange={(e) => userEdited.name = e.target.value}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={user?.email}
                onChange={(e) => userEdited.email = e.target.value}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                defaultValue={user?.password}
                onChange={(e) => userEdited.password = e.target.value}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Rol
              </label>
              <select
                name="role"
                defaultValue={user?.role}
                onChange={(e) => userEdited.role = e.target.value}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}