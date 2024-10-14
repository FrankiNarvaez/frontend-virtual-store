import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Product from "./pages/Product";
import Search from "./pages/Search";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Products from "./pages/Products"
import { useEffect } from "react";
import { Toaster } from "sonner";
import AddProduct from "./pages/AddProduct";
import EditProducts from "./pages/EditProducts";
import AllOrders from "./pages/AllOrders";

export default function App() {
  const location = useLocation()
  const { pathname } = location;
  const role = localStorage.getItem("role")

  useEffect(() => {
    const timeNow = new Date()
    const token = localStorage.getItem("access_token")
    if (token) {
      const expiry: number = JSON.parse(token).expiry
      if (timeNow.getTime() > expiry) {
        localStorage.removeItem("access_token")
        localStorage.removeItem("role")
        localStorage.removeItem("user_id")
        localStorage.setItem("isLoggedIn","false")
      }
    }
    
  }, [])

  return (
    <>
      <Toaster />
      {pathname !== '/login' && pathname !== '/register' && <Header />}
      <Routes>
        <Route index element={ <Home /> } />
        <Route path='/product/:id' element={ <Product /> } />
        <Route path="/search" element={ <Search /> } />
        <Route path="/cart" element={ <Cart /> } />
        <Route path="/orders" element={ <Orders /> } />
        <Route path="/products" element={ role === "ADMIN" ? <Products /> : <Navigate to="/" /> }>
          <Route index element={ <EditProducts /> } />
          <Route path="create" element={ <AddProduct /> } />
          <Route path="orders" element={ <AllOrders /> } />
        </Route>
      </Routes>
    </>
  )
}
