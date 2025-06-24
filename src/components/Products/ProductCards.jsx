import React, { useState } from "react";
import { Heart } from "lucide-react";

const ProductCard = ({ product, addToCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <>
      {/* Card */}
      <div
        className="bg-white rounded-md shadow hover:shadow-lg transition-all duration-300 p-4 w-72 cursor-pointer"
        style={{ fontFamily: "'Inter', sans-serif" }}
        onClick={() => setIsOpen(true)}
      >
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-contain rounded"
          />
          <button
            className={`absolute top-2 right-2 transition-colors duration-200 ${
              isWishlisted
                ? "text-red-500"
                : "text-gray-500 hover:text-red-400"
            }`}
            onClick={toggleWishlist}
            aria-label="Toggle wishlist"
          >
            <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="mt-4">
          <h3 className="text-base font-semibold text-gray-900 truncate">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500">{product.size}</p>

          <div className="flex items-center mt-2">
            <span className="text-blue-600 font-semibold text-base">
              ₹{product.price}
            </span>
            <span className="text-gray-400 line-through ml-2 text-sm">
              ₹{product.originalPrice}
            </span>
            <span className="text-green-600 ml-2 text-sm">
              ({product.discount}% OFF)
            </span>
          </div>

          <div className="text-sm text-gray-600 mt-2">
            ⭐ {product.rating} ({product.reviews.toLocaleString()} reviews)
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-white/5 backdrop-blur-md flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md relative shadow-xl">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
            >
              &times;
            </button>

            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{product.size}</p>
            <p className="text-gray-700 mt-2">{product.description}</p>

            <div className="mt-4">
              <span className="text-xl font-semibold text-indigo-600">
                ₹{product.price}
              </span>
              <span className="text-sm line-through text-gray-400 ml-2">
                ₹{product.originalPrice}
              </span>
              <span className="text-sm text-green-600 ml-2">
                ({product.discount}% OFF)
              </span>
            </div>

            <p className="text-sm mt-2 text-yellow-500">
              ⭐ {product.rating} ({product.reviews.toLocaleString()} reviews)
            </p>

            <button
              className="w-full mt-4 bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 shadow hover:shadow-md"
              onClick={() => {
                addToCart(product);
                setIsOpen(false); // Optional: close modal after adding to cart
              }}
            >
              Add to Cart
            </button>

            <div className="flex gap-2 mt-4">
              {product.colors.map((color, idx) => (
                <span
                  key={idx}
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: color }}
                ></span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
