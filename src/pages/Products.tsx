import { Link, Outlet } from "react-router-dom"

export default function Products() {
  return (
    <div className="flex flex-col md:flex-row px-[5%] lg:px-[10%] 2xl:px-[15%]">
      <aside className="md:fixed md:h-5/6 backdrop-blur-xl p-4 bg-[rgba(3,7,18,0.5)] m-3 rounded-md">
        <ul className="flex flex-row md:flex-col items-center justify-around md:justify-center h-full">
          <li className="text-white font-semibold hover:bg-[rgba(3,7,18,0.09)] p-2 rounded-md"><Link to="/products/create">Add products</Link></li>
          <li className="text-white font-semibold hover:bg-[rgba(3,7,18,0.09)] p-2 rounded-md"><Link to="/products/">Edit products</Link></li>
        </ul>
      </aside>

      <main className="flex-1 p-3 md:ml-44">
        <Outlet /> 
      </main>
    </div>
  )
}