import { useEffect, useState } from "react"
import { api } from "../lib/api"
import { cartProduct, resulCartProducts } from "../types/types"
import ProductCart from "../components/ProductCart"
import { toast } from "sonner"

export default function Cart() {
  const [products, setProducts] = useState<cartProduct[]>()

  useEffect(() => {
    try {
      const token = JSON.parse(localStorage.getItem("access_token") as string).access_token
      const user_id = localStorage.getItem("user_id")
      
      if (token) {
        (async () => {
          const { data }: { data: resulCartProducts} = await api.get(`shopping-cart/${user_id}`, {
            headers: {
              access_token: token
            },
          })
          setProducts(data.products_includes)
        })()
      }
    } catch (error) {
      console.log(error)
    }
  }, [products])

  const handleBuyProducts = async () => {
    try {
      const productsToOrder = products?.map((product) => {
        return {
          product_id: product.product.id,
          quantity: product.quantity
        }
      })
      const user_id = localStorage.getItem("user_id")
      const token = JSON.parse(localStorage.getItem("access_token") as string).access_token
  
      await api.post(`orders/create/${user_id}`, {
        products: productsToOrder
      }, {
        headers: {
          access_token: token
        }
      })

      toast.success(
        <aside className="p-4">Products Bought</aside>, {
        position: "top-right"
      })
    } catch (error) {
      toast.error(
        <aside className="p-4">Error to buy the products, try in a moment</aside>, {
        position: "top-right"
      })
      console.error(error)
    }
  }

  let total = 0
  return (
    <section className="px-[5%] lg:px-[10%] 2xl:px-[15%] pt-24 flex flex-col gap-5">
      {products?.map((product) => {
        total += +product.quantity * +product.product.price;
        return (
          <ProductCart
            key={product.product.id}
            id={product.product.id}
            name={product.product.name}
            image={product.product.image}
            price={product.product.price}
            quantity={+product.quantity}
          />
        );
      })}
      {products?.length === 0 || products === undefined ? 
        <h3 className="text-center font-bold text-xl">You no have products in the cart, lets to add</h3>
      : 
        <div className="sm:px-10 py-4 rounded-md font-semibold text-lg flex justify-between items-center">
          Total: ${total}
          <button onClick={handleBuyProducts} className="bg-sky-500 hover:bg-sky-700 text-white py-2 px-4 sm:px-7 rounded-md">Buy Products</button>
        </div>
      }
    </section>
  )
}