"use client";

import React from "react";

const Price: React.FC = () => {
  const pujaCosts = [
    {
      type: "Kaal Sarp Shanti Puja outside the temple in a hall (without AC)",
      cost: "₹1100 to ₹11000",
    },
    {
      type: "Kaal Sarp Dosh Puja Ujjain (with AC)",
      cost: "₹1500 to ₹12000",
    },
    {
      type: "Kaal Sarp Dosh Puja inside the temple",
      cost: "₹2100 to ₹13000",
    },
    {
      type: "Kaal Sarp Dosh Puja inside the temple (two separate tickets)",
      cost: "₹2500 to ₹14000",
    },
    {
      type: "Kaal Sarp Shanti Puja inside the temple with Rahu-Ketu Jaap",
      cost: "₹5100 to ₹15000",
    },
  ];

  return (
    <div className="container mx-auto p-6 mt-20 text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6">
        Cost of Different Types of Kaal Sarp Dosh Puja in Ujjain
      </h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full border-collapse bg-white">
          <thead>
            <tr className="bg-red-700 text-white">
              <th className="py-3 px-6 border-b-2 border-gray-200">Location/Type of Puja</th>
              <th className="py-3 px-6 border-b-2 border-gray-200">Cost (₹)</th>
            </tr>
          </thead>
          <tbody>
            {pujaCosts.map((puja, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : ""
                } hover:bg-gray-200 transition duration-300`}
              >
                <td className="py-4 px-6 border-b border-gray-200">{puja.type}</td>
                <td className="py-4 px-6 border-b border-gray-200">{puja.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Price;
