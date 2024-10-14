import { useEffect, useState } from "react";
import { resultProduct } from "../types/types";
import { api } from "../lib/api";
import { useParams } from 'react-router-dom'
import { toast } from "sonner";

export default function InfoProduct() {
  const { id } = useParams()
  const [product, setProduct] = useState<resultProduct>()
  
  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/products/${id}`)
      setProduct(data)
    })()
  }, [id])

  const handleAddToCart = async () => {
    try {
      const isLoggedIn = localStorage.getItem("isLoggedIn")
      if (isLoggedIn === "true") {
        const token = JSON.parse(localStorage.getItem("access_token") as string).access_token
        const user_id = localStorage.getItem("user_id")

        await api.post(`shopping-cart/add-product/${user_id}`, {
          product_id: id,
          quantity: 1
        }, {
          headers: {
            access_token: token
          },
          
        })
        toast.success(
          <aside className="p-4">{product?.name} added to the cart</aside>, {
          position: "top-right"
        })
      } else {
        toast.error(
          <aside className="p-4">Sign in to add the product to the cart</aside>, {
          position: "top-right"
        })
      }
    } catch (error) {
      console.error(error)
      toast.error(
        <aside className="p-4">{product?.name} couldn't be added to the cart</aside>, {
        position: "top-right"
      })
    }
  }

	return (
    <section className="flex flex-col rounded-lg shadow-lg p-6 sm:gap-4 md:gap-14 bg-white sm:flex-row">
      <img 
        className="rounded-sm sm:w-80 md:w-96 mb-5 sm:mb-0"
        src={product?.image}
        alt={product?.name} 
      />
      <div className="flex flex-col justify-between w-full">
        <h3 className="text-2xl font-bold mb-2 sm:mb-0" >{product?.name}</h3>
        <p className="text-md mb-2 sm:mb-0" >{product?.description}</p>
        <div className="flex justify-between items-center mb-4 sm:mb-0">
          <span className="text-xl flex">${product?.price}</span>
          <span className="text-sm bg-[#e0e0e0] px-2 py-1 rounded-md">{product?.stock} in stock</span>
        </div>
        <button onClick={handleAddToCart} className="flex justify-center item-center py-3 rounded-md bg-sky-500 hover:bg-sky-800 font-semibold text-white" >Add to cart</button>
      </div>
    </section>
	)
}