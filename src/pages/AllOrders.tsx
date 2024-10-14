import { useEffect, useState } from "react"
import { api } from "../lib/api";
import { Order } from "../interfaces/orders.interface";
import OrderItem from "../components/Orders";

export default function AllOrders() {
  const [orders, setOrders] = useState<Order[]>()

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("access_token") as string).access_token;
    (async () => {
      try {
        const { data } = await api.get(`orders/get-orders`, {
          headers: {
            access_token: token
          }
        })
        setOrders(data)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [])
  
  return (
    <div className="px-[5%] lg:px-[10%] 2xl:px-[15%] mx-auto">
      {orders?.length === 0 || orders === undefined ? 
        <h3 className="text-center font-bold text-xl">There are not orders</h3>
      :
        <>
          {orders?.map((order) => (
            <OrderItem
              key={order.id} 
              bought_at={order.bought_at} 
              id={order.id}
              products_includes={order.products_includes}
              total={order.total}  
            />
          ))}
        </>
      }
    </div>
  )
}