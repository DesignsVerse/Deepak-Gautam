"use client";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { Product } from "@/types/product";
import productInfoData from "@/data/product/about-product.json";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  console.log("Product prop received:", product);

  const dynamicProductInfo = useMemo(() => {
    return productInfoData.map((section) => {
      if (typeof section.content !== "string") return section;

      const placeholders = {
        "{product.name}": product.name || "Gold Rudraksha",
        "{product.material}": product.material || "Gold",
        "{product.quality}": product.quality?.toString() || "100",
      };

      const updatedContent = Object.entries(placeholders).reduce(
        (acc, [key, value]) => acc.replace(new RegExp(key, "g"), value),
        section.content
      );

      return { ...section, content: updatedContent };
    });
  }, [product]);

  const renderContent = (content: string) => {
    console.log("Rendering content:", content);
    return (
      <div className="space-y-2 text-gray-700">
        {content
          .split("\n")
          .map((line, index) => line.trim())
          .filter((line) => line && !line.includes("Key features of Vrishabha Rashi Face Rudraksha include"))
          .map((line, index) =>
            line.startsWith("-") ? (
              <li key={index} className="text-maroon font-medium list-disc ml-">
                {line.substring(1).trim()}
              </li>
            ) : (
              <p key={index} className="leading-relaxed text-gray-600">{line}</p>
            )
          )}
      </div>
    );
  };

  return (
    <div className="max-w-8xl mx-auto py-10  bg-white  rounded-xl">
      {dynamicProductInfo.map((section, index) => (
        <motion.div
          key={section.heading || index}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 * index, duration: 0.5, ease: "easeOut" }}
          className="md:mt-10 mt-2 first:mt-0 p-4 "
        >
          <h2 className="md:text-3xl text-2xl font-semibold text-maroon mb-4 border-b-2 border-maroon pb-2">
            {section.heading.replace("{product.name}", product.name || "Gold Rudraksha")}
          </h2>
          {typeof section.content === "string" ? (
            <div className="whitespace-pre-wrap text-justify text-m md:text-lg">{renderContent(section.content)}</div>
          ) : (
            section.content
          )}
        </motion.div>
      ))}
    </div>
  );
}
