import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/product/:id' element={<h4>Esto es un elemento xd</h4>} />
      </Routes>
    </>
  )
}

export default App
