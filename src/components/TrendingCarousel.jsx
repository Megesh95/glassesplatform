import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TrendingCarousel.css";

const sampleTrending = [
  {
    id: 1,
    name: "Grey Transparent Square",
    price: 2000,
    image:
      "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/lenskart-air-la-e13520-n-c1-eyeglass_dsc3741_16_12_2024.jpg",
  },
  {
    id: 2,
    name: "Black Full Rim Rectangle",
    price: 2000,
    image:
      "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//j/i/john-jacobs-jj-s15598-c1-sunglasses_g_8363_16_may23.jpg",
  },
  {
    id: 3,
    name: "Gold Brown Rectangle",
    price: 2000,
    image:
      "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//l/i/gold-brown-half-rim-rectangle-lenskart-air-essentials-la-e13852-c1-eyeglasses_lenskart-air-la-e13852-c1-eyeglasses_g_2523_28july23.jpg",
  },
  {
    id: 4,
    name: "Black Full Rim Geometric",
    price: 1500,
    image:
      "https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/480x480/9df78eab33525d08d6e5fb8d27136e95//v/i/brown-gold-black-full-rim-geometric-vincent-chase-polarized-pilot-collection-vc-s15403-c2-sunglasses_g_0716_01_02_2023.jpg",
  },
];

const TrendingCarousel = ({ darkMode, addToCart, addToWishlist }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className={`trending-carousel ${darkMode ? "dark-background text-light" : "light-background text-dark"}`}>
      <h2>Trending Products</h2>
      <Slider {...settings}>
        {sampleTrending.map((product) => (
          <div
            key={product.id}
            className={`carousel-item ${darkMode ? "dark-card" : "light-card"}`}
            onClick={() => setSelectedProduct(product)}
          >
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className={darkMode ? "text-light" : "text-dark"}>₹ {product.price}</p>
          </div>
        ))}
      </Slider>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl w-[95%] max-w-lg relative shadow-2xl border border-gray-200 flex flex-col items-center animate-fadeIn">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-3xl font-bold focus:outline-none transition-colors"
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-56 h-44 object-contain mb-4 mt-2 mx-auto rounded-xl shadow"
            />
            <h2 className="text-2xl font-semibold text-gray-900 mt-2 mb-1 text-center">{selectedProduct.name}</h2>
            <span className="inline-block bg-blue-100 text-blue-700 font-bold text-lg px-4 py-1 rounded-full mb-2">
              ₹{selectedProduct.price}
            </span>
            <div className="flex gap-3 w-full mt-2">
              <button
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-lg transition duration-150"
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
              >
                Add to Cart
              </button>
              <button
                className="flex-1 bg-white text-gray-500 border border-gray-200 hover:bg-red-50 hover:text-red-400 font-medium py-2 px-4 rounded-lg transition duration-150"
                onClick={() => {
                  addToWishlist(selectedProduct);
                  setSelectedProduct(null);
                }}
              >
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingCarousel;
