import React, { useState } from "react";
import pujaCosts from "@/data/pujaCosts.json"; // Import JSON directly

const KaalSarpPujaCost: React.FC = () => {
  return (
    <div className="container mx-auto p-6 bg-gray-100 text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-6">
        Cost of Different Types of Kaal Sarp Dosh Puja in Ujjain
      </h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full border-collapse bg-white">
          <thead>
            <tr className="bg-red-700 text-white">
              <th className="py-3 px-6 border-b-2 border-gray-200">
                Location/Type of Puja
              </th>
              <th className="py-3 px-6 border-b-2 border-gray-200">Cost (₹)</th>
            </tr>
          </thead>
          <tbody>
            {pujaCosts.map((puja, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-gray-100" : ""} hover:bg-gray-200 transition duration-300`}
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

export default KaalSarpPujaCost;
