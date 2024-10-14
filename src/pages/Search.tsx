import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import Card from "../components/Card"
import { api } from "../lib/api"
import { resultProduct } from "../types/types"

export default function Search() {
  const [products, setProducts] = useState<resultProduct[]>()
  const [searchParams] = useSearchParams()
  const query = searchParams.get("query");

  (async () => {
    const { data }: { data: resultProduct[] } = await api.get('products/get-products')
    if (data) {
      setProducts(data?.filter((product) =>
        product?.name.toLowerCase().includes(query?.toLowerCase() as string)
      ));
    }
  })()

  return (
    <section className="grid gap-6 grid-cols-1 p-20 sm:grid-cols-2 lg:grid-cols-3 px-[5%] lg:px-[10%] 2xl:px-[15%]">
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