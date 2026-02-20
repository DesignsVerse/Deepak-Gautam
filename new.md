# Quality Toggle Feature & Pricing Documentation

## Overview
This document outlines the implementation of the Quality Toggle feature for Rudraksha products and the updated Nepali pricing structure.

---

## 1. Quality Toggle Feature

### 1.1 Feature Description
A toggle button has been added to the product detail page that allows users to switch between **Nepali** and **Indonesian** quality Rudraksha beads. This feature enables customers to view different pricing options based on the quality/origin of the product.

### 1.2 Product Scope
- **Applies To**: Only 1-14 Mukhi Rudraksha products (Product IDs: 1-14)
- **Does Not Apply To**: 
  - Gemstones (IDs 15-23)
  - Special Rudraksha (IDs 24-33)
  - Zodiac Rudraksha (IDs 34-45)
  - Malas and Yantras (IDs 46-53)

### 1.3 Default Behavior
- **Default Quality**: Indonesian (set as default)
- **Pricing Logic**: 
  - **Nepali Quality**: Shows original Nepali prices
  - **Indonesian Quality**: Shows prices that are **half of Nepali prices** (rounded to nearest integer)

### 1.4 User Interface
- Toggle buttons are displayed above the "Origin" section on product detail pages
- Buttons are styled with the site's theme color (#800000) when active
- Selected quality is reflected in:
  - Price display
  - Origin label
  - Cart items
  - Toast notifications

---

## 2. Technical Implementation

### 2.1 Files Modified

#### 2.1.1 `src/components/Shop/slug.tsx`
**Changes:**
- Added quality type state management (`qualityType` state)
- Added check to identify 1-14 Mukhi Rudraksha products (`isMukhiRudraksha`)
- Implemented price calculation function (`getPriceForQuality`)
- Added conditional quality toggle UI component
- Updated cart actions to include quality type
- Modified price display to reflect selected quality

**Key Functions:**
```typescript
// Check if product is 1-14 Mukhi Rudraksha
const isMukhiRudraksha = product?.id >= 1 && product?.id <= 14;

// Calculate prices based on quality
const getPriceForQuality = (price: number) => {
  if (isMukhiRudraksha && qualityType === "indonesian") {
    return Math.round(price / 2);
  }
  return price;
};
```

#### 2.1.2 `src/redux/features/cart-slice.ts`
**Changes:**
- Updated `CartItem` type to include optional `qualityType` and `selectedSize` fields
- Modified `addItemToCart` reducer to handle quality type
- Updated cart item matching logic to treat items with different qualities as separate cart items

**Updated Type:**
```typescript
type CartItem = {
  id: number;
  title: string;
  slug: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  qualityType?: "nepali" | "indonesian";
  selectedSize?: string;
  imgs?: {
    thumbnails: string[];
    previews: string[];
  };
};
```

#### 2.1.3 `src/components/Shop/shopData.ts`
**Changes:**
- Updated Nepali prices for all 1-14 Mukhi Rudraksha products
- Set `discountedPrice` equal to `price` for consistency (no discount applied)

---

## 3. Updated Nepali Pricing (1-14 Mukhi Rudraksha)

### 3.1 Price List

| Product ID | Product Name | Old Price (₹) | New Nepali Price (₹) | Indonesian Price (₹) |
|------------|--------------|---------------|---------------------|---------------------|
| 1 | 1 Mukhi Rudraksha | 6,000 | **2,300** | 1,150 |
| 2 | 2 Mukhi Rudraksha | 2,833 | **700** | 350 |
| 3 | 3 Mukhi Rudraksha | 4,167 | **900** | 450 |
| 4 | 4 Mukhi Rudraksha | 3,167 | **1,200** | 600 |
| 5 | 5 Mukhi Rudraksha | 2,500 | **550** | 275 |
| 6 | 6 Mukhi Rudraksha | 3,167 | **1,200** | 600 |
| 7 | 7 Mukhi Rudraksha | 4,167 | **1,600** | 800 |
| 8 | 8 Mukhi Rudraksha | 15,833 | **3,500** | 1,750 |
| 9 | 9 Mukhi Rudraksha | 15,833 | **6,000** | 3,000 |
| 10 | 10 Mukhi Rudraksha | 16,667 | **8,500** | 4,250 |
| 11 | 11 Mukhi Rudraksha | 17,500 | **9,500** | 4,750 |
| 12 | 12 Mukhi Rudraksha | 19,167 | **10,000** | 5,000 |
| 13 | 13 Mukhi Rudraksha | 31,667 | **17,000** | 8,500 |
| 14 | 14 Mukhi Rudraksha | 59,000 | **59,000** (unchanged) | 29,500 |

### 3.2 Pricing Notes
- All prices are in Indian Rupees (₹)
- Indonesian prices are automatically calculated as 50% of Nepali prices
- Prices are rounded to the nearest integer
- No discount is applied to the base prices (discountedPrice = price)

---

## 4. User Experience Flow

### 4.1 Product Page Interaction

1. **User visits a 1-14 Mukhi Rudraksha product page**
   - Quality toggle is visible (default: Indonesian selected)
   - Prices displayed reflect Indonesian pricing (half of Nepali)

2. **User toggles to Nepali quality**
   - Prices update to show full Nepali prices
   - Origin label changes to "Nepali"

3. **User toggles back to Indonesian quality**
   - Prices update to show Indonesian prices (half of Nepali)
   - Origin label changes to "Indonesian"

4. **User adds product to cart**
   - Quality type is saved with the cart item
   - Toast notification includes quality type
   - Cart treats different qualities as separate items

### 4.2 Non-Mukhi Products

For products that are NOT 1-14 Mukhi Rudraksha:
- No quality toggle is displayed
- Original prices are shown
- Origin always displays as "Nepali"
- No quality type is saved in cart

---

## 5. Cart Behavior

### 5.1 Cart Item Identification
Items are considered the same cart item only if they match:
- Product ID
- Quality Type (for 1-14 Mukhi products)
- Selected Size

### 5.2 Example Scenarios

**Scenario 1: Same Product, Different Qualities**
- 1 Mukhi Rudraksha (Nepali) - Quantity: 1
- 1 Mukhi Rudraksha (Indonesian) - Quantity: 1
- **Result**: Two separate cart items

**Scenario 2: Same Product, Same Quality**
- 1 Mukhi Rudraksha (Nepali) - Quantity: 1
- User adds another 1 Mukhi Rudraksha (Nepali)
- **Result**: Quantity increases to 2

---

## 6. Code Structure

### 6.1 Component Hierarchy

```
ShopDetails Component
└── ProductCard Component
    ├── Quality Toggle (conditional - only for IDs 1-14)
    ├── Price Display (dynamic based on quality)
    ├── Origin Display (dynamic based on quality)
    └── Add to Cart / Buy Now (includes quality type)
```

### 6.2 State Management

```typescript
// Product-level state
const [qualityType, setQualityType] = useState<"nepali" | "indonesian">("indonesian");
const [selectedSize, setSelectedSize] = useState(...);

// Computed values
const isMukhiRudraksha = product?.id >= 1 && product?.id <= 14;
const currentPrice = getPriceForQuality(selectedSize.price);
const currentDiscountedPrice = getPriceForQuality(selectedSize.discountedPrice);
```

---

## 7. Future Considerations

### 7.1 Potential Enhancements
- Add Indonesian-specific pricing (instead of 50% calculation)
- Add quality indicators/badges on product listings
- Add filter option to show only Nepali or Indonesian products
- Add quality comparison tool

### 7.2 Data Updates Needed
- Confirm price for 14 Mukhi Rudraksha (currently unchanged at ₹59,000)
- If Indonesian prices differ from 50% calculation, update pricing logic
- Consider adding quality-specific product descriptions

---

## 8. Testing Checklist

- [x] Quality toggle appears only for 1-14 Mukhi products
- [x] Default quality is Indonesian
- [x] Prices update correctly when toggling quality
- [x] Origin label updates correctly
- [x] Cart saves quality type correctly
- [x] Different qualities create separate cart items
- [x] Non-Mukhi products show no toggle
- [x] Toast notifications include quality type
- [x] All prices match the updated Nepali pricing

---

## 9. Summary

The Quality Toggle feature has been successfully implemented to allow customers to choose between Nepali and Indonesian quality Rudraksha beads for 1-14 Mukhi products. The feature:

- ✅ Provides clear pricing options
- ✅ Maintains user-friendly interface
- ✅ Properly handles cart operations
- ✅ Applies only to relevant products
- ✅ Uses updated Nepali pricing structure

All changes have been tested and are ready for production use.

---

**Document Version**: 1.0  
**Last Updated**: Current Date  
**Author**: Development Team
