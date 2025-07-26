import React, { useState } from "react";
import { Heart } from "lucide-react";

const ProductCard = ({ product, addToCart, wishlistItems, addToWishlist, removeFromWishlist, cartItems = [], onView, darkMode = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isWishlisted = wishlistItems.some((item) => item.name === product.name);
  const isInCart = cartItems.some((item) => item.name === product.name);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.name);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <>
      {/* Card */}
      <div
        className={`rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-5 w-full cursor-pointer border group relative overflow-hidden ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-100' : 'bg-white border-gray-100 text-gray-900'}`}
        style={{ fontFamily: "'Inter', sans-serif" }}
       onClick={() => {
  setIsOpen(true);
  onView && onView(); 
       }}
        tabIndex={0}
        aria-label={`View details for ${product.name}`}
      >
        {/* Wishlist Button */}
        <button
          className={`absolute top-3 right-3 z-10 p-0 m-0 border-none bg-transparent hover:scale-110 transition-transform duration-200 ${
            isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-400"
          }`}
          onClick={handleWishlistClick}
          aria-label="Toggle wishlist"
        >
          <Heart size={22} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        {/* Product Image */}
        <div className="w-full h-40 flex justify-center items-center mb-4 bg-gray-50 rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>

        {/* Rating Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="flex items-center gap-1 bg-blue-50 text-blue-700 font-semibold text-sm px-2 py-0.5 rounded-full">
            {product.rating}
            <Heart size={14} fill="#00b386" />
          </span>
          <span className="text-gray-500 text-sm font-medium">{product.reviews}</span>
        </div>

        {/* Product Info */}
        <div className="mb-2">
          <h3
            className="text-base font-bold text-gray-900 truncate leading-tight"
            title={product.name}
          >
            {product.name}
          </h3>
          {product.size && (
            <p className="text-xs text-gray-500 mt-0.5">Size: {product.size}</p>
          )}
        </div>

        {/* Price and Color Swatches */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className={`${darkMode ? 'text-zinc-100' : 'text-gray-900'} font-bold text-lg`}>₹{product.price}</span>
            {product.originalPrice && (
              <span className={`${darkMode ? 'text-zinc-400' : 'text-gray-400'} line-through text-sm`}>₹{product.originalPrice}</span>
            )}
            {product.discount && (
              <span className={`${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-700'} text-xs font-semibold px-2 py-0.5 rounded`}>
                {product.discount}% OFF
              </span>
            )}
          </div>
          {product.colors?.length > 0 && (
            <div className="flex gap-1">
              {product.colors.map((color, idx) => (
                <span
                  key={idx}
                  className="w-5 h-5 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                  aria-label={`Color option ${color}`}
                ></span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className={`p-6 rounded-xl w-[95%] max-w-lg relative shadow-lg border flex flex-col items-center ${darkMode ? 'bg-zinc-900 border-zinc-700 text-zinc-100' : 'bg-white border-gray-200 text-gray-900'}` }>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none"
            >
              &times;
            </button>

            <img
              src={product.image}
              alt={product.name}
              className="w-56 h-44 object-contain mb-4 mt-2 mx-auto"
            />

            <h2 className="text-xl font-semibold text-gray-900 mt-2 mb-1 text-center">{product.name}</h2>
            <p className={`text-sm mb-2 text-center ${darkMode ? 'text-zinc-300' : 'text-gray-500'}`}>Size: {product.size}</p>
            <p className={`mb-4 text-center leading-normal ${darkMode ? 'text-zinc-200' : 'text-gray-700'}`}>{product.description}</p>

            {/* Price Section */}
            <div className="flex items-center justify-center gap-2 mb-4 w-full">
              <span className={`${darkMode ? 'text-blue-300' : 'text-blue-600'} text-base font-semibold`}>₹{product.price}</span>
              <span className={`${darkMode ? 'text-zinc-400' : 'text-gray-400'} text-sm line-through`}>₹{product.originalPrice}</span>
              <span className={`${darkMode ? 'text-green-300' : 'text-green-600'} text-sm`}>({product.discount}% OFF)</span>
            </div>

            {/* Add to Cart Button */}
            <button
              className={`w-full flex items-center justify-center gap-2 ${isInCart ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'} font-medium py-2 px-4 rounded-lg transition duration-150 mb-4`}
              onClick={() => {
                if (!isInCart) {
                  addToCart(product);
                  setIsOpen(false);
                }
              }}
              disabled={isInCart}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.272 1.017M7.5 14.25a3 3 0 106 0m-6 0a3 3 0 016 0m-6 0H5.25a2.25 2.25 0 01-2.197-1.772L3 6.75m4.5 7.5l.621-2.485m0 0l1.5-6.004A1.125 1.125 0 0110.715 4.5h6.57c.534 0 1.01.352 1.144.863l1.943 7.286a2.25 2.25 0 01-2.197 2.801H7.5z" />
              </svg>
              {isInCart ? 'Added to Cart' : 'Add to Cart'}
            </button>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="flex gap-2 mt-2">
                {product.colors.map((color, idx) => (
                  <span
                    key={idx}
                    className="w-5 h-5 rounded-full border border-gray-300"
                    style={{ backgroundColor: color }}
                  ></span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
