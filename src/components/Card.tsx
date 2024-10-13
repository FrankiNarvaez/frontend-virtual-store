import { Link } from "react-router-dom";
import { localStorageToken, resultProduct } from "../types/types";
import { api } from "../lib/api";

export default function Card(props: resultProduct) {
  const handleAddToCart = async () => {
    try {
      const token: localStorageToken = JSON.parse(localStorage.getItem("access_token") as string)
      const user_id = localStorage.getItem("user_id")

      const { data } = await api.post(`shopping-cart/add-product/${user_id}`, {
        product_id: props.id,
        quantity: 1
      }, {
        headers: {
          access_token: token?.access_token
        },
        
      })
    console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className="max-w-80 bg-white rounded-lg overflow-hidden shadow-md p-2 mx-auto">
      <img 
        className="w-60 sm:w-72 md:w-80 h-48 object-cover"
        src={props.image}
        alt={props.name}
      />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{props.name}</h3>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl flex">${props.price}</span>
          <span className="text-sm bg-[#e0e0e0] px-2 py-1 rounded-md">{props.stock} in stock</span>
        </div>
        <div className="flex gap-4">
          <button onClick={handleAddToCart} className="block font-semibold w-full px-0 py-2 bg-sky-500 text-white text-center text-base border-none rounded-md cursor-pointer hover:bg-sky-600">Add to cart</button>
          <Link to={`/product/${props.id}`} className="block font-semibold w-full px-0 py-2 bg-sky-500 text-white text-center text-base border-none rounded-md cursor-pointer hover:bg-sky-600">Preview</Link>
        </div>
      </div>
    </section>
  )
}