"use client";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import productInfoData from "@/data/product/about-product.json";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  console.log("Product prop received:", product); // Yeh check karega ki product mein name hai ya nahi

  const dynamicProductInfo = productInfoData.map((section) => {
    const updatedContent =
      typeof section.content === "string"
        ? section.content
            .replace("{product.name}", product.name || "Gold Rudraksha")
            .replace("{product.material}", product.material || "Gold")
            .replace("{product.quality}", product.quality?.toString() || "100")
        : section.content;

    console.log(`Section: ${section.heading}, Updated Content:`, updatedContent); // Har section ka content check karo

    return {
      ...section,
      content: updatedContent,
    };
  });

  const renderContent = (content: string) => {
    console.log("Rendering this content:", content); // Yeh dikhaayega ki render hone wala content kya hai
    const lines = content.split("\n").filter((line) => line.trim() !== "");
    return (
      <div className="space-y-2 text-gray-700">
        {lines
          .filter((line) => !line.includes("Key features of Vrishabha Rashi Face Rudraksha include"))
          .map((line, index) =>
            line.trim().startsWith("-") ? (
              <li key={index} className="text-maroon font-medium list-disc ml-6">
                {line.replace("- ", "")}
              </li>
            ) : (
              <p key={index} className="leading-relaxed text-gray-600">{line}</p>
            )
          )}
      </div>
    );
  };

  return (
    <div className="product-info-container max-w-10xl mx-auto py-8 px-6 bg-white shadow-md rounded-lg">
      {dynamicProductInfo.map((section, index) => (
        <motion.div
          key={section.heading || index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1, duration: 0.5, ease: "easeOut" }}
          className="mt-10 first:mt-0 p-6 bg-gray-50 rounded-lg shadow-sm"
        >
          <h2 className="text-3xl font-semibold text-maroon mb-4 border-b-2 border-maroon pb-2">
            {section.heading.replace("{product.name}", product.name || "Gold Rudraksha")}
          </h2>
          {typeof section.content === "string" ? (
            <div className="whitespace-pre-wrap text-lg">{renderContent(section.content)}</div>
          ) : (
            section.content
          )}
        </motion.div>
      ))}
    </div>
  );
}