import React from "react";
import { Link } from "react-router-dom";

const ProductSelection = () => {
  const products = [
    { img: "/biscuits.webp", name: "Biscuits", link: "Biscuits" },
    { img: "/chips.jpg", name: "Chips & Namkeen", link: "Chips and Namkeen" },
    { img: "/beverages.png", name: "Beverages", link: "Beverages" },
    { img: "/maggie.webp", name: "Maggie & Pasta", link: "Maggie and Pasta" },
    { img: "/cadbury.jpg", name: "Cadbury & Chocolates", link: "Cadbury and Chocolates" },
    { img: "/atta.jpg", name: "Atta & Rice", link: "Atta and Rice" },
    { img: "/oils.png", name: "Refined Oils", link: "Oil & Ghee" },
    { img: "/pulses.png", name: "Pulses & Cereals", link: "Pulses and Cereals" },
    { img: "/sauces.jpg", name: "Sauces & Spreads", link: "Sauces & Spreads" },
    { img: "/spices.webp", name: "Spices", link: "Spices" },
    { img: "/soaps.webp", name: "Soaps & Shampoo", link: "Soaps & Shampoo" },
    { img: "/detergent.webp", name: "Detergents & Soaps", link: "Detergents & Soaps" },
    { img: "/hairoils.webp", name: "Hair Oils", link: "Hair oils" },
    { img: "/oralcare.webp", name: "Oral Care", link: "Oral care" },
    { img: "/stationary.jpg", name: "Stationary", link: "Stationary" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-5 sm:px-10 lg:px-20 my-5" id="categories">
      {products.map((item, index) => (
        <Link key={index} to={`/products/${item.link}`} className="no-underline">
          <div className="border border-gray-200 flex flex-col items-center p-4 rounded-md cursor-pointer transition-transform transform hover:scale-105">
            <img
              src={item.img}
              alt={item.name}
              className="w-24 h-24 sm:w-28 sm:h-28 object-cover mb-2"
            />
            <span className="text-black font-bold text-lg sm:text-xl text-center">
              {item.name}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductSelection;
