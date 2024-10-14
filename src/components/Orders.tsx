import { useState } from 'react'
import { FaChevronDown, FaChevronUp } from "react-icons/fa"
import { Order } from '../interfaces/orders.interface'

export default function OrderItem(order: Order) {
  const [isOpen, setIsOpen] = useState(false)

  const formatBought_at = (bought_at: string) => {
    return new Date(bought_at).toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatPrecio = (price: number) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })
  }

  return (
    <div className="bg-white shadow-md rounded-lg mb-4 overflow-hidden">
      <div 
        className="px-6 py-4 flex justify-between items-center w-full cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-col items-start">
          <span className="font-semibold text-lg">order #{order.id}</span>
          <span className="text-sm text-gray-500">{formatBought_at(order.bought_at)}</span>
        </div>
        <div className="flex items-center">
          <span className="font-bold text-lg mr-4">{formatPrecio(order.total)}</span>
          {isOpen ? <FaChevronUp className="h-5 w-5" /> : <FaChevronDown className="h-5 w-5" />}
        </div>
      </div>
      {isOpen && (
        <div className="px-6 py-4 border-t border-gray-200">
          <h4 className="font-semibold mb-2">products:</h4>
          <ul>
            {order.products_includes.map((product) => (
              <li key={product.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <span>{product.product.name}</span>
                <span className="text-gray-600">
                  {product.quantity} x {formatPrecio(product.product.price)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
