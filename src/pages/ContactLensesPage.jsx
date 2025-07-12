import React, { useState } from "react";
import { contactLensProducts } from "../components/Products/productData";
import ProductCard from "../components/Products/ProductCards";

const sortOptions = [
  { value: "bestseller", label: "Best Sellers" },
  { value: "priceLowHigh", label: "Price: Low to High" },
  { value: "priceHighLow", label: "Price: High to Low" },
];

const ContactLensesPage = ({ addToCart, wishlistItems, addToWishlist, removeFromWishlist, cartItems }) => {
  const [sortOption, setSortOption] = useState("bestseller");

  let sortedProducts = [...contactLensProducts];
  if (sortOption === "priceLowHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === "bestseller") {
    sortedProducts.sort((a, b) => b.reviews - a.reviews);
  }

  return (
    <div className="w-full py-4 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between mb-4 px-2">
        <h2 className="text-xl font-semibold text-center mb-2 md:mb-0">Contact Lenses</h2>
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded px-3 py-2 shadow-sm">
          <span className="text-sm font-medium text-gray-600 mr-2">Sort by</span>
          <select
            className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
          >
            {sortOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl justify-center">
        {sortedProducts.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            addToCart={addToCart}
            wishlistItems={wishlistItems}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
            cartItems={cartItems}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactLensesPage; 