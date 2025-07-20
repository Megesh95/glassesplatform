import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TrendingCarousel.css";
import axios from "axios";

const TrendingCarousel = ({ darkMode, addToCart, addToWishlist }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sampleTrending, setSampleTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get("http://localhost:5000/product/trending");
        setSampleTrending(res.data.products || []);
      } catch (err) {
        console.error("Error fetching trending products", err);
      }
    };
    fetchTrending();
  }, []);

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
    <div
      className={`trending-carousel ${
        darkMode ? "dark-background text-light" : "light-background text-dark"
      }`}
    >
      <h2>Trending Products</h2>
      <Slider {...settings}>
        {sampleTrending.map((product) => {
          const ref = product.lensRef || product.frameRef;
          if (!ref) return null; 

          return (
            <div
              key={product._id}
              className={`carousel-item ${darkMode ? "dark-card" : "light-card"}`}
              onClick={() => setSelectedProduct(product)}
            >
              <img src={ref.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <p className={darkMode ? "text-light" : "text-dark"}>₹ {ref.price}</p>
            </div>
          );
        })}
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

            {(() => {
              const ref = selectedProduct.lensRef || selectedProduct.frameRef;
              return (
                <>
                  <img
                    src={ref?.imageUrl}
                    alt={selectedProduct.name}
                    className="w-56 h-44 object-contain mb-4 mt-2 mx-auto rounded-xl shadow"
                  />
                  <h2 className="text-2xl font-semibold text-gray-900 mt-2 mb-1 text-center">
                    {selectedProduct.name}
                  </h2>
                  <span className="inline-block bg-blue-100 text-blue-700 font-bold text-lg px-4 py-1 rounded-full mb-2">
                    ₹{ref?.price}
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
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingCarousel;
