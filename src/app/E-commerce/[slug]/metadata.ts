// src/app/E-commerce/[slug]/metadata.ts
import productDetailsData from "@/data/product/product-details.json";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = productDetailsData.find((p) => {
    const slugifiedName = p.name.toLowerCase().replace(/\s+/g, "-");
    return slugifiedName === params.slug.toLowerCase();
  });

  if (!product) {
    return { title: "Product Not Found - Deepak Gautam Panditji" };
  }

  return {
    title: `${product.name} - Deepak Gautam Panditji`,
    description: `Buy ${product.name} at Deepak Gautam Panditji's store. Ideal for ${product.rashi} Rashi.`,
  };
}