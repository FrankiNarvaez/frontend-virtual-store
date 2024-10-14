import { useEffect, useState } from "react"
import { productCartProps } from "../types/types"
import { FaTrash } from "react-icons/fa";
import { api } from "../lib/api";
import { toast } from "sonner";

export default function ProductCard({ id, image, name, price, quantity: InitialQuantity }: productCartProps) {
  const [quantity, setQuantity] = useState(InitialQuantity)

  const updateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevaCantidad = parseInt(e.target.value)
    setQuantity(isNaN(nuevaCantidad) || nuevaCantidad < 1 ? 1 : nuevaCantidad)
  }

  const user_id = localStorage.getItem("user_id")
  const token = JSON.parse(localStorage.getItem("access_token") as string).access_token

  const handleRemove = async () => {
    if (user_id) {
      try {
        await api.delete(`shopping-cart/${user_id}`, {
          params: {
            product_id: id
          },
          headers: {
            access_token: token
          }
        })
        toast.success(
          <aside className="p-4">{name} removed</aside>, {
          position: "top-right"
        })
      } catch (error) {
        console.error(error)
        toast.error(
          <aside className="p-4">Error to remove the product</aside>, {
          position: "top-right"
        })
      }
    }
  }

  useEffect(() => {
    if (quantity !== InitialQuantity && quantity > 0) {
      try {
        (async () => {
          await api.patch(`shopping-cart/${user_id}`, {
            quantity: quantity,
          }, {
            headers: {
              access_token: token
            },
            params: {
              product_id: id
            }
          })
        })()
      } catch (error) {
        console.error(error)
      }
    }
  }, [quantity, InitialQuantity])

  return (
    <div className="flex items-center justify-around min-[450px]:justify-normal space-x-4 p-4 bg-white shadow rounded-lg h-32">
      <div>
        <img
          src={image}
          alt={name}
          width={80}
          height={80}
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex flex-col min-[450px]:flex-row justify-between min-[450px]:w-full">
        <div className="flex min-[450px]:flex-col items-center min-[450px]:items-start gap-2 min-[450px]:gap-0">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-600">${price.toFixed(2)}</p>
        </div>
        <div className="flex items-center space-x-2 justify-center ">
          <button
            onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
            className="bg-sky-500 hover:bg-sky-600 py-0.5 px-2 rounded-md text-white active:scale-95"
            aria-label="Decrease quantity"
          >
            -
          </button>
          <input
            value={quantity}
            onChange={updateQuantity}
            className="w-10 text-center border-2 rounded-md"
            min="1"
          />
          <button
            onClick={() => setQuantity(prev => prev + 1)}
            className="bg-sky-500 hover:bg-sky-600 py-0.5 px-2 rounded-md text-white active:scale-95"
            aria-label="Increase quantity"
          >
            +
          </button>
          <button onClick={handleRemove} className="bg-red-600 hover:bg-red-700 hover:text-gray-100 text-white p-2 rounded-md active:scale-95 min-[450px]:ml-3">
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  )
}