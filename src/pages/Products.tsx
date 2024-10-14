import { Link, Outlet } from "react-router-dom"

export default function Products() {
  return (
    <div className="flex flex-col md:flex-row px-[5%] lg:px-[10%] 2xl:px-[15%]">
      <aside className="backdrop-blur-xl p-4 bg-[rgba(3,7,18,0.5)] m-3 rounded-md">
        <ul>
          <li><Link to="/products/create">Add products</Link></li>
          <li><Link to="/products/">Edit products</Link></li>
        </ul>
      </aside>

      <main className="flex-1 p-3">
        <Outlet /> 
      </main>
    </div>
  )
}