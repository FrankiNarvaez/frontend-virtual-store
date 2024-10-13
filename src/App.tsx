import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Product from "./pages/Product";
import Search from "./pages/Search";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={ <Home /> } />
        <Route path='/product/:id' element={ <Product /> } />
        <Route path="/search" element={ <Search /> } />
      </Routes>
    </>
  )
}

export default App
