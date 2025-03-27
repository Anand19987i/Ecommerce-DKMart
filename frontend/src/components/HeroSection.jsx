"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart, ArrowRight, Truck, Clock, Shield, Star } from "lucide-react"

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Featured categories with their icons and colors
  const categories = [
    { name: "Groceries", color: "bg-emerald-100 text-emerald-600" },
    { name: "Electronics", color: "bg-blue-100 text-blue-600" },
    { name: "Fashion", color: "bg-purple-100 text-purple-600" },
    { name: "Home", color: "bg-amber-100 text-amber-600" },
  ]

  // Promotional offers that will rotate
  const promos = [
    { text: "30% OFF on first order", color: "bg-red-500" },
    { text: "Free delivery on orders over $50", color: "bg-blue-500" },
    { text: "Flash Sale: 24 hours only!", color: "bg-purple-500" },
  ]

  // Auto-rotate promotional banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promos.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient and pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-80"></div>
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>

      {/* Floating shapes for visual interest */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 -left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-20 w-56 h-56 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-8 z-10">
            {/* Rotating promotional banner */}
            <div className="relative h-10 overflow-hidden rounded-full w-fit">
              {promos.map((promo, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 flex items-center transition-all duration-500 ease-in-out ${
                    index === currentSlide ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                  } ${promo.color} text-white px-6 py-1.5 rounded-full font-medium text-sm`}
                >
                  {promo.text}
                </div>
              ))}
            </div>

            {/* Main heading with gradient text */}
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
                <span className="block">Everything You Need,</span>
                <span className="block mt-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Delivered in Minutes
                </span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-2xl">
                Shop premium products at unbeatable prices with our exclusive deals. From fresh groceries to the latest
                gadgets, we've got you covered.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href ="#shop"
                className="bg-blue-600  hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-200 transform hover:-translate-y-1"
              >
                <ShoppingCart className="w-5 h-5" />
                Shop Now
              </a>

              <a
                href="#categories"
                className="bg-white text-blue-700 border-2 border-blue-200 hover:border-blue-300 px-8 py-3.5 rounded-xl font-medium flex items-center gap-2 transition-all hover:bg-blue-50"
              >
                Explore Categories <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="flex items-center gap-2 text-gray-700">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Truck className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium">Free Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="bg-green-100 p-2 rounded-full">
                  <Clock className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="bg-amber-100 p-2 rounded-full">
                  <Star className="w-4 h-4 text-amber-600" />
                </div>
                <span className="text-sm font-medium">Top Rated</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Shield className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm font-medium">Secure Payment</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image with Floating Elements */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Main hero image */}
            <div className="relative z-10 bg-white p-3 rounded-2xl shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <img
                src="/groceries.png"
                alt="DKMart Products"
                className="h-auto w-full max-w-md rounded-xl object-cover"
              />

              {/* Floating discount badge */}
              
            </div>

            {/* Floating category pills */}
            <div className="absolute top-1/4 -left-10 z-20 transform -translate-y-1/2 hidden md:block">
              <div className="bg-white shadow-lg rounded-xl p-3 animate-float">
                <div className="flex items-center gap-2">
                  <div className="bg-emerald-100 p-2 rounded-full">
                    <ShoppingCart className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="font-medium">Fresh Produce</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-1/4 -left-5 z-20 transform -translate-y-1/2 hidden md:block">
              <div className="bg-white shadow-lg rounded-xl p-3 animate-float animation-delay-2000">
                <div className="flex items-center gap-2">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-medium">Fast Delivery</span>
                </div>
              </div>
            </div>

            {/* Featured categories */}
          
          </div>
        </div>
      </section>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes blob {
          0% { transform: scale(1); }
          33% { transform: scale(1.1); }
          66% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default HeroSection

