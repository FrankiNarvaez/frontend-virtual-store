import { FaStore } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import { resultProduct } from "../types/types";
import { api } from "../lib/api";
import UserModal from "./Profile";
import { User } from "../interfaces/users.interface";
import { toast } from "sonner";
import Login from "./Login";
import Register from "./Register";

export default function Header() {
  const [showDropDown, setShowDropDown] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<resultProduct[]>()
  const [products, setProducts] = useState<resultProduct[]>()
  const [showDropDownProfile, setShowDropDownProfile] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [user, setUser] = useState<User>({})

  const role = localStorage.getItem("role")
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
    if (query) {
      navigate(`/search?query=${query}`)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("role")
    localStorage.removeItem("user_id")
    localStorage.setItem("isLoggedIn","false")
    setShowDropDownProfile(false)
    toast.success(
      <aside className="p-4">You are logout</aside>, {
      position: "top-right"
    })
  }

  useEffect(() => {
    if (isLoggedIn !== "false") {
      const user_id = localStorage.getItem("user_id");
      const token =  localStorage.getItem("access_token")
      if (token) {
        const access_token: string = JSON.parse(token).access_token;
        (async () => {
          const { data } = await api.get(`users/${user_id}`, {
            headers: {
              access_token: access_token
            }
          })
          setUser(data)
        })()
      }
    }
  }, [isLoggedIn])

  const handleClickCart = () => {
    if (isLoggedIn === "true") {
      navigate("/cart")
    } else {
      toast.error(
        <aside className="p-4">Sign in to add the product to the cart</aside>, {
        position: "top-right"
      })
    }
  }

  return (
    <header className="w-full fixed">
      <nav  className="flex justify-between items-center bg-white py-4 px-[5%] lg:px-[10%] 2xl:px-[15%] shadow-md sticky top-0 z-10 transition-all duration-300 hover:shadow-lg">
        <Link to="/" className="flex items-center">
          <FaStore className="text-2xl text-[#34495e] mx-4 cursor-pointer transition-all duration-300 hover:text-[#3498db] hover:scale-105" />
        </Link>
        <div>
          <form onSubmit={handleSubmit} className="flex">
            <input
              className="w-[120px] sm:w-full py-2 px-5 rounded-s-3xl text-base bg-[#f0f4f8] transition-all duration-300 focus:w-full"
              type="text"
              placeholder="Search for products..."
              onChange={(e) => { setQuery(e.target.value); setShowDropDown(true); }} 
              onBlur={(e) => {
                setTimeout(() => { setShowDropDown(false) }, 200);
                e.target.placeholder = 'Search for products...'
              }}
              onFocus={(e) => e.target.placeholder = ''}
            />
            <button type="submit" className="bg-[#f0f4f8] px-2 rounded-e-3xl">
              <IoMdSearch className="text-2xl text-[#7f8c8d] cursor-pointer hover:scale-110" />
            </button>
          </form>
        </div>

        <div className="flex items-center">
          <button onClick={handleClickCart}>
            <FaShoppingCart className="text-2xl text-[#34495e] mx-4 cursor-pointer transition-all duration-300 hover:text-[#3498db] hover:scale-105" />
          </button>
          <div 
            onClick={() => setShowDropDownProfile(!showDropDownProfile)}
            
          >
            <FaUser className="text-2xl text-[#34495e] mx-4 cursor-pointer transition-all duration-300 hover:text-[#3498db] hover:scale-105" />
          </div>
          {showDropDownProfile && (
            <div className="absolute top-20 w-32 h-56 bg-[rgba(3,7,18,0.5)] backdrop-blur-2xl shadow-lg rounded-md p-3 flex flex-col gap-2">
              {isLoggedIn === "true" && (
                <>
                  <button
                    onClick={() => { setShowDropDownProfile(false); setShowProfileModal(true) }} 
                    className="text-white text-xl hover:bg-[rgba(3,7,18,0.05)] w-full flex justify-center items-center rounded-md py-2"
                  >
                    Profile
                  </button>
                  <Link 
                    onClick={() => { setShowDropDownProfile(false) }} 
                    to="/orders" 
                    className="text-white text-xl hover:bg-[rgba(3,7,18,0.05)] w-full flex justify-center items-center rounded-md py-2"
                  >
                    Orders
                  </Link>
                  {role === "ADMIN" && 
                    <Link onClick={() => { setShowDropDownProfile(false) }} to="/products" className="text-white text-xl hover:bg-[rgba(3,7,18,0.05)] w-full flex justify-center items-center rounded-md py-2">Products</Link>
                  }
                  <button onClick={handleLogout} className="text-white text-xl hover:bg-[rgba(3,7,18,0.05)] w-full flex justify-center items-center rounded-md py-2">Sign Out</button>
                </>
              )}
              {isLoggedIn === "false" && (
                <>
                  <button onClick={() => { setShowLoginModal(true); setShowDropDownProfile(false)}} className="text-white text-xl hover:bg-[rgba(3,7,18,0.05)] w-full flex justify-center items-center rounded-md py-2">Sign in</button>
                  <button onClick={() => { setShowRegisterModal(true); setShowDropDownProfile(false)}} className="text-white text-xl hover:bg-[rgba(3,7,18,0.05)] w-full flex justify-center items-center rounded-md py-2">Sign up</button>
                </>
              )}
            </div>
          )}
        </div>
      </nav>
      {showDropDown && query.length > 0 && (
        <section className="border-2 shadow-md absolute top-20 left-0 right-0 m-auto w-max bg-white p-4 rounded-md max-h-[80vh] overflow-auto grid gap-4 grid-cols-1 md:grid-cols-2">
          {products?.map((product) => (
            <Link to={`/product/${product?.id}`} key={product?.id} className="bg-gray-200/60 p-2 rounded-md h-auto">
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
      {showProfileModal && (
        <UserModal
          user={user}
          onClose={() => setShowProfileModal(false)}
        />
      )}
      {showLoginModal && (
        <Login 
          cancelAction={() => setShowLoginModal(false)} 
          registerAction={() => setShowRegisterModal(true)}
        />
      )}
      {showRegisterModal && (
        <Register 
          cancelAction={() => setShowRegisterModal(false)} 
          loginAction={() => setShowLoginModal(true)}
        />
      )}
    </header>
  )
}