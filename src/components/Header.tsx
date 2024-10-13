import { FaStore } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { resultProduct } from "../types/types";
import { api } from "../lib/api";

export default function Header() {
  const [showDropDown, setShowDropDown] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<resultProduct[]>()
  const [products, setProducts] = useState<resultProduct[]>()
  const [showDropDownProfile, setShowDropDownProfile] = useState(false)

  let isLoggedIn = localStorage.getItem("isLoggedIn")
  if (!isLoggedIn) {
    isLoggedIn = "false"
  }

  const navigate = useNavigate()

  if (!results) {
    (async () => {
      const { data } = await api.get('products/get-products')
      setResults(data)
    })()
  }

  useEffect(() => {
    if (results) {
      setProducts(results.filter((product) =>
        product?.name.toLowerCase().includes(query.toLowerCase())
      ));
    }
  }, [query, results]);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setShowDropDown(false)
    navigate(`/search?query=${query}`)
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("role")
    localStorage.removeItem("user_id")
    localStorage.setItem("isLoggedIn","false")
    setShowDropDownProfile(false)
  }

  return (
    <header className="w-full">
      <nav  className="flex justify-between items-center bg-white py-4 px-[5%] lg:px-[10%] 2xl:px-[15%] shadow-md sticky top-0 z-10 transition-all duration-300 hover:shadow-lg">
        <Link to="/" className="flex items-center">
          <FaStore className="text-2xl text-[#34495e] mx-4 cursor-pointer transition-all duration-300 hover:text-[#3498db] hover:scale-105" />
        </Link>
        <div className="flex-grow max-w-[500px] mx-5 my-0 relative">
          <form onSubmit={handleSubmit}>
            <input
              className="w-full py-2 px-5 border-none rounded-3xl text-base bg-[#f0f4f8] transition-all duration-300 focus:shadow-sm"
              type="text"
              placeholder="Search for products..."
              onChange={(e) => { setQuery(e.target.value); setShowDropDown(true); }} 
              onBlur={() => {
                setTimeout(() => { setShowDropDown(false) }, 200)
              }}
            />
            <button type="submit">
              <IoMdSearch className="absolute text-2xl right-4 -top-1 translate-y-1/2 text-[#7f8c8d] cursor-pointer hover:scale-110" />
            </button>
          </form>
        </div>
        <div className="flex items-center">
          <Link to="/cart">
            <FaShoppingCart className="text-2xl text-[#34495e] mx-4 cursor-pointer transition-all duration-300 hover:text-[#3498db] hover:scale-105" />
          </Link>
          <div 
            onClick={() => setShowDropDownProfile(!showDropDownProfile)}
            onBlur={() => {
              setShowDropDownProfile(false)
            }}
          >
            <FaUser className="text-2xl text-[#34495e] mx-4 cursor-pointer transition-all duration-300 hover:text-[#3498db] hover:scale-105" />
          </div>
          {showDropDownProfile && (
            <div className="absolute top-20 w-32 h-52 bg-[rgba(3,7,18,0.5)] backdrop-blur-2xl shadow-lg rounded-md p-3 flex flex-col gap-2">
              {isLoggedIn === "true" && (
                <>
                  <Link onClick={() => { setShowDropDownProfile(false) }} to="/profile" className="text-white text-xl hover:bg-[rgba(3,7,18,0.05)] w-full flex justify-center items-center rounded-md py-2">Profile</Link>
                  <Link onClick={() => { setShowDropDownProfile(false) }} to="/orders" className="text-white text-xl hover:bg-[rgba(3,7,18,0.05)] w-full flex justify-center items-center rounded-md py-2">Orders</Link>
                  <button onClick={handleLogout} className="text-white text-xl hover:bg-[rgba(3,7,18,0.05)] w-full flex justify-center items-center rounded-md py-2">Sign Out</button>
                </>
              )}
              {isLoggedIn === "false" && (
                <Link to="/login" className="text-white text-xl hover:bg-[rgba(3,7,18,0.05)] w-full flex justify-center items-center rounded-md py-2">Sign In</Link>
              )}
            </div>
          )}
        </div>
      </nav>
      {showDropDown && query.length > 0 && (
        <section className="border-2 shadow-md absolute top-20 left-0 right-0 m-auto w-max bg-white p-4 rounded-md max-h-[80vh] overflow-auto grid gap-4 grid-cols-1 md:grid-cols-2">
          {products?.map((product) => (
            <Link to={`/product/${product?.id}`} key={product?.id} className="bg-gray-200/60 p-2 rounded-md h-40">
              <img
                src={product?.image} 
                alt={product?.name} 
                className="w-44 rounded"
              />
              <h4 className="mt-2 font-semibold">{product?.name}</h4>
            </Link>
          ))}
        </section>
      )}
    </header>
  )
}