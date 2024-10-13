import { useEffect, useState } from "react"
import { api } from "../lib/api"
import { cartProduct, localStorageToken, resulCartProducts } from "../types/types"
import ProductCart from "../components/ProductCard"

export default function Cart() {
  const [products, setProducts] = useState<cartProduct[]>()

  useEffect(() => {
    try {
      const token: localStorageToken = JSON.parse(localStorage.getItem("access_token") as string)
      const user_id = localStorage.getItem("user_id")
      
      if (token) {
        (async () => {
          const { data }: { data: resulCartProducts} = await api.get(`shopping-cart/${user_id}`, {
            headers: {
              access_token: token?.access_token
            },
          })
          setProducts(data.products_includes)
        })()
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <section className="px-[5%] lg:px-[10%] 2xl:px-[15%] mt-5 flex flex-col gap-5">
      {products?.map((product) => (
        <ProductCart
          key={product.product.id}
          name={product.product.name}
          image={product.product.image}
          price={product.product.price}
          quantity={+product.quantity}
        />
      ))}
    </section>
  )
}