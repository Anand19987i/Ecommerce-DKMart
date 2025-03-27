import React from "react";

const CustomerCare = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center bg-gray-50  p-5">
      {/* Image Section */}
      <div className="flex justify-center lg:justify-start">
        <img src="/public/delivery.jpg" alt="Fast Delivery" className="w-96 h-auto rounded-lg" />
      </div>

      {/* Content Section */}
      <div className="text-center lg:text-left max-w-2xl lg:ml-14 space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          FREE <span className="text-blue-600">2 HOURS</span> Delivery
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800">
          ON ALL ORDERS ABOVE ₹499
        </h2>
        <p className="text-lg md:text-2xl text-gray-700 font-medium">
          Delivery Charges <span className="text-blue-600 font-semibold">₹29 only</span> on orders up to ₹499.
        </p>
      </div>
    </div>
  );
};

export default CustomerCare;
