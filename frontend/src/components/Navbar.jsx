"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Search, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import axios from "axios"
import Sidebar from "./Sidebar"
import { PRODUCT_API_END_POINT } from "../utils/constant"

const Navbar = () => {
  const { user, userDetail } = useSelector((store) => store.auth)
  const cart = useSelector((store) => store.cart.cart)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const navigate = useNavigate()

  // ✅ Calculate total quantity of products in cart
  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0)

  // ✅ Fetch search results dynamically on input change
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.trim().length > 1) {
        try {
          const response = await axios.get(`${PRODUCT_API_END_POINT}/search?query=${searchQuery}`)
          if (response.data.success) {
            setSearchResults(response.data.products)
          } else {
            setSearchResults([])
          }
        } catch (error) {
          console.error("Search Error:", error)
          setSearchResults([])
        }
      } else {
        setSearchResults([])
      }
    }

    fetchSearchResults()
  }, [searchQuery])

  // ✅ Handle clicking a search result
  const handleSearchClick = (productId) => {
    navigate(`/product/details/${productId}`)
    setSearchQuery("") // ✅ Clear input
    setSearchResults([]) // ✅ Hide dropdown
    setIsMobileSearchOpen(false) // Close mobile search
  }

  // ✅ Handle Enter Key Press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`)
      setSearchResults([]) // ✅ Hide dropdown
      setIsMobileSearchOpen(false) // Close mobile search
    }
  }

  // ✅ Handle mobile search submit
  const handleMobileSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`)
      setSearchResults([])
      setIsMobileSearchOpen(false)
    }
  }

  return (
    <nav className="bg-gray-50 shadow-md px-4 relative">
      {/* Mobile Search Overlay - Only visible when mobile search is open */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 bg-gray-900/50 z-40 md:hidden" onClick={() => setIsMobileSearchOpen(false)}></div>
      )}

      {/* Mobile Search Bar - Appears when search icon is clicked */}
      {isMobileSearchOpen && (
        <div className="absolute top-0 left-0 w-full bg-white z-50 p-3 md:hidden flex items-center gap-2 shadow-md">
          <Search className="w-5 h-5 text-blue-600" />
          <input
            type="text"
            placeholder="Search DKMart"
            className="text-black placeholder-gray-500 outline-none w-full bg-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          {searchQuery.trim().length > 0 ? (
            <button
              onClick={handleMobileSearchSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setIsMobileSearchOpen(false)}
              className="text-gray-500 p-2 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* Mobile Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-md mt-1 max-h-60 overflow-y-auto z-50">
              {searchResults.map((product) => (
                <div
                  key={product._id}
                  onClick={() => handleSearchClick(product._id)}
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-800 cursor-pointer"
                >
                  {product.productName}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        {/* Left Section: Logo */}
        <Link to="/" className="flex items-center gap-1 z-10">
          <img src="icon.png" className="h-12 w-12 text-blue-400" />
          <h1 className="text-3xl font-bold text-black">
            <span className="">DK</span>Mart
          </h1>
        </Link>

        {/* Desktop Search Bar - Hidden on mobile */}
        <div className="relative hidden md:flex w-1/2 items-center border border-gray-300 bg-white h-12 gap-2 rounded-xl">
          <Search className="w-5 h-5 ml-3 text-blue-600" />
          <input
            type="text"
            placeholder="Search DKMart"
            className="text-black placeholder-gray-500 outline-none w-full bg-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* ✅ Show Arrow Button Only When Input Has Text */}
          {searchQuery.trim().length > 0 && (
            <button
              onClick={() => navigate(`/search?query=${searchQuery}`)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 h-full flex items-center rounded-r-xl cursor-pointer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          )}

          {/* ✅ Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-md rounded-md mt-1 max-h-60 overflow-y-auto z-50">
              {searchResults.map((product) => (
                <div
                  key={product._id}
                  onClick={() => handleSearchClick(product._id)}
                  className="block px-4 py-2 hover:bg-gray-100 text-gray-800 cursor-pointer"
                >
                  {product.productName}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Section: Login & Profile */}
        <div className="flex items-center gap-4 z-10">
          {/* Mobile Search Icon - Only visible on mobile */}
          <button className="md:hidden text-blue-600" onClick={() => setIsMobileSearchOpen(true)}>
            <Search className="w-6 h-6" />
          </button>

          {!user ? (
            <Link
              to="/login"
              className="cursor-pointer sm:block md:block bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition"
            >
              Login
            </Link>
          ) : (
            <div className="flex gap-4 items-center">
              {/* Shopping Cart Icon with Badge */}
              <div className="relative">
                <Link to={`/${user?.name}/cart/section`}>
                  <img src="/public/shopping-cart.png" alt="Cart" className="w-7 h-7 cursor-pointer" />

                  {totalCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {totalCartItems}
                    </span>
                  )}
                </Link>
              </div>

              {/* Profile Picture - Opens Sidebar */}
              <img
                src={userDetail?.avatar || "/public/default-pic.avif"}
                alt="Profile"
                className="rounded-full w-9 h-9 cursor-pointer"
                onClick={() => setIsSidebarOpen(true)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Component */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
    </nav>
  )
}

export default Navbar

