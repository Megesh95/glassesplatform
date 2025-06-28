import ProductCard from "./ProductCards";
import { useState } from "react";
import { sampleProducts } from "./productData";


function Products({ addToCart, wishlistItems, addToWishlist, removeFromWishlist }) {
  const [sortOption, setSortOption] = useState("");

  let sortedProducts = [...sampleProducts];

  if (sortOption === "priceLowHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="px-4 py-4 bg-gray-50 min-h-screen">
      
      {/* Header and Sort Bar */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Eyeglasses for You</h2>

        <div className="flex items-center">
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
      </div>

      {/* Product Grid */}
      <div className="flex flex-wrap gap-6 justify-center">
        {sortedProducts.map((product, index) => (
          <ProductCard 
            key={index} 
            product={product} 
            addToCart={addToCart} 
            wishlistItems={wishlistItems}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
          />
        ))}
      </div>

    </div>
  );
}

export default Products;
