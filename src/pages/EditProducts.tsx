import { useEffect, useState } from "react"
import { api } from "../lib/api"
import { resultProduct } from "../types/types"
import EditProduct from "../components/EditProduct"

export default function EditProducts() {
  const [products, setProducts] = useState<resultProduct[]>()

  useEffect(() => {
    (async () => {
      const { data } = await api.get("products/get-products")
      setProducts(data)
    })()
  }, [])
  
  return (
    <section className="flex flex-col gap-6">
      {products?.map((product) => (
        <EditProduct
          key={product.id}
          id={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
          description={product.description}
          stock={product.stock}
        />
      ))}
    </section>
  )
}