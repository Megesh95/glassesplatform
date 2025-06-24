import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div
      className="bg-white rounded-md shadow hover:shadow-lg transition-all duration-300 p-4 w-72"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain rounded"
        />
        <button
          className={`absolute top-2 right-2 transition-colors duration-200 ${
            isWishlisted ? "text-red-500" : "text-gray-500 hover:text-red-400"
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
  );
}
