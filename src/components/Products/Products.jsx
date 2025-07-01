import ProductCard from "./ProductCards";
import { useState } from "react";
import { sampleProducts } from "./productData";


function Products({ addToCart, wishlistItems, addToWishlist, removeFromWishlist, cartItems }) {
  const [sortOption, setSortOption] = useState("");

  let sortedProducts = [...sampleProducts];

  if (sortOption === "priceLowHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="w-full py-4 bg-gray-50 min-h-screen flex flex-col items-center">
      
      {/* Header and Sort Bar */}
      <h2 className="text-xl font-semibold text-center w-full mb-2">Eyeglasses for You</h2>
      <div className="flex items-center justify-center w-full mb-6">
        <span className="text-teal-600 font-semibold mr-2 flex items-center">
          ⇅ SORT BY
        </span>
        <select 
          value={sortOption} 
          onChange={(e) => setSortOption(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Best Sellers</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full justify-center">
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
}

export default Products;
