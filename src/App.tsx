import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Product from "./pages/Product";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect } from "react";
import { localStorageToken } from "./types/types";

function App() {
  const location = useLocation()
  const { pathname } = location;

  useEffect(() => {
    const timeNow = new Date()
    const timeToExpyreToken = localStorage.getItem("access_token") as localStorageToken | null
    if (timeToExpyreToken) {
      if (timeNow.getTime() > timeToExpyreToken?.expiry) {
        localStorage.removeItem("access_token")
        localStorage.setItem("isLoggedIn", "false")
      }
    }
  }, [])

  return (
    <>
      {pathname !== '/login' && pathname !== '/register' && <Header />}
      <Routes>
        <Route index element={ <Home /> } />
        <Route path='/product/:id' element={ <Product /> } />
        <Route path="/search" element={ <Search /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
      </Routes>
    </>
  )
}

export default App
