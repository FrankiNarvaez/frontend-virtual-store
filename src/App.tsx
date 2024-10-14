import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Product from "./pages/Product";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import Products from "./pages/Products"
import { useEffect } from "react";
import { localStorageToken } from "./types/types";
import { Toaster } from "sonner";
import AddProduct from "./pages/AddProduct";
import EditProducts from "./pages/EditProducts";

function App() {
  const location = useLocation()
  const { pathname } = location;

  useEffect(() => {
    const timeNow = new Date()
    const timeToExpyreToken = localStorage.getItem("access_token") as localStorageToken | null
    if (timeToExpyreToken) {
      if (timeNow.getTime() > timeToExpyreToken?.expiry) {
        localStorage.removeItem("access_token")
        localStorage.removeItem("user")
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
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/cart" element={ <Cart /> } />
        <Route path="/orders" element={ <Orders /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/products" element={ <Products /> }>
          <Route index element={ <EditProducts /> } />
          <Route path="create" element={ <AddProduct /> } />
        </Route>
      </Routes>
    </>
  )
}

export default App
