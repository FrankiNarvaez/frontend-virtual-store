import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Product from "./pages/Product";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/product/:id' element={<Product />} />
      </Routes>
    </>
  )
}

export default App
