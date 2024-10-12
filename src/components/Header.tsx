import { FaStore } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { FaUser } from "react-icons/fa";

export default function Header() {
  return (
    <header className="w-full ">
      <nav  className="flex justify-between items-center bg-white py-4 px-[5%] lg:px-[10%] 2xl:px-[15%] shadow-md sticky top-0 z-10 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center">
          <FaStore className="text-2xl text-[#34495e] mx-4 cursor-pointer transition-all duration-300 hover:text-[#3498db] hover:scale-105" />
        </div>
        <div className="flex-grow max-w-[500px] mx-5 my-0 relative">
          <input className="w-full py-3 px-5 border-none rounded-3xl text-base bg-[#f0f4f8] transition-all duration-300 focus:outline-none focus:shadow-sm" type="text" placeholder="Search for products..." />
          <IoMdSearch className="absolute text-2xl right-4 top-0 translate-y-1/2 text-[#7f8c8d] cursor-pointer hover:scale-110" />
        </div>
        <div className="flex items-center">
          <FaShoppingCart className="text-2xl text-[#34495e] mx-4 cursor-pointer transition-all duration-300 hover:text-[#3498db] hover:scale-105" />
          <FaUser className="text-2xl text-[#34495e] mx-4 cursor-pointer transition-all duration-300 hover:text-[#3498db] hover:scale-105" />
        </div>
      </nav>
    </header>
  )
}