# Rudraksha Price Changes Documentation

## Overview
This document details all price changes made to the 1-14 Mukhi Rudraksha products, including the implementation of Nepali and Indonesian quality pricing with the quality toggle feature.

---

## 1. Price Structure Summary

### 1.1 Quality Types
- **Nepali Quality**: Original, premium quality Rudraksha (higher prices)
- **Indonesian Quality**: Alternative quality option (lower prices)

### 1.2 Product Scope
- **Applies To**: Products with IDs 1-14 (1 Mukhi through 14 Mukhi Rudraksha)
- **Does Not Apply To**: All other products (gemstones, special rudraksha, malas, etc.)

---

## 2. Nepali Prices (Reverted to Original)

The Nepali prices have been reverted to their original values in `shopData.ts`. These are the base prices displayed when "Nepali" quality is selected.

### 2.1 Complete Nepali Price List

| Product ID | Product Name | Price (₹) | Discounted Price (₹) |
|------------|--------------|-----------|---------------------|
| 1 | 1 Mukhi Rudraksha | 6,000 | 3,600 |
| 2 | 2 Mukhi Rudraksha | 2,833 | 1,700 |
| 3 | 3 Mukhi Rudraksha | 4,167 | 2,500 |
| 4 | 4 Mukhi Rudraksha | 3,167 | 1,900 |
| 5 | 5 Mukhi Rudraksha | 2,500 | 1,500 |
| 6 | 6 Mukhi Rudraksha | 3,167 | 1,900 |
| 7 | 7 Mukhi Rudraksha | 4,167 | 2,500 |
| 8 | 8 Mukhi Rudraksha | 15,833 | 9,500 |
| 9 | 9 Mukhi Rudraksha | 15,833 | 9,500 |
| 10 | 10 Mukhi Rudraksha | 16,667 | 10,000 |
| 11 | 11 Mukhi Rudraksha | 17,500 | 10,500 |
| 12 | 12 Mukhi Rudraksha | 19,167 | 11,500 |
| 13 | 13 Mukhi Rudraksha | 31,667 | 19,000 |
| 14 | 14 Mukhi Rudraksha | 59,000 | 36,000 |

---

## 3. Indonesian Prices (Explicit Pricing)

Indonesian prices are now explicitly defined (not calculated as 50% of Nepali). These prices are used when "Indonesian" quality is selected.

### 3.1 Complete Indonesian Price List

| Product ID | Product Name | Indonesian Price (₹) |
|------------|--------------|---------------------|
| 1 | 1 Mukhi Rudraksha | 2,300 |
| 2 | 2 Mukhi Rudraksha | 700 |
| 3 | 3 Mukhi Rudraksha | 900 |
| 4 | 4 Mukhi Rudraksha | 1,200 |
| 5 | 5 Mukhi Rudraksha | 550 |
| 6 | 6 Mukhi Rudraksha | 1,200 |
| 7 | 7 Mukhi Rudraksha | 1,600 |
| 8 | 8 Mukhi Rudraksha | 3,500 |
| 9 | 9 Mukhi Rudraksha | 6,000 |
| 10 | 10 Mukhi Rudraksha | 8,500 |
| 11 | 11 Mukhi Rudraksha | 9,500 |
| 12 | 12 Mukhi Rudraksha | 10,000 |
| 13 | 13 Mukhi Rudraksha | 17,000 |
| 14 | 14 Mukhi Rudraksha | *To be confirmed* |

**Note**: Indonesian price for 14 Mukhi Rudraksha is pending confirmation. Currently uses fallback calculation.

---

## 4. Price Comparison Table

| Product | Nepali Price (₹) | Indonesian Price (₹) | Difference (₹) | Savings % |
|---------|------------------|---------------------|----------------|-----------|
| 1 Mukhi | 6,000 / 3,600 | 2,300 | 3,700 / 1,300 | 61.7% / 36.1% |
| 2 Mukhi | 2,833 / 1,700 | 700 | 2,133 / 1,000 | 75.3% / 58.8% |
| 3 Mukhi | 4,167 / 2,500 | 900 | 3,267 / 1,600 | 78.4% / 64.0% |
| 4 Mukhi | 3,167 / 1,900 | 1,200 | 1,967 / 700 | 62.1% / 36.8% |
| 5 Mukhi | 2,500 / 1,500 | 550 | 1,950 / 950 | 78.0% / 63.3% |
| 6 Mukhi | 3,167 / 1,900 | 1,200 | 1,967 / 700 | 62.1% / 36.8% |
| 7 Mukhi | 4,167 / 2,500 | 1,600 | 2,567 / 900 | 61.6% / 36.0% |
| 8 Mukhi | 15,833 / 9,500 | 3,500 | 12,333 / 6,000 | 77.9% / 63.2% |
| 9 Mukhi | 15,833 / 9,500 | 6,000 | 9,833 / 3,500 | 62.1% / 36.8% |
| 10 Mukhi | 16,667 / 10,000 | 8,500 | 8,167 / 1,500 | 49.0% / 15.0% |
| 11 Mukhi | 17,500 / 10,500 | 9,500 | 8,000 / 1,000 | 45.7% / 9.5% |
| 12 Mukhi | 19,167 / 11,500 | 10,000 | 9,167 / 1,500 | 47.8% / 13.0% |
| 13 Mukhi | 31,667 / 19,000 | 17,000 | 14,667 / 2,000 | 46.3% / 10.5% |
| 14 Mukhi | 59,000 / 36,000 | *TBC* | - | - |

*Note: Prices shown as "Original / Discounted" format*

---

## 5. Technical Implementation

### 5.1 Files Modified

#### 5.1.1 `src/components/Shop/shopData.ts`
**Changes:**
- Reverted all 1-14 Mukhi Rudraksha prices to original Nepali values
- Maintained original discounted prices
- No changes to other product categories

**Key Updates:**
```typescript
// Example for 1 Mukhi Rudraksha
sizes: [
  { name: "Regular", price: 6000, discountedPrice: 3600 }
]
```

#### 5.1.2 `src/components/Shop/slug.tsx`
**Changes:**
- Added explicit Indonesian price mapping
- Updated quality toggle logic to use explicit prices instead of calculation
- Maintained default quality as "Indonesian"

**Indonesian Price Map:**
```typescript
const INDONESIAN_PRICES: Record<number, number> = {
  1: 2300,
  2: 700,
  3: 900,
  4: 1200,
  5: 550,
  6: 1200,
  7: 1600,
  8: 3500,
  9: 6000,
  10: 8500,
  11: 9500,
  12: 10000,
  13: 17000,
};
```

**Price Calculation Logic:**
```typescript
const getPriceForQuality = (price: number) => {
  if (isMukhiRudraksha && qualityType === "indonesian") {
    // Use explicit Indonesian price if available
    const indonesianPrice = INDONESIAN_PRICES[product.id];
    if (indonesianPrice !== undefined) {
      return indonesianPrice;
    }
    // Fallback to 50% calculation for products without explicit price
    return Math.round(price / 2);
  }
  return price; // Return original Nepali price
};
```

---

## 6. Quality Toggle Feature

### 6.1 User Interface
- Toggle buttons appear only on product detail pages for 1-14 Mukhi products
- Default selection: **Indonesian**
- Buttons styled with site theme color (#800000) when active

### 6.2 Behavior
- **Nepali Toggle**: Shows original Nepali prices from `shopData.ts`
- **Indonesian Toggle**: Shows explicit Indonesian prices from the price map
- Prices update dynamically when toggling
- Origin label updates to reflect selected quality
- Cart items include quality type for proper tracking

### 6.3 Cart Integration
- Quality type is saved with cart items
- Different qualities create separate cart items
- Toast notifications include quality type
- Cart treats items with same ID but different quality as separate products

---

## 7. Price Change History

### 7.1 Initial State (Before Changes)
- All products had original Nepali prices
- No quality differentiation

### 7.2 First Update (Incorrect)
- ❌ Updated `shopData.ts` with incorrect prices (Indonesian prices were mistakenly set as Nepali)
- Prices were: 2300, 700, 900, 1200, 550, 1200, 1600, 3500, 6000, 8500, 9500, 10000, 17000

### 7.3 Final Update (Corrected)
- ✅ Reverted `shopData.ts` to original Nepali prices
- ✅ Implemented explicit Indonesian price mapping in `slug.tsx`
- ✅ Quality toggle now correctly shows:
  - **Nepali**: Original prices (6,000, 2,833, 4,167, etc.)
  - **Indonesian**: Explicit prices (2,300, 700, 900, etc.)

---

## 8. Data Structure

### 8.1 Product Data (`shopData.ts`)
```typescript
{
  id: 1,
  title: "1 Mukhi Rudraksha - Original Nepali Ek Mukhi Rudraksha",
  sizes: [
    { name: "Regular", price: 6000, discountedPrice: 3600 }
  ]
}
```

### 8.2 Indonesian Price Map (`slug.tsx`)
```typescript
const INDONESIAN_PRICES: Record<number, number> = {
  1: 2300,   // 1 Mukhi
  2: 700,    // 2 Mukhi
  3: 900,    // 3 Mukhi
  4: 1200,   // 4 Mukhi
  5: 550,    // 5 Mukhi
  6: 1200,   // 6 Mukhi
  7: 1600,   // 7 Mukhi
  8: 3500,   // 8 Mukhi
  9: 6000,   // 9 Mukhi
  10: 8500,  // 10 Mukhi
  11: 9500,  // 11 Mukhi
  12: 10000, // 12 Mukhi
  13: 17000, // 13 Mukhi
  // 14 Mukhi: To be confirmed
};
```

---

## 9. Testing Checklist

- [x] Nepali prices reverted to original values
- [x] Indonesian prices explicitly defined
- [x] Quality toggle shows correct prices
- [x] Default quality is Indonesian
- [x] Toggle only appears for 1-14 Mukhi products
- [x] Cart saves quality type correctly
- [x] Price display updates on toggle
- [x] Origin label updates correctly
- [ ] Indonesian price for 14 Mukhi confirmed (pending)

---

## 10. Pending Items

### 10.1 Confirmation Needed
- **14 Mukhi Rudraksha Indonesian Price**: Currently uses fallback calculation (50% of Nepali = ₹29,500). Awaiting explicit price confirmation.

### 10.2 Future Considerations
- Add Indonesian-specific discounted prices if applicable
- Consider adding quality indicators on product listings
- Add filter option for quality type on shop page

---

## 11. Summary

### ✅ Completed
1. Reverted all Nepali prices to original values
2. Implemented explicit Indonesian price mapping
3. Quality toggle feature working correctly
4. Cart integration complete
5. Mobile-only image cropping for Shiva Lingam temple image

### 📋 Current Status
- **Nepali Prices**: ✅ All correct (original values restored)
- **Indonesian Prices**: ✅ 13 out of 14 products have explicit prices
- **Quality Toggle**: ✅ Fully functional
- **14 Mukhi Indonesian Price**: ⏳ Pending confirmation

---

## 12. Contact & Support

For questions or updates regarding pricing:
- Review this documentation
- Check `src/components/Shop/shopData.ts` for Nepali prices
- Check `src/components/Shop/slug.tsx` for Indonesian price mapping

---

**Document Version**: 2.0  
**Last Updated**: Current Date  
**Status**: Active - Awaiting 14 Mukhi Indonesian price confirmation
