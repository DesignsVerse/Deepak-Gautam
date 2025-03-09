// types/product.ts
export interface Review {
    id: number;
    user: string;
    rating: number;
    comment: string;
  }
  
  export interface Product {
    id: number;
    name: string;
    image: string;
    images?: string[]; // Optional array of additional images
    price: number;
    originalPrice: number;
    discount: number;
    category: string,
    rating: number;
    faces: number;
    rashi: string;
    description: string;
    reviews?: Review[]; // Optional array of reviews
    relatedIds?: number[]; // Optional array of related product IDs
    material?: string; // e.g., "Gold"
  quality?: number; // e.g., 100 for 100% pure
  }