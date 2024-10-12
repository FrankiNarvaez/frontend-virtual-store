import { useEffect, useState } from "react"
import Card from "../components/Card"
import { api } from "../lib/api"
import { resultProduct } from "../types/types"

export default function Home() {
  const [products, setProducts] = useState<resultProduct[]>()

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/products/get-products')
      setProducts(data)
    })()
  }, [])

  return (
    <section className="grid gap-6 grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-3 px-[5%] lg:px-[10%] 2xl:px-[15%]">
      {products?.map((product) => (
        <Card 
          key={product.id}
          id={product.id}
          image={product.image}
          name={product.name}
          description={product.description}
          price={product.price}
          stock={product.stock}
        />
      ))}
      {products?.map((product) => (
        <Card 
          key={product.id}
          id={product.id}
          image={product.image}
          name={product.name}
          description={product.description}
          price={product.price}
          stock={product.stock}
        />
      ))}
    </section>
  )
}
