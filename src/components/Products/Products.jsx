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
      {/* Header */}
      <h2 className="text-xl font-semibold text-center w-full mb-2">Eyeglasses for You</h2>
      <div className="flex w-full max-w-7xl mx-auto">
        {/* Filter Sidebar */}
        <aside className="w-64 min-w-[200px] max-w-xs bg-white rounded-lg shadow p-6 mr-8 h-fit sticky top-24 self-start hidden md:block">
          {/* FRAME TYPE */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3 text-sm">FRAME TYPE</h3>
            <div className="grid grid-cols-3 gap-2">
              <button className="flex flex-col items-center p-2 border border-gray-200 rounded hover:border-teal-500">
                <img src="/navpics/eyeglasses.webp" alt="Full Rim" className="h-8 mb-1 opacity-60" />
                <span className="text-xs text-gray-700">Full Rim</span>
              </button>
              <button className="flex flex-col items-center p-2 border border-gray-200 rounded hover:border-teal-500">
                <img src="/navpics/eyeglasses.webp" alt="Rimless" className="h-8 mb-1 opacity-60" />
                <span className="text-xs text-gray-700">Rimless</span>
              </button>
              <button className="flex flex-col items-center p-2 border border-gray-200 rounded hover:border-teal-500">
                <img src="/navpics/eyeglasses.webp" alt="Half Rim" className="h-8 mb-1 opacity-60" />
                <span className="text-xs text-gray-700">Half Rim</span>
              </button>
            </div>
          </div>
          {/* FRAME SHAPE */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3 text-sm">FRAME SHAPE</h3>
            <div className="grid grid-cols-3 gap-2">
              <button className="flex flex-col items-center p-2 border border-gray-200 rounded hover:border-teal-500">
                <img src="/navpics/eyeglasses.webp" alt="Rectangle" className="h-8 mb-1 opacity-60" />
                <span className="text-xs text-gray-700">Rectangle</span>
              </button>
              <button className="flex flex-col items-center p-2 border border-gray-200 rounded hover:border-teal-500">
                <img src="/navpics/eyeglasses.webp" alt="Square" className="h-8 mb-1 opacity-60" />
                <span className="text-xs text-gray-700">Square</span>
              </button>
              <button className="flex flex-col items-center p-2 border border-gray-200 rounded hover:border-teal-500">
                <img src="/navpics/eyeglasses.webp" alt="Cat Eye" className="h-8 mb-1 opacity-60" />
                <span className="text-xs text-gray-700">Cat Eye</span>
              </button>
              <button className="flex flex-col items-center p-2 border border-gray-200 rounded hover:border-teal-500">
                <img src="/navpics/eyeglasses.webp" alt="Round" className="h-8 mb-1 opacity-60" />
                <span className="text-xs text-gray-700">Round</span>
              </button>
              <button className="flex flex-col items-center p-2 border border-gray-200 rounded hover:border-teal-500">
                <img src="/navpics/eyeglasses.webp" alt="Geometric" className="h-8 mb-1 opacity-60" />
                <span className="text-xs text-gray-700">Geometric</span>
              </button>
              <button className="flex flex-col items-center p-2 border border-gray-200 rounded hover:border-teal-500">
                <img src="/navpics/eyeglasses.webp" alt="Aviator" className="h-8 mb-1 opacity-60" />
                <span className="text-xs text-gray-700">Aviator</span>
              </button>
              <button className="flex flex-col items-center p-2 border border-gray-200 rounded hover:border-teal-500">
                <img src="/navpics/eyeglasses.webp" alt="Oval" className="h-8 mb-1 opacity-60" />
                <span className="text-xs text-gray-700">Oval</span>
              </button>
              <button className="flex flex-col items-center p-2 border border-gray-200 rounded hover:border-teal-500">
                <img src="/navpics/eyeglasses.webp" alt="Clubmaster" className="h-8 mb-1 opacity-60" />
                <span className="text-xs text-gray-700">Clubmaster</span>
              </button>
            </div>
          </div>
          {/* FRAME COLOR */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3 text-sm">FRAME COLOR</h3>
            <div className="flex flex-col gap-2 max-h-32 overflow-y-auto pr-2">
              <label className="flex items-center text-xs text-gray-700">
                <input type="checkbox" className="mr-2" /> Black (493)
              </label>
              <label className="flex items-center text-xs text-gray-700">
                <input type="checkbox" className="mr-2" /> Transparent (318)
              </label>
              <label className="flex items-center text-xs text-gray-700">
                <input type="checkbox" className="mr-2" /> Blue (150)
              </label>
              <label className="flex items-center text-xs text-gray-700">
                <input type="checkbox" className="mr-2" /> Brown (120)
              </label>
              <label className="flex items-center text-xs text-gray-700">
                <input type="checkbox" className="mr-2" /> Red (80)
              </label>
              <label className="flex items-center text-xs text-gray-700">
                <input type="checkbox" className="mr-2" /> Green (60)
              </label>
            </div>
          </div>
        </aside>
        {/* Product Grid */}
        <div className="flex-1">
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
      </div>
    </div>
  );
}

export default Products;
