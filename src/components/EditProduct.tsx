import { toast } from "sonner";
import { product } from "../interfaces/products.interface";
import { FormEvent } from "react";
import { api } from "../lib/api";

export default function EditProduct({ id, name, description, price, stock, image }: product) {
  const infoChanged: product = {}
  const token = JSON.parse(localStorage.getItem("access_token") as string).access_token
  
  const handleSaveChanges = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await api.patch(`products/${id}`, {
        name: infoChanged.name,
        description: infoChanged.description,
        price: infoChanged.price,
        stock: infoChanged.stock,
        image: infoChanged.image
      }, {
        headers: {
          access_token: token
        }
      })
      toast.success(
        <aside className="p-4">{name} update</aside>, {
        position: "top-right"
      })
    } catch (error) {
      console.error(error)
      toast.error(
        <aside className="p-4">{name} couldn't be updated</aside>, {
        position: "top-right"
      })
    }
  }
  
  const handleDelete = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await api.delete(`products/${id}`, {
        headers: {
          access_token: token
        }
      })
      toast.success(
        <aside className="p-4">{name} deleted</aside>, {
        position: "top-right"
      })
    } catch (error) {
      console.log(error)
      toast.error(
        <aside className="p-4">{name} couldn't be deleted</aside>, {
        position: "top-right"
      })
    }
  }

  return (
    <div className="max-w-2xl md:mx-auto p-3 bg-white shadow-lg rounded-lg overflow-hidden md:flex">
      <div className="flex justify-center items-center md:flex-shrink-0">
        <img className="h-48 w-full object-cover md:w-48 md:mr-4" src={image} alt={name} />
      </div>
      <div className="w-full">
        <form className="space-y-4" onSubmit={handleSaveChanges}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              defaultValue={name}
              onChange={(e) => infoChanged.name = e.target.value}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              name="description"
              rows={3}
              defaultValue={description}
              onChange={(e) => infoChanged.description = e.target.value}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                defaultValue={price}
                step="100"
                onChange={(e) => infoChanged.price = +e.target.value}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                name="stock"
                defaultValue={stock}
                onChange={(e) => infoChanged.stock = +e.target.value}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              name="image"
              defaultValue={image}
              onChange={(e) => infoChanged.image = e.target.value}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div className="flex justify-between pt-4">
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save changes
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Delete product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}