// lib/cartUtils.ts
import { useCart } from "./CartContext";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  qualityType?: "nepali" | "indonesian";
  selectedSize?: string;
}

export const addToCart = (product: {
  id: string;
  name: string;
  price: number;
  image: string;
  qualityType?: "nepali" | "indonesian";
  selectedSize?: string;
  // quantity: number;
}) => {
  // Get existing cart from localStorage
  const cartString = localStorage.getItem("cart");
  let cart: CartItem[] = cartString ? JSON.parse(cartString) : [];

  // Check if product already exists in cart with same quality and size
  const existingItem = cart.find(item => 
    item.id === product.id && 
    item.qualityType === product.qualityType &&
    item.selectedSize === product.selectedSize
  );

  if (existingItem) {
    // Update quantity if exists
    cart = cart.map(item =>
      item.id === product.id && 
      item.qualityType === product.qualityType &&
      item.selectedSize === product.selectedSize
        ? { ...item, quantity: item.quantity + 1 } 
        : item
    );
  } else {
    // Add new item if doesn't exist
    cart.push({ ...product, quantity: 1 });
  }

  // Save back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  
  // Dispatch event to notify other components
  window.dispatchEvent(new Event("storage"));

  // Open the cart sidebar (use context in the component calling this)
};