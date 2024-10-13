import { useState } from "react"
import { productCartProps } from "../types/types"

export default function ProductCard({ image, name, price, quantity: InitialQuantity }: productCartProps) {
  const [quantity, setQuantity] = useState(InitialQuantity)

  const updateQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nuevaCantidad = parseInt(e.target.value)
    setQuantity(isNaN(nuevaCantidad) || nuevaCantidad < 1 ? 1 : nuevaCantidad)
  }

  return (
    <div className="flex items-center space-x-4 p-4 bg-white shadow rounded-lg h-32">
      <div className="flex-shrink-0">
        <img
          src={image}
          alt={name}
          width={80}
          height={80}
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600">${price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
          className="h-8 w-8"
          aria-label="Disminuir cantidad"
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          onChange={updateQuantity}
          className="w-16 text-center"
          min="1"
        />
        <button
          onClick={() => setQuantity(prev => prev + 1)}
          className="h-8 w-8"
          aria-label="Aumentar cantidad"
        >
          +
        </button>
      </div>
    </div>
  )
}