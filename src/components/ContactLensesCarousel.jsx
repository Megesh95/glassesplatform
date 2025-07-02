import React, { useState } from 'react';

const images = [
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-10h-dailies_134722_1_23_06_2025.png',
    image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-10h-dailies_134722_1_23_06_2025.png',
    alt: 'Aqualens 10H Dailies',
    name: 'Aqualens 10H Dailies',
    price: '₹ 499',
    description: 'Aqualens 10H Dailies are daily disposable contact lenses designed for comfort and hydration throughout the day.'
  },
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-daily-disposable-contact-lenses--30-lenses-box_aqualens-daily-disposable-contact-lenses--30-lenses-box_csvfile-1681129631044-134723.png.png',
    image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-daily-disposable-contact-lenses--30-lenses-box_aqualens-daily-disposable-contact-lenses--30-lenses-box_csvfile-1681129631044-134723.png.png',
    alt: 'Aqualens Daily Disposable 30',
    name: 'Aqualens Daily Disposable 30',
    price: '₹ 1299',
    description: 'Aqualens Daily Disposable 30 lenses offer a fresh pair every day, ensuring hygiene and comfort for your eyes.'
  },
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-24h-dailies_118538_1_23_06_2025.png',
    image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-24h-dailies_118538_1_23_06_2025.png',
    alt: 'Aqualens 24H Dailies',
    name: 'Aqualens 24H Dailies',
    price: '₹ 599',
    description: 'Aqualens 24H Dailies provide all-day comfort and clear vision, perfect for daily wearers.'
  },
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-24h-toric-dailies_144128_1_23_06_2025.png',
    image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-24h-toric-dailies_144128_1_23_06_2025.png',
    alt: 'Aqualens 24H Toric Dailies',
    name: 'Aqualens 24H Toric Dailies',
    price: '₹ 799',
    description: 'Aqualens 24H Toric Dailies are designed for people with astigmatism, offering stable and clear vision.'
  },
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-nxt-monthly_144127_1_23_06_2025.png',
    image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-nxt-monthly_144127_1_23_06_2025.png',
    alt: 'Aqualens NXT Monthly',
    name: 'Aqualens NXT Monthly',
    price: '₹ 999',
    description: 'Aqualens NXT Monthly lenses are cost-effective and comfortable for regular users.'
  },
  {
    src: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-10h-monthly_134538_1_23_06_2025.png',
    image: 'https://static5.lenskart.com/media/catalog/product/pro/1/thumbnail/371x178/9df78eab33525d08d6e5fb8d27136e95//a/i/aqualens-10h-monthly_134538_1_23_06_2025.png',
    alt: 'Aqualens 10H Monthly',
    name: 'Aqualens 10H Monthly',
    price: '₹ 899',
    description: 'Aqualens 10H Monthly lenses provide long-lasting comfort and hydration for up to a month.'
  },
];

const VISIBLE_COUNT = 3;

const ContactLensesCarousel = ({ addToCart, addToWishlist, wishlistItems = [], removeFromWishlist, cartItems = [] }) => {
  const [startIdx, setStartIdx] = useState(0);
  const [selectedLens, setSelectedLens] = useState(null);

  const handlePrev = () => {
    setStartIdx((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setStartIdx((prev) => Math.min(prev + 1, images.length - VISIBLE_COUNT));
  };

  const isWishlisted = selectedLens && wishlistItems.some((item) => item.name === selectedLens.name);
  const isInCart = selectedLens && cartItems.some((item) => item.name === selectedLens.name);

  return (
    <>
      <section className="w-full max-w-6xl mx-auto mt-12 mb-16 px-4 py-4">
        <img src="https://static1.lenskart.com/media/desktop/img/June22/Our-Brands-Banner.jpg" className="rounded-xl mb-6 shadow" alt="Our Brands" />
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-semibold tracking-wide">CONTACT LENSES</h2>
          <a href="#" className="text-teal-600 font-medium hover:underline">View Range</a>
        </div>
        <hr className="mb-8" />
        <div className="relative flex items-center">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            disabled={startIdx === 0}
            className={`absolute left-0 z-10 bg-white rounded-full shadow p-2 transition hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed border border-gray-200`}
            style={{ top: '50%', transform: 'translateY(-50%)' }}
            aria-label="Previous"
          >
            <svg width="32" height="32" fill="none" stroke="gray" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          {/* Images */}
          <div className="flex justify-center w-full gap-8 md:gap-12">
            {images.slice(startIdx, startIdx + VISIBLE_COUNT).map((img, idx) => (
              <div
                key={img.src}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-4 md:p-5 w-full max-w-xs cursor-pointer border border-gray-100 group relative overflow-hidden flex flex-col items-center"
                style={{ fontFamily: "'Inter', sans-serif" }}
                onClick={() => setSelectedLens(img)}
              >
                <div className="w-full h-32 flex justify-center items-center mb-3">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-contain rounded-t-2xl"
                  />
                </div>
                <h3 className="text-base font-bold text-gray-900 truncate leading-tight mb-1 text-center">{img.name}</h3>
                <p className="text-gray-500 text-xs mb-2 text-center">Contact Lenses</p>
                <span className="inline-block bg-blue-50 text-blue-700 font-semibold text-sm px-3 py-1 rounded-full mb-2">{img.price}</span>
                <p className="text-gray-600 text-xs text-center line-clamp-2">{img.description}</p>
              </div>
            ))}
          </div>
          {/* Right Arrow */}
          <button
            onClick={handleNext}
            disabled={startIdx >= images.length - VISIBLE_COUNT}
            className={`absolute right-0 z-10 bg-white rounded-full shadow p-2 transition hover:scale-110 disabled:opacity-30 disabled:cursor-not-allowed border border-gray-200`}
            style={{ top: '50%', transform: 'translateY(-50%)' }}
            aria-label="Next"
          >
            <svg width="32" height="32" fill="none" stroke="gray" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </section>
      {/* Modal for Contact Lens Details */}
      {selectedLens && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl w-[95%] max-w-lg relative shadow-2xl border border-gray-200 flex flex-col items-center animate-fadeIn">
            <button
              onClick={() => setSelectedLens(null)}
              className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-3xl font-bold focus:outline-none transition-colors"
              aria-label="Close"
            >
              &times;
            </button>
            <img
              src={selectedLens.src}
              alt={selectedLens.alt}
              className="w-56 h-44 object-contain mb-4 mt-2 mx-auto rounded-xl shadow"
            />
            <h2 className="text-2xl font-semibold text-gray-900 mt-2 mb-1 text-center">{selectedLens.name}</h2>
            <span className="inline-block bg-blue-100 text-blue-700 font-bold text-lg px-4 py-1 rounded-full mb-2">{selectedLens.price}</span>
            <p className="text-gray-700 mb-4 text-center leading-normal text-base">{selectedLens.description}</p>
            <div className="flex gap-3 w-full mt-2">
              <button
                className={`flex-1 flex items-center justify-center gap-2 ${isInCart ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'} font-medium py-2 px-4 rounded-lg transition duration-150`}
                onClick={() => {
                  if (!isInCart) {
                    addToCart(selectedLens);
                    setSelectedLens(null);
                  }
                }}
                disabled={isInCart}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.272 1.017M7.5 14.25a3 3 0 106 0m-6 0a3 3 0 016 0m-6 0H5.25a2.25 2.25 0 01-2.197-1.772L3 6.75m4.5 7.5l.621-2.485m0 0l1.5-6.004A1.125 1.125 0 0110.715 4.5h6.57c.534 0 1.01.352 1.144.863l1.943 7.286a2.25 2.25 0 01-2.197 2.801H7.5z" />
                </svg>
                {isInCart ? 'Added to Cart' : 'Add to Cart'}
              </button>
              <button
                className={`flex-1 flex items-center justify-center gap-2 border ${isWishlisted ? 'bg-red-100 text-red-500 border-red-200' : 'bg-white text-gray-500 border-gray-200 hover:bg-red-50 hover:text-red-400'} font-medium py-2 px-4 rounded-lg transition duration-150`}
                onClick={() => {
                  if (isWishlisted) {
                    removeFromWishlist(selectedLens.name);
                  } else {
                    addToWishlist(selectedLens);
                  }
                }}
                aria-label="Toggle wishlist"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill={isWishlisted ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a5.25 5.25 0 00-7.424 0l-.44.439-.44-.44a5.25 5.25 0 00-7.425 7.425l.44.44L12 21.438l9.428-9.428.44-.44a5.25 5.25 0 00-7.425-7.425l-.44.44-.44-.44z" />
                </svg>
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactLensesCarousel; 