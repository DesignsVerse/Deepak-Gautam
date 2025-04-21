"use client";

import React, { useState } from "react";
import { Product } from "@/types/product"; // Product type import
import InfoData from "@/data/product/about-product.json";

interface ProductInfoProps {
  product: Product; // Props type define kiya
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [infoData, setInfoData] = useState(() => {
    const productData = InfoData[product.id] || { sections: [] };
    return productData;
  });

  return (
    <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-maroon mb-4">Product Information</h2>
      {infoData.sections.length > 0 ? (
        infoData.sections.map((section, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-semibold text-maroon">{section.heading}</h3>
            <p className="text-gray-600 mt-2" style={{ whiteSpace: "pre-line" }}>
              {section.content}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No information available for this product.</p>
      )}
    </div>
  );
};

export default ProductInfo;