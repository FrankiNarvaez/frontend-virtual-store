import React from 'react'
import { ProductFormData } from '../interfaces/products.interface'
import { toast } from 'sonner'
import { api } from '../lib/api'

export default function AddProduct() {
  const input: ProductFormData = {
    name: "",
    description: "",
    price: 0,
    stock: 0,
    image: ""
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const token = JSON.parse(localStorage.getItem("access_token") as string).access_token
      await api.post("products/create", {
        name: input.name,
        description: input.description,
        price: input.price,
        stock: input.stock,
        image: input.image
      }, {
        headers: {
          access_token: token
        }
      })
      toast.success(
        <aside className="p-4">{input.name} added</aside>, {
        position: "top-right"
      })
    } catch (error) {
      console.log(error)
      toast.error(
        <aside className="p-4">{input.name} couldn't be added</aside>, {
        position: "top-right"
      })
    }
  }

  return (
    <div className="max-w-sxl md:max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Añadir Nuevo Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => input.name = e.target.value}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            id="description"
            name="description"
            onChange={(e) => input.description = e.target.value}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            onChange={(e) => input.price = +e.target.value}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            onChange={(e) => input.stock = +e.target.value}
            className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">URL de la imagen</label>
          <input
            type="url"
            id="image"
            name="image"
            onChange={(e) => input.image = e.target.value}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Añadir Producto
          </button>
        </div>
      </form>
    </div>
  )
}