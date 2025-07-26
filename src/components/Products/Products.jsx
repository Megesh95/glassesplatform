import ProductCard from "./ProductCards";
import { useState } from "react";
import { sampleProducts } from "./productData";
import { useRecentlyViewed } from "../RecentlyViewedCombined";



function Products({ addToCart, wishlistItems, selectedBrand, addToWishlist, removeFromWishlist, cartItems, showFilterSidebar = true, customProducts, hideHeader = false, darkMode = false }) {

  const [sortOption, setSortOption] = useState("");
  const { addRecentlyViewed } = useRecentlyViewed();


  let filteredProducts = customProducts ? [...customProducts] : [...sampleProducts];

if (selectedBrand) {
  filteredProducts = filteredProducts.filter(
    (product) =>
      product.brand?.toLowerCase() === selectedBrand.toLowerCase()
  );
}

console.log("Selected Brand:", selectedBrand);
console.log("Filtered Products:", filteredProducts);

  if (sortOption === "priceLowHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "priceHighLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }



  return (
    <div className={`w-full py-4 min-h-screen flex flex-col items-center ${darkMode ? 'dark bg-zinc-950' : 'bg-gray-50'}`}>
      {/* Header */}
      {!hideHeader && (
        <h2 className={`text-xl font-semibold text-center w-full mb-2 ${darkMode ? 'text-zinc-100' : ''}`}>Eyeglasses for You</h2>
      )}
      <div className="flex w-full max-w-7xl mx-auto">
        {/* Filter Sidebar */}
        {showFilterSidebar && (
        <aside className={`w-64 min-w-[200px] max-w-xs rounded-lg shadow p-6 mr-8 h-fit sticky top-24 self-start hidden md:block ${darkMode ? 'bg-zinc-900 text-zinc-100 border-zinc-700' : 'bg-white text-gray-900 border-gray-200'}` }>
          {/* FRAME TYPE */}
          <div className="mb-6">
            <h3 className={`font-semibold mb-3 text-sm ${darkMode ? 'text-zinc-200' : 'text-gray-700'}`}>FRAME TYPE</h3>
            <div className="grid grid-cols-3 gap-2">
              <button className={`flex flex-col items-center p-2 border rounded hover:border-teal-500 ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
                <img src="/navpics/eyeglasses.webp" alt="Full Rim" className="h-8 mb-1 opacity-60" />
                <span className="text-xs text-gray-700">Full Rim</span>
              </button>
              <button className={`flex flex-col items-center p-2 border rounded hover:border-teal-500 ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
                <img src="/navpics/eyeglasses.webp" alt="Rimless" className="h-8 mb-1 opacity-60" />
                <span className="text-xs text-gray-700">Rimless</span>
              </button>
              <button className={`flex flex-col items-center p-2 border rounded hover:border-teal-500 ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
                <img src="/navpics/eyeglasses.webp" alt="Half Rim" className="h-8 mb-1 opacity-60" />
                <span className="text-xs text-gray-700">Half Rim</span>
              </button>
            </div>
          </div>
          {/* FRAME SHAPE */}
          <div className="mb-6">
            <h3 className={`font-semibold mb-3 text-sm ${darkMode ? 'text-zinc-200' : 'text-gray-700'}`}>FRAME SHAPE</h3>
            <div className="grid grid-cols-3 gap-2">
              <button className={`flex flex-col items-center p-2 border rounded hover:border-teal-500 ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
                <img src="/navpics/eyeglasses.webp" alt="Rectangle" className="h-8 mb-1 opacity-60" />
                <span className="text-xs text-gray-700">Rectangle</span>
              </button>
              <button className={`flex flex-col items-center p-2 border rounded hover:border-teal-500 ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
                <img src="/navpics/eyeglasses.webp" alt="Square" className="h-8 mb-1 opacity-60" />
                <span className="text-xs text-gray-700">Square</span>
              </button>
              <button className={`flex flex-col items-center p-2 border rounded hover:border-teal-500 ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
                <img src="/navpics/eyeglasses.webp" alt="Cat Eye" className="h-8 mb-1 opacity-60" />
                <span className="text-xs text-gray-700">Cat Eye</span>
              </button>
              <button className={`flex flex-col items-center p-2 border rounded hover:border-teal-500 ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
                <img src="/navpics/eyeglasses.webp" alt="Round" className="h-8 mb-1 opacity-60" />
                <span className="text-xs text-gray-700">Round</span>
              </button>
              <button className={`flex flex-col items-center p-2 border rounded hover:border-teal-500 ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
                <img src="/navpics/eyeglasses.webp" alt="Geometric" className="h-8 mb-1 opacity-60" />
                <span className="text-xs text-gray-700">Geometric</span>
              </button>
              <button className={`flex flex-col items-center p-2 border rounded hover:border-teal-500 ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
                <img src="/navpics/eyeglasses.webp" alt="Aviator" className="h-8 mb-1 opacity-60" />
                <span className="text-xs text-gray-700">Aviator</span>
              </button>
              <button className={`flex flex-col items-center p-2 border rounded hover:border-teal-500 ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
                <img src="/navpics/eyeglasses.webp" alt="Oval" className="h-8 mb-1 opacity-60" />
                <span className="text-xs text-gray-700">Oval</span>
              </button>
              <button className={`flex flex-col items-center p-2 border rounded hover:border-teal-500 ${darkMode ? 'border-zinc-700' : 'border-gray-200'}`}>
                <img src="/navpics/eyeglasses.webp" alt="Clubmaster" className="h-8 mb-1 opacity-60" />
                <span className="text-xs text-gray-700">Clubmaster</span>
              </button>
            </div>
          </div>
          {/* FRAME COLOR */}
          <div className="mb-6">
            <h3 className={`font-semibold mb-3 text-sm ${darkMode ? 'text-zinc-200' : 'text-gray-700'}`}>FRAME COLOR</h3>
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
        )}
        {/* Product Grid */}
        <div className={showFilterSidebar ? "flex-[2_1_0%]" : "flex-1 w-full"}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full justify-center">
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={index} 
                product={product} 
                addToCart={addToCart} 
                wishlistItems={wishlistItems}
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
                cartItems={cartItems}
                onView={() => addRecentlyViewed(product)}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;
