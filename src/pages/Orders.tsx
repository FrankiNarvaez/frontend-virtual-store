import { useEffect, useState } from 'react'
import { Order } from '../interfaces/orders.interface'
import { api } from '../lib/api'
import OrderItem from '../components/Orders';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>();
  
  useEffect(() => {
    (async () => {
      const user_id = localStorage.getItem("user_id")
      const token = JSON.parse(localStorage.getItem("access_token") as string).access_token
  
      const { data } = await api.get(`orders/get-orders/${user_id}`, {
        headers: {
          access_token: token
        }
      })
      setOrders(data)
    })()
  }, [])

  return (
    <div className="px-[5%] lg:px-[10%] 2xl:px-[15%] mx-auto py-8">
      {orders?.length === 0 || orders === undefined ? 
        <h3 className="text-center font-bold text-xl">You no have orders, bought some</h3>
      :
        <>
          <h2 className="text-2xl font-bold mb-6">My orders</h2>
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

